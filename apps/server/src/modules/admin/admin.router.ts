import { Router, Response } from 'express';
import { prisma } from '../../prisma.js';
import { authenticateToken, requireAdmin, AuthenticatedRequest } from '../../middleware/auth.js';

export const adminRouter = Router();

// Protect all admin endpoints with authentication and ADMIN role check
adminRouter.use(authenticateToken, requireAdmin);

// GET /api/v1/admin/stats - System aggregates & health
adminRouter.get('/stats', async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const [
      totalUsers,
      totalPortfolios,
      publishedPortfolios,
      totalProjects,
      totalAssets,
      templateCounts
    ] = await Promise.all([
      prisma.user.count(),
      prisma.portfolio.count(),
      prisma.portfolio.count({ where: { status: 'published' } }),
      prisma.project.count(),
      prisma.asset.count(),
      prisma.portfolio.groupBy({
        by: ['activeTemplateId'],
        _count: {
          id: true
        }
      })
    ]);

    const templateDistribution = templateCounts.map((t) => ({
      templateId: t.activeTemplateId || 'default',
      count: t._count.id
    })).sort((a, b) => b.count - a.count);

    res.status(200).json({
      success: true,
      data: {
        metrics: {
          totalUsers,
          totalPortfolios,
          publishedPortfolios,
          draftPortfolios: totalPortfolios - publishedPortfolios,
          totalProjects,
          totalAssets,
          publishRate: totalPortfolios > 0 ? Math.round((publishedPortfolios / totalPortfolios) * 100) : 0
        },
        templateDistribution,
        serverTime: new Date().toISOString()
      }
    });
  } catch (err: any) {
    console.error('Admin stats error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'ADMIN_STATS_ERROR', message: err.message || 'Failed to fetch admin stats' }
    });
  }
});

// GET /api/v1/admin/users - User registry
adminRouter.get('/users', async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            portfolios: true,
            projects: true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: {
        users: users.map((u) => ({
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role,
          portfolioCount: u._count.portfolios,
          projectCount: u._count.projects,
          createdAt: u.createdAt.toISOString(),
          updatedAt: u.updatedAt.toISOString()
        }))
      }
    });
  } catch (err: any) {
    console.error('Admin users fetch error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'ADMIN_USERS_ERROR', message: err.message || 'Failed to fetch users' }
    });
  }
});

// PATCH /api/v1/admin/users/:userId/role - Manage user role
adminRouter.patch('/users/:userId/role', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (role !== 'USER' && role !== 'ADMIN') {
      res.status(400).json({
        success: false,
        error: { code: 'INVALID_ROLE', message: 'Role must be either USER or ADMIN' }
      });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: { id: true, email: true, role: true }
    });

    res.status(200).json({
      success: true,
      data: {
        user: updatedUser
      }
    });
  } catch (err: any) {
    console.error('Admin role update error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'ADMIN_ROLE_UPDATE_ERROR', message: err.message || 'Failed to update user role' }
    });
  }
});
