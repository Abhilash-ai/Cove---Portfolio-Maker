import { PrismaClient } from '@prisma/client';
import { ALL_EXPANDED_TEMPLATES } from '../../../web/src/engine/templates/expandedTemplates.js';

async function main() {
  console.log('--- Cove: Seeding Expanded Interactive Templates (219 archetypes) ---');

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

  const totalInDb = await prisma.template.count();
  console.log(`Successfully seeded/upserted ${inserted} templates. Total in database: ${totalInDb}`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('Failed to seed expanded templates:', err);
  process.exit(1);
});
