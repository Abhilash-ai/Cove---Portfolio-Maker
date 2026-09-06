import { ensurePostgresRunning } from '../db-server.js';
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverRoot = path.resolve(__dirname, '../..');

async function main() {
  console.log('--- Cove Database Setup & Migration ---');
  await ensurePostgresRunning(5433);

  // Ensure 'cove' database exists
  const client = new pg.Client({ connectionString: 'postgresql://postgres:password@127.0.0.1:5433/postgres' });
  await client.connect();
  try {
    await client.query('CREATE DATABASE cove');
    console.log('Created database "cove"');
  } catch (e: any) {
    // Already exists
  } finally {
    await client.end();
  }

  console.log('Pushing schema to PostgreSQL "cove" database...');
  execSync(`npx prisma db push --schema=prisma/schema.prisma`, {
    cwd: serverRoot,
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: 'postgresql://postgres:password@127.0.0.1:5433/cove' }
  });

  console.log('Verifying Prisma Client connectivity...');
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: 'postgresql://postgres:password@127.0.0.1:5433/cove'
      }
    }
  });

  await prisma.$connect();
  const userCount = await prisma.user.count();
  console.log(`Connection successful! Current user count: ${userCount}`);

  console.log('Seeding foundational templates into database...');
  const templates = [
    { id: 'tpl-minimal-pure', name: 'Minimalist Pure', category: 'minimal', description: 'Clean grotesque typography and refined grid micro-interactions.' },
    { id: 'tpl-editorial-journal', name: 'Editorial Journal', category: 'editorial', description: 'Warm editorial serifs, two-column split narrative, and list previews.' },
    { id: 'tpl-studio-neo-dark', name: 'Studio Neo-Dark', category: 'studio', description: 'Immersive full-bleed header, electric blue accents, and 3D card tilt.' }
  ];

  for (const tpl of templates) {
    await prisma.template.upsert({
      where: { id: tpl.id },
      update: { name: tpl.name, category: tpl.category, description: tpl.description },
      create: { id: tpl.id, name: tpl.name, category: tpl.category, description: tpl.description }
    });
  }
  console.log('Foundational templates seeded successfully.');

  await prisma.$disconnect();
  console.log('--- Migration & Verification Complete! ---');
  process.exit(0);
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
