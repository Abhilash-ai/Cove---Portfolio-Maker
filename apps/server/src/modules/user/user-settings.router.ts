import { Router, Response } from 'express';
import { prisma } from '../../prisma.js';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth.js';
import { comparePassword, hashPassword } from '../../utils/auth.js';
import fs from 'fs';
import path from 'path';

export const userSettingsRouter = Router();

// Protect all user settings endpoints
userSettingsRouter.use(authenticateToken);

// PUT /api/v1/user/password - Update password
userSettingsRouter.put('/password', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        error: { code: 'INVALID_INPUT', message: 'Current password and new password are required' }
      });
      return;
    }

    if (newPassword.length < 8) {
      res.status(400).json({
        success: false,
        error: { code: 'WEAK_PASSWORD', message: 'New password must be at least 8 characters long' }
      });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found' } });
      return;
    }

    const isMatch = await comparePassword(currentPassword, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: { code: 'INVALID_CURRENT_PASSWORD', message: 'Current password does not match' }
      });
      return;
    }

    const newHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newHash }
    });

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (err: any) {
    console.error('Password update error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'PASSWORD_UPDATE_ERROR', message: err.message || 'Failed to update password' }
    });
  }
});

// GET /api/v1/user/export - GDPR Data Export
userSettingsRouter.get('/export', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        socialLinks: true,
        skills: true,
        experiences: true,
        educations: true,
        certifications: true,
        achievements: true,
        publications: true,
        portfolios: {
          include: {
            projects: {
              include: {
                media: true
              }
            }
          }
        },
        assets: true,
        themeConfigurations: true
      }
    });

    if (!user) {
      res.status(404).json({ success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found' } });
      return;
    }

    // Exclude passwordHash from export
    const { passwordHash, ...safeUserData } = user;

    const exportPayload = {
      meta: {
        app: 'Cove Portfolio Platform',
        exportedAt: new Date().toISOString(),
        gdprCompliant: true,
        userId: user.id
      },
      user: safeUserData
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="cove-export-${user.id.slice(0, 8)}.json"`);
    res.status(200).json({
      success: true,
      data: exportPayload
    });
  } catch (err: any) {
    console.error('User export error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'EXPORT_ERROR', message: err.message || 'Failed to export user data' }
    });
  }
});

// DELETE /api/v1/user/account - GDPR Permanent Account Deletion
userSettingsRouter.delete('/account', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { confirmation } = req.body;

    if (confirmation !== 'DELETE') {
      res.status(400).json({
        success: false,
        error: { code: 'CONFIRMATION_REQUIRED', message: 'Must send { confirmation: "DELETE" } to proceed' }
      });
      return;
    }

    // 1. Gather all assets to clean up disk storage
    const assets = await prisma.asset.findMany({ where: { userId } });
    for (const asset of assets) {
      try {
        if (asset.storageKey && fs.existsSync(asset.storageKey)) {
          fs.unlinkSync(asset.storageKey);
        }
      } catch (fileErr) {
        console.warn('Could not delete file:', asset.storageKey, fileErr);
      }
    }

    // 2. Cascade delete User record (schema has Cascade onDelete on all User relations)
    await prisma.user.delete({
      where: { id: userId }
    });

    res.status(200).json({
      success: true,
      message: 'Your Cove account and all associated data have been permanently removed.'
    });
  } catch (err: any) {
    console.error('Account deletion error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'ACCOUNT_DELETE_ERROR', message: err.message || 'Failed to delete account' }
    });
  }
});
