import { Router, Response } from 'express';
import { prisma } from '../../prisma.js';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth.js';

export const projectRouter = Router();
projectRouter.use(['/portfolios', '/projects'], authenticateToken);

// Helper to format project output
function formatProject(pr: any) {
  return {
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
    media: (pr.media || []).map((m: any) => ({
      id: m.id,
      projectId: m.projectId,
      url: m.url,
      type: m.type,
      caption: m.caption,
      altText: m.altText,
      isCover: m.isCover,
      sortOrder: m.sortOrder,
      metadata: m.metadata,
      createdAt: m.createdAt.toISOString()
    })),
    createdAt: pr.createdAt.toISOString(),
    updatedAt: pr.updatedAt.toISOString()
  };
}

// POST /api/v1/portfolios/:portfolioId/projects - Create project with full field set
projectRouter.post('/portfolios/:portfolioId/projects', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;
    const { portfolioId } = req.params;

    const portfolio = await prisma.portfolio.findUnique({ where: { id: portfolioId } });
    if (!portfolio) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Portfolio not found' } });
      return;
    }
    if (portfolio.userId !== callerId) {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Access denied: You do not own this portfolio' } });
      return;
    }

    const {
      title,
      coverImage,
      year,
      category,
      location,
      shortDescription,
      fullDescription,
      role,
      tools,
      duration,
      collaborators,
      outcome,
      externalLinks,
      githubLink,
      customSectionOrder
    } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Project title is required' } });
      return;
    }

    const maxSort = await prisma.project.aggregate({
      where: { portfolioId },
      _max: { sortOrder: true }
    });
    const nextOrder = (maxSort._max.sortOrder ?? -1) + 1;

    const project = await prisma.project.create({
      data: {
        userId: callerId,
        portfolioId,
        title: title.trim(),
        coverImage: coverImage || null,
        year: year?.trim() || null,
        category: category?.trim() || null,
        location: location?.trim() || null,
        shortDescription: shortDescription || null,
        fullDescription: fullDescription || null,
        role: role?.trim() || null,
        duration: duration?.trim() || null,
        outcome: outcome || null,
        githubLink: githubLink?.trim() || null,
        tools: Array.isArray(tools) ? tools : [],
        collaborators: Array.isArray(collaborators) ? collaborators : [],
        externalLinks: Array.isArray(externalLinks) ? externalLinks : [],
        customSectionOrder: Array.isArray(customSectionOrder) ? customSectionOrder : undefined,
        sortOrder: nextOrder
      },
      include: { media: true }
    });

    res.status(201).json({
      success: true,
      data: { project: formatProject(project) }
    });
  } catch (err: any) {
    console.error('Create project error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create project' } });
  }
});

// GET /api/v1/projects/:id - Retrieve project
projectRouter.get('/projects/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        media: { orderBy: { sortOrder: 'asc' } },
        sections: { orderBy: { sortOrder: 'asc' } }
      }
    });

    if (!project) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });
      return;
    }
    if (project.userId !== callerId) {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Access denied: You do not own this project' } });
      return;
    }

    res.status(200).json({
      success: true,
      data: { project: formatProject(project) }
    });
  } catch (err: any) {
    console.error('Get project error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to retrieve project' } });
  }
});

// PUT /api/v1/projects/:id - Update full field set
projectRouter.put('/projects/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;
    const { id } = req.params;

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });
      return;
    }
    if (existing.userId !== callerId) {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Access denied: You do not own this project' } });
      return;
    }

    const {
      title,
      coverImage,
      year,
      category,
      location,
      shortDescription,
      fullDescription,
      role,
      tools,
      duration,
      collaborators,
      outcome,
      externalLinks,
      githubLink,
      customSectionOrder
    } = req.body;

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: title !== undefined ? title.trim() : undefined,
        coverImage: coverImage !== undefined ? coverImage || null : undefined,
        year: year !== undefined ? year?.trim() || null : undefined,
        category: category !== undefined ? category?.trim() || null : undefined,
        location: location !== undefined ? location?.trim() || null : undefined,
        shortDescription: shortDescription !== undefined ? shortDescription : undefined,
        fullDescription: fullDescription !== undefined ? fullDescription : undefined,
        role: role !== undefined ? role?.trim() || null : undefined,
        duration: duration !== undefined ? duration?.trim() || null : undefined,
        outcome: outcome !== undefined ? outcome : undefined,
        githubLink: githubLink !== undefined ? githubLink?.trim() || null : undefined,
        tools: Array.isArray(tools) ? tools : undefined,
        collaborators: Array.isArray(collaborators) ? collaborators : undefined,
        externalLinks: Array.isArray(externalLinks) ? externalLinks : undefined,
        customSectionOrder: Array.isArray(customSectionOrder) ? customSectionOrder : undefined
      },
      include: { media: { orderBy: { sortOrder: 'asc' } } }
    });

    res.status(200).json({
      success: true,
      data: { project: formatProject(updated) }
    });
  } catch (err: any) {
    console.error('Update project error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to update project' } });
  }
});

// DELETE /api/v1/projects/:id - Delete project
projectRouter.delete('/projects/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;
    const { id } = req.params;

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });
      return;
    }
    if (existing.userId !== callerId) {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Access denied: You do not own this project' } });
      return;
    }

    await prisma.project.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (err: any) {
    console.error('Delete project error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to delete project' } });
  }
});

// POST /api/v1/projects/:id/duplicate - Duplicate project with all metadata and media
projectRouter.post('/projects/:id/duplicate', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;
    const { id } = req.params;

    const existing = await prisma.project.findUnique({
      where: { id },
      include: { media: true, sections: true }
    });

    if (!existing) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });
      return;
    }
    if (existing.userId !== callerId) {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Access denied: You do not own this project' } });
      return;
    }

    const maxSort = await prisma.project.aggregate({
      where: { portfolioId: existing.portfolioId },
      _max: { sortOrder: true }
    });
    const nextOrder = (maxSort._max.sortOrder ?? -1) + 1;

    const duplicated = await prisma.project.create({
      data: {
        userId: callerId,
        portfolioId: existing.portfolioId,
        title: `${existing.title} (Copy)`,
        coverImage: existing.coverImage,
        year: existing.year,
        category: existing.category,
        location: existing.location,
        shortDescription: existing.shortDescription,
        fullDescription: existing.fullDescription,
        role: existing.role,
        duration: existing.duration,
        outcome: existing.outcome,
        githubLink: existing.githubLink,
        tools: (existing.tools as any) || [],
        collaborators: (existing.collaborators as any) || [],
        externalLinks: (existing.externalLinks as any) || [],
        customSectionOrder: existing.customSectionOrder ? (existing.customSectionOrder as any) : undefined,
        sortOrder: nextOrder,
        media: {
          create: existing.media.map((m) => ({
            url: m.url,
            type: m.type,
            caption: m.caption,
            altText: m.altText,
            isCover: m.isCover,
            sortOrder: m.sortOrder,
            metadata: (m.metadata as any) || undefined
          }))
        },
        sections: {
          create: existing.sections.map((s) => ({
            title: s.title,
            type: s.type,
            content: (s.content as any) || {},
            sortOrder: s.sortOrder
          }))
        }
      },
      include: { media: true }
    });

    res.status(201).json({
      success: true,
      data: { project: formatProject(duplicated) }
    });
  } catch (err: any) {
    console.error('Duplicate project error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to duplicate project' } });
  }
});

// POST /api/v1/portfolios/:portfolioId/projects/reorder - Reorder projects
projectRouter.post('/portfolios/:portfolioId/projects/reorder', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;
    const { portfolioId } = req.params;
    const { projectIds } = req.body;

    if (!Array.isArray(projectIds)) {
      res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'projectIds must be an array of IDs' } });
      return;
    }

    const portfolio = await prisma.portfolio.findUnique({ where: { id: portfolioId } });
    if (!portfolio) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Portfolio not found' } });
      return;
    }
    if (portfolio.userId !== callerId) {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Access denied: You do not own this portfolio' } });
      return;
    }

    await prisma.$transaction(
      projectIds.map((pid: string, idx: number) =>
        prisma.project.updateMany({
          where: { id: pid, portfolioId, userId: callerId },
          data: { sortOrder: idx }
        })
      )
    );

    res.status(200).json({
      success: true,
      message: 'Projects reordered successfully'
    });
  } catch (err: any) {
    console.error('Reorder projects error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to reorder projects' } });
  }
});
