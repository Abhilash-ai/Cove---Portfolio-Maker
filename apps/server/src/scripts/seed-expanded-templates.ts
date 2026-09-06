import { ensurePostgresRunning } from '../db-server.js';
import { PrismaClient } from '@prisma/client';
import { ALL_EXPANDED_TEMPLATES } from '../../../web/src/engine/templates/expandedTemplates.js';

async function main() {
  console.log('--- Cove: Seeding Expanded Interactive Templates (123 archetypes) ---');

  await ensurePostgresRunning(5433);

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || 'postgresql://postgres:password@127.0.0.1:5433/cove'
      }
    }
  });

  await prisma.$connect();
  console.log(`Discovered ${ALL_EXPANDED_TEMPLATES.length} templates in catalog.`);

  let inserted = 0;
  for (const tpl of ALL_EXPANDED_TEMPLATES) {
    await prisma.template.upsert({
      where: { id: tpl.id },
      update: {
        name: tpl.name,
        category: tpl.category,
        description: tpl.description,
      },
      create: {
        id: tpl.id,
        name: tpl.name,
        category: tpl.category,
        description: tpl.description,
      }
    });
    inserted++;
  }

  // Prune orphan templates that are not in the new 123 catalog, if unreferenced
  const validIds = new Set(ALL_EXPANDED_TEMPLATES.map((t) => t.id));
  const allInDb = await prisma.template.findMany({ select: { id: true } });
  const orphanIds = allInDb.filter((t) => !validIds.has(t.id)).map((t) => t.id);

  if (orphanIds.length > 0) {
    const portfoliosUsingOrphans = await prisma.portfolio.findMany({
      where: { activeTemplateId: { in: orphanIds } },
      select: { activeTemplateId: true }
    });
    const protectedIds = new Set(portfoliosUsingOrphans.map((p) => p.activeTemplateId));
    const safeToDelete = orphanIds.filter((id) => !protectedIds.has(id));

    if (safeToDelete.length > 0) {
      const deleted = await prisma.template.deleteMany({
        where: { id: { in: safeToDelete } }
      });
      console.log(`Pruned ${deleted.count} legacy uncurated templates from database.`);
    }
  }

  const totalInDb = await prisma.template.count();
  console.log(`Successfully seeded/upserted ${inserted} templates. Total in database: ${totalInDb}`);

  await prisma.$disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error('Failed to seed expanded templates:', err);
  process.exit(1);
});
