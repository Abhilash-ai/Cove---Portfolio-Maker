import { Router, Response } from 'express';
import { prisma } from '../../prisma.js';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth.js';

export const portfolioRouter = Router();

// Apply auth middleware to all portfolio endpoints
portfolioRouter.use(authenticateToken);

// GET /portfolios/mine - Demonstrates strict server-side ownership derivation
portfolioRouter.get('/mine', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;

    // NEVER trust a client-supplied query or body ID - always use callerId from session/JWT
    const portfolios = await prisma.portfolio.findMany({
      where: { userId: callerId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        userId: true,
        title: true,
        slug: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.status(200).json({
      success: true,
      data: {
        portfolios: portfolios.map((p) => ({
          ...p,
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString()
        }))
      }
    });
  } catch (err: any) {
    console.error('Fetch portfolios error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch user portfolios' }
    });
  }
});

// POST /portfolios - Test endpoint to seed/create a portfolio under caller's ownership
portfolioRouter.post('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;
    const { title, slug } = req.body;

    if (!title || !slug) {
      res.status(400).json({
        success: false,
        error: { code: 'INVALID_INPUT', message: 'Title and slug are required' }
      });
      return;
    }

    const normalizedSlug = String(slug).toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');

    const existingSlug = await prisma.portfolio.findUnique({
      where: { slug: normalizedSlug }
    });

    if (existingSlug) {
      res.status(409).json({
        success: false,
        error: { code: 'SLUG_IN_USE', message: 'This portfolio slug is already in use' }
      });
      return;
    }

    // Force ownership to callerId
    const portfolio = await prisma.portfolio.create({
      data: {
        userId: callerId,
        title: title.trim(),
        slug: normalizedSlug,
        status: 'draft'
      }
    });

    res.status(201).json({
      success: true,
      data: {
        portfolio: {
          ...portfolio,
          createdAt: portfolio.createdAt.toISOString(),
          updatedAt: portfolio.updatedAt.toISOString()
        }
      }
    });
  } catch (err: any) {
    console.error('Create portfolio error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to create portfolio' }
    });
  }
});

// GET /portfolios/:id - Explicit test demonstrating rejection of non-owned resources
portfolioRouter.get('/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;
    const { id } = req.params;

    const portfolio = await prisma.portfolio.findUnique({
      where: { id }
    });

    if (!portfolio) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Portfolio not found' }
      });
      return;
    }

    // Strict ownership verification: reject requests for resources not owned by caller
    if (portfolio.userId !== callerId) {
      res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Access denied: You do not own this portfolio resource'
        }
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        portfolio: {
          ...portfolio,
          createdAt: portfolio.createdAt.toISOString(),
          updatedAt: portfolio.updatedAt.toISOString()
        }
      }
    });
  } catch (err: any) {
    console.error('Get portfolio error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to retrieve portfolio' }
    });
  }
});
