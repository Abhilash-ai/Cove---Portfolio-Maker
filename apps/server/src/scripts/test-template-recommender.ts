import { ensurePostgresRunning } from '../db-server.js';
import { app } from '../app.js';
import http from 'http';
import { AddressInfo } from 'net';

const PORT = 4098;
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
  console.log('   COVE PHASE 8: AI TEMPLATE RECOMMENDER TEST SUITE   ');
  console.log('======================================================\n');

  await startServer();

  try {
    const timestamp = Date.now().toString().slice(-4);
    const email = `recommender_${timestamp}@cove.test`;
    const password = 'StrongPassword123!';

    // 1. Register test user
    console.log('[1/6] Registering test user ...');
    const signupRes = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name: 'Tadao Ando' })
    });
    const signupData = await signupRes.json();
    assert(signupRes.status === 201 && signupData.success, 'Registration failed');
    const token = signupData.data.token;
    console.log('  -> PASS: Test user registered');

    // 2. Query GET /api/v1/templates and test catalog search & filters
    console.log('[2/6] Testing GET /api/v1/templates with search & multi-dimensional filters ...');
    const allRes = await fetch(`${baseUrl}/templates`);
    const allData = await allRes.json();
    assert(allRes.status === 200 && allData.success, 'Failed to fetch templates');
    assert(allData.data.templates.length >= 3, `Expected >= 3 templates, got ${allData.data.templates.length}`);

    // Test text search
    const searchRes = await fetch(`${baseUrl}/templates?q=pure`);
    const searchData = await searchRes.json();
    assert(searchData.data.templates.length === 1 && searchData.data.templates[0].id === 'tpl-minimal-pure', 'Search query failed');

    // Test category filter
    const catRes = await fetch(`${baseUrl}/templates?category=editorial`);
    const catData = await catRes.json();
    assert(catData.data.templates.length === 1 && catData.data.templates[0].id === 'tpl-editorial-journal', 'Category filter failed');

    // Test profession filter
    const profRes = await fetch(`${baseUrl}/templates?profession=architect`);
    const profData = await profRes.json();
    assert(profData.data.templates.some((t: any) => t.id === 'tpl-studio-neo-dark'), 'Profession filter failed');
    console.log('  -> PASS: Template catalog search and filter dimensions operating correctly');

    // 3. Test Recommendation for Architect / Spatial Designer with Rich Media
    console.log('[3/6] Testing AI recommendation for Architect with rich media density ...');
    const archRecRes = await fetch(`${baseUrl}/templates/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        signals: {
          profession: 'Architect & Concrete Sculptor',
          mediaDensity: 'rich',
          desiredPersonality: 'studio'
        }
      })
    });
    const archRecData = await archRecRes.json();
    assert(archRecRes.status === 200 && archRecData.success, 'Architect recommendation request failed');
    const archRecs = archRecData.data.recommendations;
    assert(archRecs.length >= 3, 'Expected at least 3 recommendations');
    assert(archRecs[0].templateId === 'tpl-studio-neo-dark', `Expected tpl-studio-neo-dark as #1 for architect, got ${archRecs[0].templateId}`);
    assert(archRecs[0].matchPercentage >= 80, `Expected match >= 80%, got ${archRecs[0].matchPercentage}`);
    assert(archRecs[0].rationale.includes('Architect') || archRecs[0].rationale.includes('imagery'), 'Rationale missing contextual explanation');
    console.log(`  -> PASS: Ranked #1: ${archRecs[0].name} (${archRecs[0].matchPercentage}% match) with rationale: "${archRecs[0].rationale}"`);

    // 4. Test Recommendation for Software Engineer with Minimal Media
    console.log('[4/6] Testing AI recommendation for Software Developer with minimal media ...');
    const devRecRes = await fetch(`${baseUrl}/templates/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        signals: {
          profession: 'Full-Stack Developer',
          mediaDensity: 'minimal',
          textDensity: 'minimal',
          desiredPersonality: 'minimal'
        }
      })
    });
    const devRecData = await devRecRes.json();
    assert(devRecRes.status === 200 && devRecData.success, 'Developer recommendation request failed');
    const devRecs = devRecData.data.recommendations;
    assert(devRecs[0].templateId === 'tpl-minimal-pure', `Expected tpl-minimal-pure as #1 for developer, got ${devRecs[0].templateId}`);
    console.log(`  -> PASS: Ranked #1: ${devRecs[0].name} (${devRecs[0].matchPercentage}% match)`);

    // 5. Test Recommendation for UX Researcher / Academic with Rich Text
    console.log('[5/6] Testing AI recommendation for Researcher with rich case study text ...');
    const resRecRes = await fetch(`${baseUrl}/templates/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        signals: {
          profession: 'UX Researcher',
          textDensity: 'rich',
          portfolioPurpose: 'academic'
        }
      })
    });
    const resRecData = await resRecRes.json();
    assert(resRecRes.status === 200 && resRecData.success, 'Researcher recommendation request failed');
    const resRecs = resRecData.data.recommendations;
    assert(resRecs[0].templateId === 'tpl-editorial-journal', `Expected tpl-editorial-journal as #1 for researcher, got ${resRecs[0].templateId}`);
    console.log(`  -> PASS: Ranked #1: ${resRecs[0].name} (${resRecs[0].matchPercentage}% match)`);

    // 6. Test Favorite Bookmarking cycle
    console.log('[6/6] Testing Template Favorite Bookmarking cycle ...');
    const favRes1 = await fetch(`${baseUrl}/templates/tpl-studio-neo-dark/favorite`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    const favData1 = await favRes1.json();
    assert(favRes1.status === 200 && favData1.data.favorited === true, 'Failed to favorite template');

    const getFavsRes = await fetch(`${baseUrl}/templates/favorites`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const getFavsData = await getFavsRes.json();
    assert(getFavsData.data.favorites.includes('tpl-studio-neo-dark'), 'Favorite not present in user favorites list');

    // Toggle off
    const favRes2 = await fetch(`${baseUrl}/templates/tpl-studio-neo-dark/favorite`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    const favData2 = await favRes2.json();
    assert(favData2.data.favorited === false, 'Failed to un-favorite template');
    console.log('  -> PASS: Template favorite toggle cycle verified');

    console.log('\n======================================================');
    console.log('   ALL PHASE 8 TEMPLATE RECOMMENDER TESTS PASSED!     ');
    console.log('======================================================\n');
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
