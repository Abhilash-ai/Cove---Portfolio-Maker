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

      await prisma.$transaction(async (tx) => {
        // 1. Update Profile & User details if selected
        const profileUpdate: Record<string, any> = {};

        if (selectedContactFields.headline && contact?.headline) {
          profileUpdate.headline = contact.headline;
        }
        if (selectedContactFields.bio && contact?.bio) {
          profileUpdate.bio = contact.bio;
        }
        if (selectedContactFields.location && contact?.location) {
          profileUpdate.location = contact.location;
        }
        if (selectedContactFields.email && contact?.email) {
          profileUpdate.contactEmail = contact.email;
        }
        if (selectedContactFields.phone && contact?.phone) {
          profileUpdate.contactPhone = contact.phone;
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
        if (selectedContactFields.name && contact?.name) {
          await tx.user.update({
            where: { id: callerId },
            data: { name: contact.name.trim() }
          });
        }

        // 2. Add Social Links (LinkedIn, GitHub) if selected
        if (selectedContactFields.linkedin && contact?.linkedinUrl) {
          const exists = await tx.socialLink.findFirst({
            where: { userId: callerId, platform: 'LinkedIn' }
          });
          if (!exists) {
            await tx.socialLink.create({
              data: {
                userId: callerId,
                platform: 'LinkedIn',
                url: contact.linkedinUrl,
                label: 'LinkedIn'
              }
            });
          }
        }

        if (selectedContactFields.github && contact?.githubUrl) {
          const exists = await tx.socialLink.findFirst({
            where: { userId: callerId, platform: 'GitHub' }
          });
          if (!exists) {
            await tx.socialLink.create({
              data: {
                userId: callerId,
                platform: 'GitHub',
                url: contact.githubUrl,
                label: 'GitHub'
              }
            });
          }
        }

        // 3. Add Selected Experiences
        for (const exp of selectedExperiences) {
          await tx.experience.create({
            data: {
              userId: callerId,
              company: exp.company || 'Company',
              position: exp.position || 'Role',
              location: exp.location || null,
              startDate: exp.startDate ? new Date(exp.startDate.length === 4 ? `${exp.startDate}-01-01` : exp.startDate) : new Date(),
              endDate: exp.endDate && !exp.isCurrent ? new Date(exp.endDate.length === 4 ? `${exp.endDate}-01-01` : exp.endDate) : null,
              isCurrent: exp.isCurrent,
              description: exp.description || null,
              highlights: exp.highlights || []
            }
          });
        }

        // 4. Add Selected Educations
        for (const edu of selectedEducations) {
          await tx.education.create({
            data: {
              userId: callerId,
              institution: edu.institution || 'University',
              degree: edu.degree || 'Degree',
              fieldOfStudy: edu.fieldOfStudy || 'Studies',
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
          if (!existingNames.has(skill.name.toLowerCase())) {
            await tx.skill.create({
              data: {
                userId: callerId,
                name: skill.name,
                category: skill.category || 'General',
                level: skill.level || 'Proficient'
              }
            });
            existingNames.add(skill.name.toLowerCase());
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
