import { ensurePostgresRunning } from '../db-server.js';
import { app } from '../app.js';
import http from 'http';
import { AddressInfo } from 'net';

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
  console.log('\n==========================================================');
  console.log('   COVE PHASE 10: PORTFOLIO CRITIC & HARDENING TEST SUITE  ');
  console.log('==========================================================\n');

  await startServer();

  try {
    const timestamp = Date.now().toString().slice(-4);
    const aliceEmail = `alice_critic_${timestamp}@cove.test`;
    const bobEmail = `bob_attacker_${timestamp}@cove.test`;
    const password = 'StrongPassword123!';

    // 1. Register User Alice
    console.log('[1/6] Registering Alice and creating sparse portfolio ...');
    const aliceSignup = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: aliceEmail, password, name: 'Alice Designer' })
    });
    const aliceData = await aliceSignup.json();
    assert(aliceSignup.status === 201 && aliceData.success, 'Alice registration failed');
    const aliceToken = aliceData.data.token;

    // Create sparse portfolio
    const createPortRes = await fetch(`${baseUrl}/portfolios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${aliceToken}`
      },
      body: JSON.stringify({
        title: 'Draft Incomplete Portfolio',
        slug: `draft-sparse-${timestamp}`
      })
    });
    const portData = await createPortRes.json();
    assert(createPortRes.status === 201 && portData.success, 'Portfolio creation failed');
    const portfolioId = portData.data?.portfolio?.id || portData.data?.id;
    assert(!!portfolioId, 'Expected portfolioId to be valid');
    console.log(`  -> PASS: Sparse portfolio created with ID ${portfolioId}`);

    // 2. Call Portfolio Critic on sparse portfolio
    console.log('[2/6] Generating Critic Report on sparse portfolio ...');
    const criticSparseRes = await fetch(`${baseUrl}/ai/critic/${portfolioId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${aliceToken}`
      }
    });
    const criticSparseData = await criticSparseRes.json();
    assert(criticSparseRes.status === 200 && criticSparseData.success, 'Critic evaluation failed');
    const report1 = criticSparseData.data?.report || criticSparseData.data;
    console.log(`  -> Score: ${report1.overallScore}/100`);
    console.log(`  -> Suggestions count: ${report1.feedbackItems?.length || 0}`);
    console.log(`  -> Strengths count: ${report1.strengths?.length || 0}`);
    
    assert(typeof report1.overallScore === 'number', 'Score must be a number');
    assert(report1.overallScore < 70, `Expected low score (<70) for empty portfolio, got ${report1.overallScore}`);
    assert((report1.feedbackItems?.length || 0) > 0, 'Should have suggestions for empty portfolio');
    assert(report1.breakdown.completeness < 70, 'Completeness should be low');
    console.log('  -> PASS: Sparse portfolio correctly identified with actionable critique');

    // 3. Populate portfolio with rich profile & projects
    console.log('[3/6] Upgrading profile & projects with rich case studies & cover assets ...');
    const updateProfileRes = await fetch(`${baseUrl}/profile/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${aliceToken}`
      },
      body: JSON.stringify({
        headline: 'Senior Product Designer & Systems Architect',
        bio: 'Senior Product Designer with 7+ years of experience leading UX and design systems for enterprise SaaS and consumer apps.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        socialLinks: [
          { platform: 'github', url: 'https://github.com/alicedesigner' },
          { platform: 'linkedin', url: 'https://linkedin.com/in/alicedesigner' },
          { platform: 'twitter', url: 'https://x.com/alicedesigner' }
        ]
      })
    });
    const profileUpdateData = await updateProfileRes.json();
    assert(updateProfileRes.status === 200 && profileUpdateData.success, 'Profile update failed');

    // Add 2 well-documented projects with covers and metrics
    const p1Res = await fetch(`${baseUrl}/portfolios/${portfolioId}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${aliceToken}`
      },
      body: JSON.stringify({
        title: 'Fintech Mobile Design System',
        shortDescription: 'Complete overhaul of cross-platform design tokens.',
        fullDescription: 'Complete overhaul of cross-platform design tokens, raising accessibility compliance to WCAG AAA and accelerating feature delivery by 40%. Implemented strict contrast ratios and automated linter hooks.',
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
        tools: ['Design Systems', 'Figma', 'React', 'Mobile']
      })
    });
    const p1Data = await p1Res.json();
    assert(p1Res.status === 201 && p1Data.success, 'Project 1 creation failed');

    const p2Res = await fetch(`${baseUrl}/portfolios/${portfolioId}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${aliceToken}`
      },
      body: JSON.stringify({
        title: 'Autonomous Navigation HUD Dashboard',
        shortDescription: 'Telemetry HUD displaying sensor fusion data with sub-100ms render latency.',
        fullDescription: 'Designed real-time telemetry HUD displaying sensor fusion data with sub-100ms render latency. Tested with 30 field pilots across adverse driving environments.',
        coverImage: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=80',
        tools: ['HUD', 'Data Visualization', 'Automotive', 'UX Research']
      })
    });
    const p2Data = await p2Res.json();
    assert(p2Res.status === 201 && p2Data.success, 'Project 2 creation failed');
    console.log('  -> PASS: Rich profile and 2 projects successfully saved');

    // 4. Call Portfolio Critic on upgraded portfolio
    console.log('[4/6] Re-evaluating enriched portfolio with AI Critic ...');
    const criticEnrichedRes = await fetch(`${baseUrl}/ai/critic/${portfolioId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${aliceToken}`
      }
    });
    const criticEnrichedData = await criticEnrichedRes.json();
    assert(criticEnrichedRes.status === 200 && criticEnrichedData.success, 'Critic evaluation failed');
    const report2 = criticEnrichedData.data?.report || criticEnrichedData.data;
    console.log(`  -> New Score: ${report2.overallScore}/100 (Previous: ${report1.overallScore}/100)`);
    console.log(`  -> Breakdown: completeness=${report2.breakdown.completeness}, storytelling=${report2.breakdown.storytelling}, visualHierarchy=${report2.breakdown.visualHierarchy}, mobileReadiness=${report2.breakdown.mobileReadiness}, contactClarity=${report2.breakdown.contactClarity}`);
    console.log(`  -> Strengths: ${report2.strengths.join('; ')}`);

    assert(report2.overallScore > report1.overallScore, 'Score must improve after adding content');
    assert(report2.overallScore >= 80, `Expected score >= 80, got ${report2.overallScore}`);
    assert(report2.strengths.length > 0, 'Enriched portfolio should have recognized strengths');
    console.log('  -> PASS: Critic score dynamically elevated with recognized strengths');

    // 5. Security & Ownership Hardening: Unauthorized user cannot critique another user's portfolio
    console.log('[5/6] Testing Security Barrier: Bob attempts to invoke critic on Alice\'s portfolio ...');
    const bobSignup = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: bobEmail, password, name: 'Bob Attacker' })
    });
    const bobData = await bobSignup.json();
    assert(bobSignup.status === 201, 'Bob registration failed');
    const bobToken = bobData.data.token;

    const unauthorizedRes = await fetch(`${baseUrl}/ai/critic/${portfolioId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bobToken}`
      }
    });
    assert(unauthorizedRes.status === 404 || unauthorizedRes.status === 403, `Expected 404 or 403, got ${unauthorizedRes.status}`);
    console.log(`  -> PASS: Access forbidden/denied for cross-tenant access (${unauthorizedRes.status})`);

    // 6. Unauthenticated request verification
    console.log('[6/6] Testing Unauthenticated request rejection ...');
    const unauthRes = await fetch(`${baseUrl}/ai/critic/${portfolioId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    assert(unauthRes.status === 401, `Expected 401 Unauthorized, got ${unauthRes.status}`);
    console.log('  -> PASS: 401 Unauthorized returned for missing Bearer token');

    console.log('\n==========================================================');
    console.log('   ALL PHASE 10 PORTFOLIO CRITIC & HARDENING TESTS PASSED!');
    console.log('==========================================================\n');
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
