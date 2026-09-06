import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { prisma } from '../../prisma.js';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth.js';

export const publicRouter = Router();

const RESERVED_SLUGS = new Set([
  'admin',
  'api',
  'app',
  'dashboard',
  'login',
  'signup',
  'cove',
  'settings',
  'explore',
  'templates',
  'terms',
  'privacy',
  'help',
  'docs',
  'p',
  'auth',
  'public',
  'home',
  'profile',
  'status',
]);

function detectDevice(userAgent: string): 'desktop' | 'tablet' | 'mobile' {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|android/i.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

function generateVisitorHash(ip: string, userAgent: string): string {
  const dayString = new Date().toISOString().slice(0, 10);
  return crypto
    .createHash('sha256')
    .update(`${ip}-${userAgent}-${dayString}-cove-salt`)
    .digest('hex')
    .slice(0, 16);
}

// 1. GET /api/v1/public/p/:slug - Public published portfolio
publicRouter.get('/p/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const normalizedSlug = String(slug).toLowerCase().trim();

    const portfolio = await prisma.portfolio.findUnique({
      where: { slug: normalizedSlug },
      include: {
        projects: {
          orderBy: { sortOrder: 'asc' },
          include: {
            media: { orderBy: { sortOrder: 'asc' } },
          },
        },
        user: {
          include: {
            profile: true,
            skills: { orderBy: { sortOrder: 'asc' } },
            experiences: { orderBy: { sortOrder: 'asc' } },
            educations: { orderBy: { sortOrder: 'asc' } },
            certifications: true,
            achievements: true,
            publications: true,
            socialLinks: { orderBy: { sortOrder: 'asc' } },
          },
        },
      },
    });

    if (!portfolio || portfolio.status !== 'published') {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Portfolio not found or is currently private/unpublished',
        },
      });
      return;
    }

    const pUser = portfolio.user;
    const pProfile = pUser.profile;

    const fullProfile = {
      id: pProfile?.id || portfolio.userId,
      userId: portfolio.userId,
      name: pUser.name,
      email: pUser.email,
      headline: pProfile?.headline || null,
      bio: pProfile?.bio || null,
      location: pProfile?.location || null,
      photoUrl: pProfile?.photoUrl || null,
      contactEmail: pProfile?.contactEmail || pUser.email,
      contactPhone: pProfile?.contactPhone || null,
      availableForWork: pProfile?.availableForWork ?? true,
      skills: pUser.skills.map((s) => ({
        id: s.id,
        name: s.name,
        category: s.category,
        level: s.level,
        sortOrder: s.sortOrder,
      })),
      experiences: pUser.experiences.map((e) => ({
        id: e.id,
        company: e.company,
        position: e.position,
        location: e.location,
        startDate: e.startDate.toISOString(),
        endDate: e.endDate ? e.endDate.toISOString() : null,
        isCurrent: e.isCurrent,
        description: e.description,
        highlights: (e.highlights as string[]) || [],
        sortOrder: e.sortOrder,
      })),
      educations: pUser.educations.map((ed) => ({
        id: ed.id,
        institution: ed.institution,
        degree: ed.degree,
        fieldOfStudy: ed.fieldOfStudy,
        startDate: ed.startDate.toISOString(),
        endDate: ed.endDate ? ed.endDate.toISOString() : null,
      })),
      certifications: pUser.certifications.map((c) => ({
        id: c.id,
        name: c.name,
        issuer: c.issuer,
        issueDate: c.issueDate.toISOString(),
      })),
      achievements: pUser.achievements,
      publications: pUser.publications,
      socialLinks: pUser.socialLinks.map((l) => ({
        id: l.id,
        platform: l.platform,
        url: l.url,
        label: l.label,
        sortOrder: l.sortOrder,
      })),
      updatedAt: portfolio.updatedAt.toISOString(),
    };

    res.status(200).json({
      success: true,
      data: {
        portfolio: {
          id: portfolio.id,
          userId: portfolio.userId,
          title: portfolio.title,
          slug: portfolio.slug,
          status: portfolio.status,
          sectionOrder: portfolio.sectionOrder || ['hero', 'projects', 'skills', 'experience', 'contact'],
          customTokens: portfolio.customTokens,
          activeTemplateId: portfolio.activeTemplateId,
          createdAt: portfolio.createdAt.toISOString(),
          updatedAt: portfolio.updatedAt.toISOString(),
        },
        projects: portfolio.projects.map((pr) => ({
          id: pr.id,
          userId: pr.userId,
          portfolioId: pr.portfolioId,
          title: pr.title,
          coverImage: pr.coverImage,
          year: pr.year,
          category: pr.category,
          location: pr.location,
          shortDescription: pr.shortDescription,
          fullDescription: pr.fullDescription,
          role: pr.role,
          duration: pr.duration,
          outcome: pr.outcome,
          githubLink: pr.githubLink,
          tools: (pr.tools as string[]) || [],
          collaborators: (pr.collaborators as string[]) || [],
          externalLinks: (pr.externalLinks as any[]) || [],
          sortOrder: pr.sortOrder,
          media: pr.media.map((m) => ({
            id: m.id,
            projectId: m.projectId,
            url: m.url,
            type: m.type,
            caption: m.caption,
            altText: m.altText,
            isCover: m.isCover,
            sortOrder: m.sortOrder,
            createdAt: m.createdAt.toISOString(),
          })),
          createdAt: pr.createdAt.toISOString(),
          updatedAt: pr.updatedAt.toISOString(),
        })),
        profile: fullProfile,
      },
    });
  } catch (err: any) {
    console.error('Fetch public portfolio error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to load portfolio' } });
  }
});

// 2. GET /api/v1/public/check-slug - Slug uniqueness & blacklist check
publicRouter.get('/check-slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = String(req.query.slug || '').toLowerCase().trim();

    if (!slug || slug.length < 3) {
      res.status(200).json({ success: true, available: false, reason: 'TOO_SHORT' });
      return;
    }

    if (RESERVED_SLUGS.has(slug)) {
      res.status(200).json({ success: true, available: false, reason: 'RESERVED' });
      return;
    }

    const existing = await prisma.portfolio.findUnique({
      where: { slug },
      select: { id: true },
    });

    res.status(200).json({
      success: true,
      available: !existing,
      reason: existing ? 'TAKEN' : 'AVAILABLE',
    });
  } catch (err: any) {
    console.error('Check slug error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to verify slug' } });
  }
});

// 3. POST /api/v1/public/analytics/track - Privacy-first cookie-free analytics
publicRouter.post('/analytics/track', async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug, eventType = 'view', referrer, targetUrl, metadata } = req.body;

    if (!slug) {
      res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Slug is required' } });
      return;
    }

    const portfolio = await prisma.portfolio.findUnique({
      where: { slug: String(slug).toLowerCase().trim() },
      select: { id: true, status: true },
    });

    if (!portfolio || portfolio.status !== 'published') {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Portfolio not found' } });
      return;
    }

    const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const ua = req.headers['user-agent'] || '';
    const visitorHash = generateVisitorHash(ip, ua);
    const deviceType = detectDevice(ua);

    await prisma.analyticsEvent.create({
      data: {
        portfolioId: portfolio.id,
        eventType,
        visitorHash,
        deviceType,
        referrer: referrer ? String(referrer).slice(0, 300) : null,
        targetUrl: targetUrl ? String(targetUrl).slice(0, 300) : null,
        metadata: metadata || undefined,
      },
    });

    res.status(200).json({ success: true, recorded: true });
  } catch (err: any) {
    console.error('Analytics track error:', err);
    // Non-blocking: always respond cleanly
    res.status(200).json({ success: false, recorded: false });
  }
});

// 4. GET /api/v1/public/portfolios/:id/analytics - Authenticated creator analytics aggregation
publicRouter.get(
  '/portfolios/:id/analytics',
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const callerId = req.user!.id;
      const { id } = req.params;

      const portfolio = await prisma.portfolio.findUnique({
        where: { id },
        select: { id: true, userId: true, title: true, slug: true },
      });

      if (!portfolio) {
        res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Portfolio not found' } });
        return;
      }

      if (portfolio.userId !== callerId) {
        res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Access denied' } });
        return;
      }

      const events = await prisma.analyticsEvent.findMany({
        where: { portfolioId: id },
        orderBy: { createdAt: 'desc' },
        take: 1000,
      });

      const totalViews = events.filter((e) => e.eventType === 'view').length;
      const uniqueVisitors = new Set(events.filter((e) => e.eventType === 'view').map((e) => e.visitorHash)).size;
      const projectClicks = events.filter((e) => e.eventType === 'project_click').length;
      const linkClicks = events.filter((e) => e.eventType === 'link_click').length;

      // Device Breakdown
      const devices = { desktop: 0, tablet: 0, mobile: 0 };
      events.forEach((e) => {
        if (e.deviceType === 'mobile') devices.mobile++;
        else if (e.deviceType === 'tablet') devices.tablet++;
        else devices.desktop++;
      });

      // Daily views over last 7 days
      const daysMap: Record<string, number> = {};
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayKey = d.toISOString().slice(5, 10); // MM-DD
        daysMap[dayKey] = 0;
      }

      events
        .filter((e) => e.eventType === 'view')
        .forEach((e) => {
          const key = e.createdAt.toISOString().slice(5, 10);
          if (daysMap[key] !== undefined) {
            daysMap[key]++;
          }
        });

      const dailyViews = Object.entries(daysMap).map(([date, count]) => ({ date, views: count }));

      // Referrers
      const referrerMap: Record<string, number> = {};
      events
        .filter((e) => e.referrer)
        .forEach((e) => {
          const ref = e.referrer!;
          referrerMap[ref] = (referrerMap[ref] || 0) + 1;
        });

      const topReferrers = Object.entries(referrerMap)
        .map(([referrer, count]) => ({ referrer, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      res.status(200).json({
        success: true,
        data: {
          analytics: {
            portfolioId: portfolio.id,
            slug: portfolio.slug,
            totalViews,
            uniqueVisitors,
            projectClicks,
            linkClicks,
            devices,
            dailyViews,
            topReferrers,
          },
        },
      });
    } catch (err: any) {
      console.error('Fetch analytics error:', err);
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to aggregate analytics' } });
    }
  }
);
