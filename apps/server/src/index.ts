import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { app } from './app.js';
import { ensurePostgresRunning } from './db-server.js';
import { prisma } from './prisma.js';

const PORT = parseInt(process.env.PORT || '4000', 10);

async function startServer() {
  try {
    // 1. Ensure PostgreSQL is active on port 5433
    await ensurePostgresRunning(5433);

    // 2. Verify database connectivity
    await prisma.$connect();
    console.log('[Server] Connected to PostgreSQL via Prisma');

    // 3. Start listening for incoming HTTP requests
    app.listen(PORT, () => {
      console.log(`[Server] Cove backend listening at http://localhost:${PORT}`);
      console.log(`[Server] Health check: http://localhost:${PORT}/api/v1/health`);
    });
  } catch (err) {
    console.error('[Server] Fatal startup error:', err);
    process.exit(1);
  }
}

startServer();
