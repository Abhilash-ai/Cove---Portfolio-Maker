import { ensurePostgresRunning } from '../db-server.js';
import { app } from '../app.js';
import http from 'http';
import { AddressInfo } from 'net';
import { MINIMAL_PRESET, STUDIO_PRESET } from '@cove/shared';

const PORT = 4099;
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
  console.log('\n======================================================');
  console.log('   COVE PHASE 4: VISUAL EDITOR & CUSTOMIZER TEST SUITE');
  console.log('======================================================\n');

  await startServer();

  try {
    const timestamp = Date.now().toString().slice(-4);
    const email = `designer_${timestamp}@cove.test`;
    const password = 'StrongPassword123!';

    // 1. Register user
    console.log('[1/5] Registering test user ...');
    const signupRes = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name: 'Elena Rostova' })
    });
    const signupData = await signupRes.json();
    assert(signupRes.status === 201 && signupData.success, 'User registration failed');
    const token = signupData.data.token;
    console.log('  -> PASS: User registered and token issued');

    // 2. Create Portfolio
    console.log('[2/5] Creating test portfolio ...');
    const createRes = await fetch(`${baseUrl}/portfolios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Spatial Aesthetics 2026',
        slug: `spatial-aesthetics-${timestamp}`,
      })
    });
    const createData = await createRes.json();
    assert(createRes.status === 201 && createData.success, 'Portfolio creation failed');
    const portfolioId = createData.data.portfolio.id;
    console.log(`  -> PASS: Portfolio created (ID: ${portfolioId})`);

    // 3. Update Custom Tokens, activeTemplateId & sectionOrder via Visual Editor auto-save endpoint
    console.log('[3/5] Updating customTokens, activeTemplateId, and sectionOrder via PUT /portfolios/:id ...');
    const customTokensPayload = {
      ...STUDIO_PRESET,
      colors: {
        ...STUDIO_PRESET.colors,
        accent: '#00F0FF',
        background: '#04060A',
      },
      spacing: {
        ...STUDIO_PRESET.spacing,
        radius: '1.25rem',
      }
    };
    const customSectionOrder = ['hero', 'skills', 'projects', 'contact'];

    const updateRes = await fetch(`${baseUrl}/portfolios/${portfolioId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        customTokens: customTokensPayload,
        activeTemplateId: 'tpl-studio-neo-dark',
        sectionOrder: customSectionOrder
      })
    });
    const updateData = await updateRes.json();
    assert(updateRes.status === 200 && updateData.success, 'Portfolio update failed');
    assert(updateData.data.portfolio.activeTemplateId === 'tpl-studio-neo-dark', 'activeTemplateId not updated');
    assert(updateData.data.portfolio.customTokens.colors.accent === '#00F0FF', 'customTokens accent not updated');
    assert(updateData.data.portfolio.customTokens.spacing.radius === '1.25rem', 'customTokens radius not updated');
    assert(JSON.stringify(updateData.data.portfolio.sectionOrder) === JSON.stringify(customSectionOrder), 'sectionOrder mismatch');
    console.log('  -> PASS: Visual editor customizations persisted to PostgreSQL');

    // 4. Retrieve portfolio by ID and verify persistence
    console.log('[4/5] Retrieving portfolio via GET /portfolios/:id ...');
    const getRes = await fetch(`${baseUrl}/portfolios/${portfolioId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const getData = await getRes.json();
    assert(getRes.status === 200 && getData.success, 'Failed to fetch portfolio by ID');
    const fetchedPortfolio = getData.data.portfolio;
    assert(fetchedPortfolio.activeTemplateId === 'tpl-studio-neo-dark', 'activeTemplateId did not persist');
    assert(fetchedPortfolio.customTokens.colors.background === '#04060A', 'customTokens background did not persist');
    assert(JSON.stringify(fetchedPortfolio.sectionOrder) === JSON.stringify(customSectionOrder), 'sectionOrder did not persist');
    console.log('  -> PASS: Verified customTokens, activeTemplateId, and sectionOrder persisted cleanly');

    // 5. Verify /portfolios/mine includes customTokens and activeTemplateId
    console.log('[5/5] Verifying /portfolios/mine returns editor metadata ...');
    const mineRes = await fetch(`${baseUrl}/portfolios/mine`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const mineData = await mineRes.json();
    assert(mineRes.status === 200 && mineData.success, 'Failed to fetch portfolios/mine');
    const found = mineData.data.portfolios.find((p: any) => p.id === portfolioId);
    assert(found !== undefined, 'Portfolio not found in mine list');
    assert(found.activeTemplateId === 'tpl-studio-neo-dark', 'activeTemplateId missing from mine list');
    assert(found.customTokens !== undefined && found.customTokens !== null, 'customTokens missing from mine list');
    console.log('  -> PASS: GET /portfolios/mine returns custom tokens and active template metadata');

    console.log('\n======================================================');
    console.log('   ALL PHASE 4 VISUAL EDITOR TESTS PASSED!            ');
    console.log('======================================================\n');
  } finally {
    await stopServer();
    process.exit(0);
  }
}

run().catch(async (err) => {
  console.error('\n❌ Test Suite Failed:', err);
  await stopServer();
  process.exit(1);
});
