import { Router, Response } from 'express';
import { prisma } from '../../prisma.js';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth.js';

export const profileRouter = Router();
profileRouter.use(authenticateToken);

// GET /api/v1/profile/me - Complete profile with all relational sections
profileRouter.get('/me', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        skills: { orderBy: { sortOrder: 'asc' } },
        experiences: { orderBy: { sortOrder: 'asc' } },
        educations: { orderBy: { sortOrder: 'asc' } },
        certifications: { orderBy: { issueDate: 'desc' } },
        achievements: { orderBy: { date: 'desc' } },
        publications: { orderBy: { publicationDate: 'desc' } },
        socialLinks: { orderBy: { sortOrder: 'asc' } },
      }
    });

    if (!user) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        profile: {
          id: user.profile?.id || '',
          userId: user.id,
          name: user.name,
          email: user.email,
          headline: user.profile?.headline || null,
          photoUrl: user.profile?.photoUrl || null,
          bio: user.profile?.bio || null,
          location: user.profile?.location || null,
          contactEmail: user.profile?.contactEmail || user.email,
          contactPhone: user.profile?.contactPhone || null,
          availableForWork: user.profile?.availableForWork ?? true,
          socialLinks: user.socialLinks.map((s) => ({
            id: s.id,
            platform: s.platform,
            url: s.url,
            label: s.label,
            sortOrder: s.sortOrder
          })),
          skills: user.skills.map((s) => ({
            id: s.id,
            name: s.name,
            category: s.category,
            level: s.level,
            sortOrder: s.sortOrder
          })),
          experiences: user.experiences.map((e) => ({
            id: e.id,
            company: e.company,
            position: e.position,
            location: e.location,
            startDate: e.startDate.toISOString(),
            endDate: e.endDate ? e.endDate.toISOString() : null,
            isCurrent: e.isCurrent,
            description: e.description,
            highlights: (e.highlights as string[]) || [],
            sortOrder: e.sortOrder
          })),
          educations: user.educations.map((e) => ({
            id: e.id,
            institution: e.institution,
            degree: e.degree,
            fieldOfStudy: e.fieldOfStudy,
            startDate: e.startDate.toISOString(),
            endDate: e.endDate ? e.endDate.toISOString() : null,
            grade: e.grade,
            activities: e.activities,
            sortOrder: e.sortOrder
          })),
          certifications: user.certifications.map((c) => ({
            id: c.id,
            name: c.name,
            issuer: c.issuer,
            issueDate: c.issueDate.toISOString(),
            expiryDate: c.expiryDate ? c.expiryDate.toISOString() : null,
            credentialUrl: c.credentialUrl,
            credentialId: c.credentialId
          })),
          achievements: user.achievements.map((a) => ({
            id: a.id,
            title: a.title,
            description: a.description,
            date: a.date ? a.date.toISOString() : null,
            url: a.url
          })),
          publications: user.publications.map((p) => ({
            id: p.id,
            title: p.title,
            publisher: p.publisher,
            publicationDate: p.publicationDate ? p.publicationDate.toISOString() : null,
            url: p.url,
            description: p.description
          })),
          updatedAt: user.profile?.updatedAt.toISOString() || user.updatedAt.toISOString()
        }
      }
    });
  } catch (err: any) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch profile' } });
  }
});

// PUT /api/v1/profile/me - Comprehensive profile update
profileRouter.put('/me', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const {
      name,
      headline,
      photoUrl,
      bio,
      location,
      contactEmail,
      contactPhone,
      availableForWork,
      skills,
      experiences,
      educations,
      certifications,
      achievements,
      publications,
      socialLinks
    } = req.body;

    await prisma.$transaction(async (tx) => {
      // 1. Update user name if provided
      if (name !== undefined) {
        await tx.user.update({
          where: { id: userId },
          data: { name: name?.trim() || null }
        });
      }

      // 2. Upsert profile
      await tx.profile.upsert({
        where: { userId },
        create: {
          userId,
          headline: headline?.trim() || null,
          photoUrl: photoUrl || null,
          bio: bio || null,
          location: location?.trim() || null,
          contactEmail: contactEmail?.trim() || null,
          contactPhone: contactPhone?.trim() || null,
          availableForWork: Boolean(availableForWork ?? true)
        },
        update: {
          headline: headline !== undefined ? headline?.trim() || null : undefined,
          photoUrl: photoUrl !== undefined ? photoUrl || null : undefined,
          bio: bio !== undefined ? bio || null : undefined,
          location: location !== undefined ? location?.trim() || null : undefined,
          contactEmail: contactEmail !== undefined ? contactEmail?.trim() || null : undefined,
          contactPhone: contactPhone !== undefined ? contactPhone?.trim() || null : undefined,
          availableForWork: availableForWork !== undefined ? Boolean(availableForWork) : undefined
        }
      });

      // 3. Sync skills if passed
      if (Array.isArray(skills)) {
        await tx.skill.deleteMany({ where: { userId } });
        if (skills.length > 0) {
          await tx.skill.createMany({
            data: skills.map((s: any, idx: number) => ({
              userId,
              name: s.name.trim(),
              category: s.category?.trim() || null,
              level: s.level?.trim() || null,
              sortOrder: s.sortOrder ?? idx
            }))
          });
        }
      }

      // 4. Sync experiences if passed
      if (Array.isArray(experiences)) {
        await tx.experience.deleteMany({ where: { userId } });
        if (experiences.length > 0) {
          await tx.experience.createMany({
            data: experiences.map((e: any, idx: number) => ({
              userId,
              company: e.company.trim(),
              position: e.position.trim(),
              location: e.location?.trim() || null,
              startDate: new Date(e.startDate || Date.now()),
              endDate: e.endDate ? new Date(e.endDate) : null,
              isCurrent: Boolean(e.isCurrent),
              description: e.description || null,
              highlights: Array.isArray(e.highlights) ? e.highlights : [],
              sortOrder: e.sortOrder ?? idx
            }))
          });
        }
      }

      // 5. Sync educations if passed
      if (Array.isArray(educations)) {
        await tx.education.deleteMany({ where: { userId } });
        if (educations.length > 0) {
          await tx.education.createMany({
            data: educations.map((ed: any, idx: number) => ({
              userId,
              institution: ed.institution.trim(),
              degree: ed.degree.trim(),
              fieldOfStudy: ed.fieldOfStudy?.trim() || '',
              startDate: new Date(ed.startDate || Date.now()),
              endDate: ed.endDate ? new Date(ed.endDate) : null,
              grade: ed.grade?.trim() || null,
              activities: ed.activities || null,
              sortOrder: ed.sortOrder ?? idx
            }))
          });
        }
      }

      // 6. Sync certifications if passed
      if (Array.isArray(certifications)) {
        await tx.certification.deleteMany({ where: { userId } });
        if (certifications.length > 0) {
          await tx.certification.createMany({
            data: certifications.map((c: any) => ({
              userId,
              name: c.name.trim(),
              issuer: c.issuer.trim(),
              issueDate: new Date(c.issueDate || Date.now()),
              expiryDate: c.expiryDate ? new Date(c.expiryDate) : null,
              credentialUrl: c.credentialUrl?.trim() || null,
              credentialId: c.credentialId?.trim() || null
            }))
          });
        }
      }

      // 7. Sync achievements if passed
      if (Array.isArray(achievements)) {
        await tx.achievement.deleteMany({ where: { userId } });
        if (achievements.length > 0) {
          await tx.achievement.createMany({
            data: achievements.map((a: any) => ({
              userId,
              title: a.title.trim(),
              description: a.description || null,
              date: a.date ? new Date(a.date) : null,
              url: a.url?.trim() || null
            }))
          });
        }
      }

      // 8. Sync publications if passed
      if (Array.isArray(publications)) {
        await tx.publication.deleteMany({ where: { userId } });
        if (publications.length > 0) {
          await tx.publication.createMany({
            data: publications.map((p: any) => ({
              userId,
              title: p.title.trim(),
              publisher: p.publisher.trim(),
              publicationDate: p.publicationDate ? new Date(p.publicationDate) : null,
              url: p.url?.trim() || null,
              description: p.description || null
            }))
          });
        }
      }

      // 9. Sync social links if passed
      if (Array.isArray(socialLinks)) {
        await tx.socialLink.deleteMany({ where: { userId } });
        if (socialLinks.length > 0) {
          await tx.socialLink.createMany({
            data: socialLinks.map((s: any, idx: number) => ({
              userId,
              platform: s.platform.trim(),
              url: s.url.trim(),
              label: s.label?.trim() || null,
              sortOrder: s.sortOrder ?? idx
            }))
          });
        }
      }
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully'
    });
  } catch (err: any) {
    console.error('Profile update error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to update profile' } });
  }
});
