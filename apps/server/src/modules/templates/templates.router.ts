import { Router, Request, Response } from 'express';
import { prisma } from '../../prisma.js';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth.js';
import { recommenderService } from '../../services/ai/recommender.service.js';
import { ProfileSignals } from '@cove/shared';

export const templatesRouter = Router();

// In-memory or cache store for user template favorites (demo/scale ready)
const userFavoritesMap = new Map<string, Set<string>>();

// 1. GET /api/v1/templates - Search & filter template catalog
templatesRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, profession, q } = req.query;
    const queryStr = String(q || '').toLowerCase().trim();
    const categoryStr = String(category || '').toLowerCase().trim();
    const professionStr = String(profession || '').toLowerCase().trim();

    const dbTemplates = await prisma.template.findMany({
      orderBy: { createdAt: 'desc' },
      include: { versions: true }
    });

    let filtered = dbTemplates.map((t) => {
      let suitableProfessions = ['Architect', 'Designer', 'Developer'];
      let interactionLevel = 'standard';
      let themeMode = 'dark';

      if (t.category === 'minimal') {
        suitableProfessions = ['Software Engineer', 'Full-Stack Developer', 'Product Designer'];
        interactionLevel = 'subtle';
        themeMode = 'light';
      } else if (t.category === 'editorial') {
        suitableProfessions = ['UX Researcher', 'Architectural Writer', 'Design Strategist'];
        interactionLevel = 'standard';
        themeMode = 'light';
      } else if (t.category === 'studio') {
        suitableProfessions = ['Architect', '3D Visualizer', 'Spatial Designer', 'Photographer'];
        interactionLevel = 'expressive';
        themeMode = 'dark';
      }

      return {
        id: t.id,
        name: t.name,
        category: t.category,
        description: t.description,
        suitableProfessions,
        interactionLevel,
        themeMode,
        createdAt: t.createdAt.toISOString()
      };
    });

    // Apply Search Query
    if (queryStr) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(queryStr) ||
          t.category.toLowerCase().includes(queryStr) ||
          (t.description && t.description.toLowerCase().includes(queryStr)) ||
          t.suitableProfessions.some((p) => p.toLowerCase().includes(queryStr))
      );
    }

    // Apply Category Filter
    if (categoryStr && categoryStr !== 'all') {
      filtered = filtered.filter((t) => t.category.toLowerCase() === categoryStr);
    }

    // Apply Profession Filter
    if (professionStr && professionStr !== 'all') {
      filtered = filtered.filter((t) =>
        t.suitableProfessions.some((p) => p.toLowerCase().includes(professionStr))
      );
    }

    res.status(200).json({
      success: true,
      data: {
        templates: filtered,
        total: filtered.length
      }
    });
  } catch (err: any) {
    console.error('List templates error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to list templates' } });
  }
});

// 2. POST /api/v1/templates/recommend - AI Template Recommendation
templatesRouter.post('/recommend', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { portfolioId, signals: explicitSignals } = req.body;

    // Derive signals from database if not explicitly provided
    let inferredSignals: ProfileSignals = {};

    const userRecord = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true, skills: true, experiences: true }
    });

    if (userRecord?.profile) {
      inferredSignals.profession = userRecord.profile.headline || undefined;
      inferredSignals.yearsOfExperience = userRecord.experiences.length > 0 ? userRecord.experiences.length * 2 : 2;
    }

    if (portfolioId) {
      const portfolio = await prisma.portfolio.findUnique({
        where: { id: portfolioId },
        include: { projects: { include: { media: true } } }
      });

      if (portfolio) {
        inferredSignals.projectCount = portfolio.projects.length;

        // Calculate media and text density
        const totalMedia = portfolio.projects.reduce((acc, p) => acc + p.media.length + (p.coverImage ? 1 : 0), 0);
        const totalTextLength = portfolio.projects.reduce((acc, p) => acc + (p.fullDescription?.length || 0), 0);

        inferredSignals.mediaDensity = totalMedia >= 3 ? 'rich' : totalMedia === 0 ? 'minimal' : 'balanced';
        inferredSignals.textDensity = totalTextLength > 800 ? 'rich' : totalTextLength < 200 ? 'minimal' : 'balanced';
      }
    }

    // Merge explicit overrides on top of inferred signals
    const finalSignals: ProfileSignals = {
      ...inferredSignals,
      ...(explicitSignals || {})
    };

    const recommendations = await recommenderService.recommendTemplates(finalSignals);

    res.status(200).json({
      success: true,
      data: {
        recommendations,
        signalsUsed: finalSignals
      }
    });
  } catch (err: any) {
    console.error('Template recommendation error:', err);
    res.status(500).json({ success: false, error: { code: 'RECOMMENDATION_ERROR', message: 'Failed to compute recommendations' } });
  }
});

// 3. POST /api/v1/templates/:id/favorite - Toggle favorite bookmark
templatesRouter.post('/:id/favorite', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;

    let userFavs = userFavoritesMap.get(userId);
    if (!userFavs) {
      userFavs = new Set<string>();
      userFavoritesMap.set(userId, userFavs);
    }

    const isFav = userFavs.has(id);
    if (isFav) {
      userFavs.delete(id);
    } else {
      userFavs.add(id);
    }

    res.status(200).json({
      success: true,
      data: {
        templateId: id,
        favorited: !isFav,
        allFavorites: Array.from(userFavs)
      }
    });
  } catch (err: any) {
    console.error('Favorite template error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to toggle favorite' } });
  }
});

// 4. GET /api/v1/templates/favorites - List user's favorited templates
templatesRouter.get('/favorites', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const userFavs = userFavoritesMap.get(userId) || new Set<string>();

    res.status(200).json({
      success: true,
      data: {
        favorites: Array.from(userFavs)
      }
    });
  } catch (err: any) {
    console.error('Get favorites error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch favorites' } });
  }
});
