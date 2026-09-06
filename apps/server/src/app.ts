import express from 'express';
import cors from 'cors';
import { authRouter } from './modules/auth/auth.router.js';
import { portfolioRouter } from './modules/portfolio/portfolio.router.js';

export const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

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
app.use('/api/v1/portfolios', portfolioRouter);

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
