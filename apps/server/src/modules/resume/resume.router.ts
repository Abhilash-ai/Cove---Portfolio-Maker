import { Router, Response } from 'express';
import multer from 'multer';
import { prisma } from '../../prisma.js';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth.js';
import { resumeParserService } from '../../services/parser/resumeParser.service.js';
import { ResumeMergePayload } from '@cove/shared';

export const resumeRouter = Router();

// Configure memory storage for in-memory buffer parsing
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB max
});

// POST /api/v1/resume/parse - Parse PDF or Text buffer into structured DTO
resumeRouter.post(
  '/parse',
  authenticateToken,
  upload.single('file'),
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      let bufferOrText: Buffer | string | undefined = undefined;

      if (req.file && req.file.buffer) {
        bufferOrText = req.file.buffer;
      } else if (req.body && req.body.text) {
        bufferOrText = String(req.body.text);
      }

      if (!bufferOrText || (typeof bufferOrText === 'string' && !bufferOrText.trim())) {
        res.status(400).json({
          success: false,
          error: { code: 'INVALID_INPUT', message: 'No resume file or text content provided' }
        });
        return;
      }

      const parsed = await resumeParserService.parseResume(bufferOrText);

      res.status(200).json({
        success: true,
        data: { parsed }
      });
    } catch (err: any) {
      console.error('Resume parsing error:', err);
      res.status(500).json({
        success: false,
        error: { code: 'PARSER_ERROR', message: 'Failed to extract content from resume' }
      });
    }
  }
);

// POST /api/v1/resume/apply - Granular merge into user's profile and relational tables
resumeRouter.post(
  '/apply',
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const callerId = req.user!.id;
      const payload: ResumeMergePayload = req.body;

      const {
        selectedContactFields = {},
        contact,
        selectedExperiences = [],
        selectedEducations = [],
        selectedSkills = []
      } = payload;

      const cleanUtf8 = (val?: string | null): string | undefined => {
        if (val === undefined || val === null) return undefined;
        const cleaned = String(val)
          .replace(/\0/g, '')
          .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ')
          .trim();
        return cleaned || undefined;
      };

      await prisma.$transaction(async (tx) => {
        // 1. Update Profile & User details if selected
        const profileUpdate: Record<string, any> = {};

        const headline = cleanUtf8(contact?.headline);
        const bio = cleanUtf8(contact?.bio);
        const location = cleanUtf8(contact?.location);
        const email = cleanUtf8(contact?.email);
        const phone = cleanUtf8(contact?.phone);
        const name = cleanUtf8(contact?.name);

        if (selectedContactFields.headline && headline) {
          profileUpdate.headline = headline;
        }
        if (selectedContactFields.bio && bio) {
          profileUpdate.bio = bio;
        }
        if (selectedContactFields.location && location) {
          profileUpdate.location = location;
        }
        if (selectedContactFields.email && email) {
          profileUpdate.contactEmail = email;
        }
        if (selectedContactFields.phone && phone) {
          profileUpdate.contactPhone = phone;
        }

        if (Object.keys(profileUpdate).length > 0) {
          await tx.profile.upsert({
            where: { userId: callerId },
            update: profileUpdate,
            create: {
              userId: callerId,
              headline: profileUpdate.headline || 'Professional',
              ...profileUpdate
            }
          });
        }

        // Update User Name if selected
        if (selectedContactFields.name && name) {
          await tx.user.update({
            where: { id: callerId },
            data: { name }
          });
        }

        // 2. Add Social Links (LinkedIn, GitHub) if selected
        const linkedinUrl = cleanUtf8(contact?.linkedinUrl);
        if (selectedContactFields.linkedin && linkedinUrl) {
          const exists = await tx.socialLink.findFirst({
            where: { userId: callerId, platform: 'LinkedIn' }
          });
          if (!exists) {
            await tx.socialLink.create({
              data: {
                userId: callerId,
                platform: 'LinkedIn',
                url: linkedinUrl,
                label: 'LinkedIn'
              }
            });
          }
        }

        const githubUrl = cleanUtf8(contact?.githubUrl);
        if (selectedContactFields.github && githubUrl) {
          const exists = await tx.socialLink.findFirst({
            where: { userId: callerId, platform: 'GitHub' }
          });
          if (!exists) {
            await tx.socialLink.create({
              data: {
                userId: callerId,
                platform: 'GitHub',
                url: githubUrl,
                label: 'GitHub'
              }
            });
          }
        }

        // 3. Add Selected Experiences
        for (const exp of selectedExperiences) {
          const company = cleanUtf8(exp.company) || 'Company';
          const position = cleanUtf8(exp.position) || 'Role';
          const expLocation = cleanUtf8(exp.location) || null;
          const description = cleanUtf8(exp.description) || null;
          const highlights = Array.isArray(exp.highlights)
            ? exp.highlights.map((h) => cleanUtf8(h)).filter((h): h is string => Boolean(h))
            : [];

          await tx.experience.create({
            data: {
              userId: callerId,
              company,
              position,
              location: expLocation,
              startDate: exp.startDate ? new Date(exp.startDate.length === 4 ? `${exp.startDate}-01-01` : exp.startDate) : new Date(),
              endDate: exp.endDate && !exp.isCurrent ? new Date(exp.endDate.length === 4 ? `${exp.endDate}-01-01` : exp.endDate) : null,
              isCurrent: exp.isCurrent,
              description,
              highlights
            }
          });
        }

        // 4. Add Selected Educations
        for (const edu of selectedEducations) {
          const institution = cleanUtf8(edu.institution) || 'University';
          const degree = cleanUtf8(edu.degree) || 'Degree';
          const fieldOfStudy = cleanUtf8(edu.fieldOfStudy) || 'Studies';

          await tx.education.create({
            data: {
              userId: callerId,
              institution,
              degree,
              fieldOfStudy,
              startDate: new Date(),
              endDate: edu.endDate ? new Date(`${edu.endDate}-01-01`) : null
            }
          });
        }

        // 5. Add Selected Skills (avoid duplicate names for same user)
        const existingSkills = await tx.skill.findMany({
          where: { userId: callerId },
          select: { name: true }
        });
        const existingNames = new Set(existingSkills.map((s) => s.name.toLowerCase()));

        for (const skill of selectedSkills) {
          const skillName = cleanUtf8(skill.name);
          if (skillName && !existingNames.has(skillName.toLowerCase())) {
            await tx.skill.create({
              data: {
                userId: callerId,
                name: skillName,
                category: cleanUtf8(skill.category) || 'General',
                level: cleanUtf8(skill.level) || 'Proficient'
              }
            });
            existingNames.add(skillName.toLowerCase());
          }
        }
      });

      res.status(200).json({
        success: true,
        data: { message: 'Resume data merged successfully into profile' }
      });
    } catch (err: any) {
      console.error('Resume apply error:', err);
      res.status(500).json({
        success: false,
        error: { code: 'APPLY_ERROR', message: 'Failed to merge resume data into profile' }
      });
    }
  }
);
