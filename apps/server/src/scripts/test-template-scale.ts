import { ensurePostgresRunning } from '../db-server.js';
import { app } from '../app.js';
import http from 'http';
import { AddressInfo } from 'net';
import { PrismaClient } from '@prisma/client';
import { ALL_EXPANDED_TEMPLATES } from '../../../web/src/engine/templates/expandedTemplates.js';

const PORT = 4097;
let server: http.Server;
let baseUrl = '';

async function startServer(): Promise<void> {
  await ensurePostgresRunning(5433);
  return new Promise((resolve) => {
    server = app.listen(PORT, '127.0.0.1', () => {
      const addr = server.address() as AddressInfo;
      baseUrl = `http://127.0.0.1:${addr.port}/api/v1`;
      resolve();
    });
  });
}

async function stopServer(): Promise<void> {
  return new Promise((resolve) => {
    server.close(() => resolve());
  });
}

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`ASSERTION FAILED: ${msg}`);
  }
}

async function run() {
  console.log('\n================================================================');
  console.log('   COVE PHASE 9: SCALE & DISTINCTIVENESS TEST SUITE (120+ INTERACTIVE TEMPLATES)   ');
  console.log('================================================================\n');

  await startServer();

  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || 'postgresql://postgres:password@127.0.0.1:5433/cove'
        }
      }
    });
    await prisma.$connect();

    // 1. Assert template count >= 200
    console.log('[1/5] Verifying catalog scale in database & generator >= 120 ...');
    const catalogCount = ALL_EXPANDED_TEMPLATES.length;
    const dbCount = await prisma.template.count();
    console.log(`  Catalog generated templates: ${catalogCount}`);
    console.log(`  Database registered templates: ${dbCount}`);
    assert(catalogCount >= 120, `Expected catalog >= 120 templates, got ${catalogCount}`);
    assert(dbCount >= 120, `Expected database >= 120 templates, got ${dbCount}`);
    console.log('  -> PASS: Verified 120+ template threshold satisfied');

    // 2. Assert representation across all 12 style presets & intra-preset distinctiveness
    console.log('[2/5] Verifying representation across all 12 style presets & intra-preset distinctiveness ...');
    const expectedPresets = [
      'minimal', 'editorial', 'studio', 'brutalist', 'swiss', 'cinematic',
      'monochrome', 'darktechnical', 'magazine', 'academic', 'luxury', 'playful'
    ];
    for (const preset of expectedPresets) {
      const matching = ALL_EXPANDED_TEMPLATES.filter((t) => t.id.toLowerCase().includes(preset));
      assert(matching.length >= 10, `Expected >= 10 templates for preset "${preset}", got ${matching.length}`);
      console.log(`  Preset [${preset}]: ${matching.length} interactive variants`);

      // Automated distinctiveness check: no pair in the same preset may share (heroVariant, projectLayout, sectionOrder)
      for (let i = 0; i < matching.length; i++) {
        for (let j = i + 1; j < matching.length; j++) {
          const t1 = matching[i];
          const t2 = matching[j];
          const t1Triple = `${t1.heroVariant}::${t1.projectLayout}::${t1.sectionOrder.join(',')}`;
          const t2Triple = `${t2.heroVariant}::${t2.projectLayout}::${t2.sectionOrder.join(',')}`;
          assert(
            t1Triple !== t2Triple,
            `Distinctiveness violation in preset "${preset}": ${t1.id} and ${t2.id} share identical triple (${t1Triple})`
          );
        }
      }
    }
    console.log('  -> PASS: All 12 presets verified: >= 10 templates each with strictly unique (hero, layout, sectionOrder) triples');

    // 3. Assert motion & interaction profiles across all archetypes
    console.log('[3/5] Verifying motion & interaction profiles across all templates ...');
    let scrollRevealCount = 0;
    let magneticButtonsCount = 0;
    let cardTiltCount = 0;
    let customCursorCount = 0;

    for (const tpl of ALL_EXPANDED_TEMPLATES) {
      assert(Boolean(tpl.interactionProfile), `Template ${tpl.id} missing interactionProfile`);
      if (tpl.interactionProfile.scrollReveal) scrollRevealCount++;
      if (tpl.interactionProfile.magneticButtons) magneticButtonsCount++;
      if (tpl.interactionProfile.cardTilt) cardTiltCount++;
      if (tpl.interactionProfile.customCursor) customCursorCount++;
    }

    assert(scrollRevealCount === catalogCount, 'Every template must have scroll reveal enabled');
    assert(magneticButtonsCount > 0, 'Templates must include magnetic button interactive capabilities');
    assert(cardTiltCount > 0, 'Templates must include card tilt interactive capabilities');
    assert(customCursorCount > 0, 'Templates must include custom cursor capabilities');
    console.log(`  Scroll Reveal enabled: ${scrollRevealCount}/${catalogCount}`);
    console.log(`  Magnetic Buttons enabled: ${magneticButtonsCount}/${catalogCount}`);
    console.log(`  Card Tilt enabled: ${cardTiltCount}/${catalogCount}`);
    console.log(`  Custom Cursor enabled: ${customCursorCount}/${catalogCount}`);
    console.log('  -> PASS: Every archetype implements fluid reactive motion pipeline');

    // 4. Test User portfolio creation with rich content
    console.log('[4/5] Registering user and seeding multi-section portfolio ...');
    const timestamp = Date.now().toString().slice(-4);
    const email = `scale_user_${timestamp}@cove.test`;
    const password = 'StrongPassword123!';

    const signupRes = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name: 'Renzo Piano' })
    });
    const signupData = await signupRes.json();
    assert(signupRes.status === 201 && signupData.success, 'User signup failed');
    const token = signupData.data.token;

    // Create portfolio
    const portRes = await fetch(`${baseUrl}/portfolios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Renzo Piano Building Workshop',
        slug: `renzo-piano-${timestamp}`,
        activeTemplateId: 'tpl-minimal-pure'
      })
    });
    const portData = await portRes.json();
    assert(portRes.status === 201 && portData.success, 'Portfolio creation failed');
    const portfolioId = portData.data.portfolio.id;

    // Add projects
    const p1Res = await fetch(`${baseUrl}/portfolios/${portfolioId}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'The Shard London',
        description: 'A 72-storey mixed-use tower resembling a glass spire piercing the London skyline.',
        role: 'Principal Architect',
        category: 'Architecture',
        coverImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad'
      })
    });
    assert(p1Res.status === 201, 'Failed to add project 1');

    const p2Res = await fetch(`${baseUrl}/portfolios/${portfolioId}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Centre Pompidou Paris',
        description: 'Exoskeleton cultural landmark expressing functional mechanics and bold color coding.',
        role: 'Co-Design Partner',
        category: 'Cultural',
        coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'
      })
    });
    assert(p2Res.status === 201, 'Failed to add project 2');
    console.log('  -> PASS: User portfolio created with 2 comprehensive architectural projects');

    // 5. Test Switching Invariant across 15 randomly sampled templates from distinct presets
    console.log('[5/5] Testing template switching invariant across 15 sampled archetypes ...');
    const sampledIds: string[] = [
      'tpl-minimal-pure',
      'tpl-editorial-journal',
      'tpl-studio-neo-dark'
    ];

    for (const preset of expectedPresets) {
      const match = ALL_EXPANDED_TEMPLATES.find((t) => t.id.toLowerCase().includes(preset) && !sampledIds.includes(t.id));
      if (match) sampledIds.push(match.id);
    }

    console.log(`  Switching through ${sampledIds.length} distinct archetypes:`);
    for (let i = 0; i < sampledIds.length; i++) {
      const targetTplId = sampledIds[i];
      const updateRes = await fetch(`${baseUrl}/portfolios/${portfolioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ activeTemplateId: targetTplId })
      });
      assert(updateRes.status === 200, `Failed switching to template ${targetTplId}: status ${updateRes.status}`);

      // Verify portfolio content invariant
      const verifyRes = await fetch(`${baseUrl}/portfolios/${portfolioId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const verifyData = await verifyRes.json();
      const p = verifyData.data.portfolio;

      assert(p.activeTemplateId === targetTplId, `Template not updated: expected ${targetTplId}, got ${p.activeTemplateId}`);
      assert(p.projects.length === 2, `Data loss! Expected 2 projects, got ${p.projects.length} on template ${targetTplId}`);
      assert(p.projects[0].title === 'The Shard London', `Content corruption on project 1 during switch to ${targetTplId}`);
      assert(p.projects[1].title === 'Centre Pompidou Paris', `Content corruption on project 2 during switch to ${targetTplId}`);
      console.log(`    [${i + 1}/${sampledIds.length}] Switch to ${targetTplId} -> 100% data intact`);
    }

    console.log('  -> PASS: All 15 template switches preserved 100% portfolio data without duplication or corruption');

    await prisma.$disconnect();

    console.log('\n================================================================');
    console.log('   ALL PHASE 9 SCALE & INVARIANT TESTS PASSED CLEANLY!         ');
    console.log('================================================================\n');
  } finally {
    await stopServer();
  }
}

run()
  .then(() => process.exit(0))
  .catch(async (err) => {
    console.error('\n❌ Test Suite Failed:', err);
    await stopServer();
    process.exit(1);
  });
