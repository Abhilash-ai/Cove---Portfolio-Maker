import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { authRouter } from './modules/auth/auth.router.js';
import { portfolioRouter } from './modules/portfolio/portfolio.router.js';
import { profileRouter } from './modules/profile/profile.router.js';
import { projectRouter } from './modules/project/project.router.js';
import { mediaRouter } from './modules/media/media.router.js';
import { resumeRouter } from './modules/resume/resume.router.js';
import { publicRouter } from './modules/public/public.router.js';
import { aiRouter } from './modules/ai/ai.router.js';
import { templatesRouter } from './modules/templates/templates.router.js';
import { adminRouter } from './modules/admin/admin.router.js';
import { userSettingsRouter } from './modules/user/user-settings.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Serve static uploaded files locally
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

// Health check endpoint
app.get('/api/v1/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'cove-api'
  });
});

// Mount module routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/public', publicRouter);
app.use('/api/v1/templates', templatesRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/portfolios', portfolioRouter);
app.use('/api/v1/resume', resumeRouter);
app.use('/api/v1/ai', aiRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/user', userSettingsRouter);
app.use('/api/v1', projectRouter);
app.use('/api/v1', mediaRouter);

// Fallback 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: 'The requested API route does not exist'
    }
  });
});
