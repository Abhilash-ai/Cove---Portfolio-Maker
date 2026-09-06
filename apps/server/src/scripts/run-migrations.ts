import { ensurePostgresRunning } from '../db-server.js';
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import { ALL_EXPANDED_TEMPLATES } from '../../../web/src/engine/templates/expandedTemplates.js';

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

  console.log('Seeding all 200+ interactive archetypes into database...');
  for (const tpl of ALL_EXPANDED_TEMPLATES) {
    await prisma.template.upsert({
      where: { id: tpl.id },
      update: { name: tpl.name, category: tpl.category, description: tpl.description },
      create: { id: tpl.id, name: tpl.name, category: tpl.category, description: tpl.description }
    });
  }
  const seededCount = await prisma.template.count();
  console.log(`Templates seeded successfully. Total in database: ${seededCount}`);

  await prisma.$disconnect();
  console.log('--- Migration & Verification Complete! ---');
  process.exit(0);
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
