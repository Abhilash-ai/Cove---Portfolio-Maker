import { Router, Response } from 'express';
import { prisma } from '../../prisma.js';
import { hashPassword, comparePassword, generateToken } from '../../utils/auth.js';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth.js';

export const authRouter = Router();

// POST /auth/signup
authRouter.post('/signup', async (req, res): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      res.status(400).json({
        success: false,
        error: { code: 'INVALID_EMAIL', message: 'A valid email address is required' }
      });
      return;
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      res.status(400).json({
        success: false,
        error: { code: 'WEAK_PASSWORD', message: 'Password must be at least 8 characters long' }
      });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existing) {
      res.status(409).json({
        success: false,
        error: { code: 'EMAIL_ALREADY_EXISTS', message: 'An account with this email already exists' }
      });
      return;
    }

    const passwordHash = await hashPassword(password);

    // Create user and profile atomically
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        name: name?.trim() || null,
        profile: {
          create: {
            headline: null,
            bio: null,
            contactEmail: normalizedEmail
          }
        }
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    res.status(201).json({
      success: true,
      data: {
        user: {
          ...user,
          createdAt: user.createdAt.toISOString()
        },
        token
      }
    });
  } catch (err: any) {
    console.error('Signup error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to complete registration' }
    });
  }
});

// POST /auth/login
authRouter.post('/login', async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: { code: 'MISSING_CREDENTIALS', message: 'Both email and password are required' }
      });
      return;
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (!user) {
      res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }
      });
      return;
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }
      });
      return;
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt.toISOString()
        },
        token
      }
    });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to authenticate user' }
    });
  }
});

// GET /auth/me
authRouter.get('/me', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        profile: true
      }
    });

    if (!user) {
      res.status(404).json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User record not found' }
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          ...user,
          createdAt: user.createdAt.toISOString()
        }
      }
    });
  } catch (err: any) {
    console.error('Auth /me error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to retrieve user profile' }
    });
  }
});
