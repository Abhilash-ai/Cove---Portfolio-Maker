import { Router, Response } from 'express';
import multer from 'multer';
import { prisma } from '../../prisma.js';
import { storageService } from '../../services/storage/storage.service.js';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth.js';
import { MediaType } from '@prisma/client';

export const mediaRouter = Router();
mediaRouter.use(['/media', '/projects'], authenticateToken);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

function detectMediaType(mimetype: string): MediaType {
  if (mimetype.startsWith('image/')) return 'IMAGE';
  if (mimetype.startsWith('video/')) return 'VIDEO';
  if (mimetype === 'application/pdf') return 'PDF';
  return 'IMAGE';
}

// POST /api/v1/media/upload
mediaRouter.post('/media/upload', upload.single('file'), async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;
    const file = req.file;

    if (!file) {
      res.status(400).json({ success: false, error: { code: 'NO_FILE', message: 'No file uploaded' } });
      return;
    }

    const projectId = req.body.projectId || (req.query.projectId as string);

    if (projectId) {
      const project = await prisma.project.findUnique({ where: { id: projectId } });
      if (!project) {
        res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });
        return;
      }
      if (project.userId !== callerId) {
        res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Access denied: You do not own this project' } });
        return;
      }
    }

    // 1. Save file to storage abstraction
    const storageResult = await storageService.save(file, projectId ? `projects/${projectId}` : 'general');

    // 2. Register asset in database
    const asset = await prisma.asset.create({
      data: {
        userId: callerId,
        fileName: storageResult.originalName,
        url: storageResult.url,
        size: storageResult.size,
        mimeType: storageResult.mimeType,
        category: projectId ? 'project_media' : 'general'
      }
    });

    // 3. If tied to a project, create ProjectMedia
    let projectMedia = null;
    if (projectId) {
      const existingMediaCount = await prisma.projectMedia.count({ where: { projectId } });
      const isFirst = existingMediaCount === 0;

      projectMedia = await prisma.projectMedia.create({
        data: {
          projectId,
          url: storageResult.url,
          type: detectMediaType(storageResult.mimeType),
          caption: req.body.caption || null,
          altText: req.body.altText || null,
          isCover: isFirst,
          sortOrder: existingMediaCount
        }
      });

      if (isFirst) {
        await prisma.project.update({
          where: { id: projectId },
          data: { coverImage: storageResult.url }
        });
      }
    }

    res.status(201).json({
      success: true,
      data: {
        asset,
        media: projectMedia ? {
          ...projectMedia,
          createdAt: projectMedia.createdAt.toISOString()
        } : null
      }
    });
  } catch (err: any) {
    console.error('Media upload error:', err);
    res.status(400).json({ success: false, error: { code: 'UPLOAD_FAILED', message: err.message || 'Upload failed' } });
  }
});

// PATCH /api/v1/projects/:projectId/media/:mediaId - Update cover, altText, caption
mediaRouter.patch('/projects/:projectId/media/:mediaId', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;
    const { projectId, mediaId } = req.params;
    const { isCover, altText, caption } = req.body;

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });
      return;
    }
    if (project.userId !== callerId) {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Access denied: You do not own this project' } });
      return;
    }

    const targetMedia = await prisma.projectMedia.findUnique({ where: { id: mediaId } });
    if (!targetMedia || targetMedia.projectId !== projectId) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Media not found on this project' } });
      return;
    }

    if (isCover) {
      // Set all other media to isCover: false
      await prisma.projectMedia.updateMany({
        where: { projectId },
        data: { isCover: false }
      });

      // Update project cover image
      await prisma.project.update({
        where: { id: projectId },
        data: { coverImage: targetMedia.url }
      });
    }

    const updated = await prisma.projectMedia.update({
      where: { id: mediaId },
      data: {
        isCover: isCover !== undefined ? Boolean(isCover) : undefined,
        altText: altText !== undefined ? altText : undefined,
        caption: caption !== undefined ? caption : undefined
      }
    });

    res.status(200).json({
      success: true,
      data: {
        media: {
          ...updated,
          createdAt: updated.createdAt.toISOString()
        }
      }
    });
  } catch (err: any) {
    console.error('Update media error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to update media' } });
  }
});

// DELETE /api/v1/projects/:projectId/media/:mediaId - Delete media item
mediaRouter.delete('/projects/:projectId/media/:mediaId', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;
    const { projectId, mediaId } = req.params;

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });
      return;
    }
    if (project.userId !== callerId) {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Access denied: You do not own this project' } });
      return;
    }

    const targetMedia = await prisma.projectMedia.findUnique({ where: { id: mediaId } });
    if (!targetMedia || targetMedia.projectId !== projectId) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Media not found' } });
      return;
    }

    await prisma.projectMedia.delete({ where: { id: mediaId } });

    // If deleted media was cover, select next available media as cover
    if (targetMedia.isCover) {
      const nextMedia = await prisma.projectMedia.findFirst({
        where: { projectId },
        orderBy: { sortOrder: 'asc' }
      });
      await prisma.project.update({
        where: { id: projectId },
        data: { coverImage: nextMedia ? nextMedia.url : null }
      });
      if (nextMedia) {
        await prisma.projectMedia.update({
          where: { id: nextMedia.id },
          data: { isCover: true }
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Media deleted successfully'
    });
  } catch (err: any) {
    console.error('Delete media error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to delete media' } });
  }
});

// POST /api/v1/projects/:projectId/media/reorder - Reorder media items
mediaRouter.post('/projects/:projectId/media/reorder', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const callerId = req.user!.id;
    const { projectId } = req.params;
    const { mediaIds } = req.body;

    if (!Array.isArray(mediaIds)) {
      res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'mediaIds must be an array' } });
      return;
    }

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } });
      return;
    }
    if (project.userId !== callerId) {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Access denied: You do not own this project' } });
      return;
    }

    await prisma.$transaction(
      mediaIds.map((mid: string, idx: number) =>
        prisma.projectMedia.updateMany({
          where: { id: mid, projectId },
          data: { sortOrder: idx }
        })
      )
    );

    res.status(200).json({
      success: true,
      message: 'Media items reordered successfully'
    });
  } catch (err: any) {
    console.error('Reorder media error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to reorder media' } });
  }
});
