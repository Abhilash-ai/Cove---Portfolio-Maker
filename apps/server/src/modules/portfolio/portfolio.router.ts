import { Router, Response } from 'express';
import { prisma } from '../../prisma.js';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth.js';

export const portfolioRouter = Router();
portfolioRouter.use(authenticateToken);

const DEFAULT_SECTION_ORDER = ['hero', 'projects', 'skills', 'experience', 'about', 'contact'];

// GET /api/v1/portfolios/mine
portfolioRouter.get('/mine', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;

    const portfolios = await prisma.portfolio.findMany({
      where: { userId: callerId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { projects: true }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: {
        portfolios: portfolios.map((p) => ({
          id: p.id,
          userId: p.userId,
          title: p.title,
          slug: p.slug,
          status: p.status,
          sectionOrder: (p.sectionOrder as string[]) || DEFAULT_SECTION_ORDER,
          customTokens: p.customTokens,
          activeTemplateId: p.activeTemplateId,
          projectCount: p._count.projects,
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString()
        }))
      }
    });
  } catch (err: any) {
    console.error('Fetch portfolios error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch user portfolios' } });
  }
});

// POST /api/v1/portfolios - Create portfolio
portfolioRouter.post('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;
    const { title, slug, sectionOrder } = req.body;

    if (!title || !slug) {
      res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Title and slug are required' } });
      return;
    }

    const normalizedSlug = String(slug).toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');
    const existingSlug = await prisma.portfolio.findUnique({
      where: { slug: normalizedSlug }
    });

    if (existingSlug) {
      res.status(409).json({ success: false, error: { code: 'SLUG_IN_USE', message: 'This portfolio slug is already in use' } });
      return;
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        userId: callerId,
        title: title.trim(),
        slug: normalizedSlug,
        status: 'draft',
        sectionOrder: Array.isArray(sectionOrder) ? sectionOrder : DEFAULT_SECTION_ORDER
      }
    });

    res.status(201).json({
      success: true,
      data: {
        portfolio: {
          id: portfolio.id,
          userId: portfolio.userId,
          title: portfolio.title,
          slug: portfolio.slug,
          status: portfolio.status,
          sectionOrder: (portfolio.sectionOrder as string[]) || DEFAULT_SECTION_ORDER,
          createdAt: portfolio.createdAt.toISOString(),
          updatedAt: portfolio.updatedAt.toISOString()
        }
      }
    });
  } catch (err: any) {
    console.error('Create portfolio error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create portfolio' } });
  }
});

// GET /api/v1/portfolios/:id - Full details with projects
portfolioRouter.get('/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;
    const { id } = req.params;

    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      include: {
        projects: {
          orderBy: { sortOrder: 'asc' },
          include: {
            media: { orderBy: { sortOrder: 'asc' } },
            sections: { orderBy: { sortOrder: 'asc' } }
          }
        }
      }
    });

    if (!portfolio) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Portfolio not found' } });
      return;
    }

    if (portfolio.userId !== callerId) {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Access denied: You do not own this portfolio' } });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        portfolio: {
          id: portfolio.id,
          userId: portfolio.userId,
          title: portfolio.title,
          slug: portfolio.slug,
          status: portfolio.status,
          sectionOrder: (portfolio.sectionOrder as string[]) || DEFAULT_SECTION_ORDER,
          customTokens: portfolio.customTokens,
          activeTemplateId: portfolio.activeTemplateId,
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
            customSectionOrder: (pr.customSectionOrder as string[]) || null,
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
              createdAt: m.createdAt.toISOString()
            })),
            createdAt: pr.createdAt.toISOString(),
            updatedAt: pr.updatedAt.toISOString()
          })),
          createdAt: portfolio.createdAt.toISOString(),
          updatedAt: portfolio.updatedAt.toISOString()
        }
      }
    });
  } catch (err: any) {
    console.error('Get portfolio error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to retrieve portfolio' } });
  }
});

// PUT /api/v1/portfolios/:id - Rename, update status, change slug or section order
portfolioRouter.put('/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;
    const { id } = req.params;
    const { title, slug, status, sectionOrder, customTokens, activeTemplateId } = req.body;

    const existing = await prisma.portfolio.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Portfolio not found' } });
      return;
    }

    if (existing.userId !== callerId) {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Access denied: You do not own this portfolio' } });
      return;
    }

    let normalizedSlug: string | undefined = undefined;
    if (slug && slug !== existing.slug) {
      normalizedSlug = String(slug).toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');
      const inUse = await prisma.portfolio.findUnique({ where: { slug: normalizedSlug } });
      if (inUse && inUse.id !== id) {
        res.status(409).json({ success: false, error: { code: 'SLUG_IN_USE', message: 'This slug is already taken' } });
        return;
      }
    }

    const updated = await prisma.portfolio.update({
      where: { id },
      data: {
        title: title !== undefined ? title.trim() : undefined,
        slug: normalizedSlug !== undefined ? normalizedSlug : undefined,
        status: status === 'published' || status === 'draft' ? status : undefined,
        sectionOrder: Array.isArray(sectionOrder) ? sectionOrder : undefined,
        customTokens: customTokens !== undefined ? customTokens : undefined,
        activeTemplateId: activeTemplateId !== undefined ? activeTemplateId : undefined,
        publishedAt: status === 'published' && existing.status !== 'published' ? new Date() : undefined
      }
    });

    res.status(200).json({
      success: true,
      data: {
        portfolio: {
          id: updated.id,
          userId: updated.userId,
          title: updated.title,
          slug: updated.slug,
          status: updated.status,
          sectionOrder: (updated.sectionOrder as string[]) || DEFAULT_SECTION_ORDER,
          customTokens: updated.customTokens,
          activeTemplateId: updated.activeTemplateId,
          createdAt: updated.createdAt.toISOString(),
          updatedAt: updated.updatedAt.toISOString()
        }
      }
    });
  } catch (err: any) {
    console.error('Update portfolio error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to update portfolio' } });
  }
});

// DELETE /api/v1/portfolios/:id - Cascading delete of portfolio
portfolioRouter.delete('/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;
    const { id } = req.params;

    const existing = await prisma.portfolio.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Portfolio not found' } });
      return;
    }

    if (existing.userId !== callerId) {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Access denied: You do not own this portfolio' } });
      return;
    }

    await prisma.portfolio.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: 'Portfolio deleted successfully'
    });
  } catch (err: any) {
    console.error('Delete portfolio error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to delete portfolio' } });
  }
});
