import { ensurePostgresRunning } from '../db-server.js';
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverRoot = path.resolve(__dirname, '../..');

async function main() {
  console.log('--- AM Studio Database Setup & Migration ---');
  await ensurePostgresRunning(5433);

  console.log('Pushing schema to PostgreSQL database...');
  execSync(`npx prisma db push --schema=prisma/schema.prisma`, {
    cwd: serverRoot,
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: 'postgresql://postgres:postgres@127.0.0.1:5433/amstudio' }
  });

  console.log('Verifying Prisma Client connectivity...');
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: 'postgresql://postgres:postgres@127.0.0.1:5433/amstudio'
      }
    }
  });

  await prisma.$connect();
  const userCount = await prisma.user.count();
  console.log(`Connection successful! Current user count: ${userCount}`);
  await prisma.$disconnect();
  console.log('--- Migration & Verification Complete! ---');
  process.exit(0);
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
