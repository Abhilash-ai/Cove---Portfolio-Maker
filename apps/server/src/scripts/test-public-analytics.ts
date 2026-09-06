import { ensurePostgresRunning } from '../db-server.js';
import { app } from '../app.js';
import http from 'http';
import { AddressInfo } from 'net';

const PORT = 4096;
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
  console.log('   COVE PHASE 6: PUBLISHING & ANALYTICS TEST SUITE   ');
  console.log('======================================================\n');

  await startServer();

  try {
    const timestamp = Date.now().toString().slice(-4);
    const email = `publisher_${timestamp}@cove.test`;
    const password = 'StrongPassword123!';
    const slug = `public-showcase-${timestamp}`;

    // 1. Register test user
    console.log('[1/6] Registering test user ...');
    const signupRes = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name: 'Maya Lin' })
    });
    const signupData = await signupRes.json();
    assert(signupRes.status === 201 && signupData.success, 'Registration failed');
    const token = signupData.data.token;
    console.log('  -> PASS: User registered');

    // 2. Create portfolio in draft status
    console.log('[2/6] Creating draft portfolio ...');
    const createRes = await fetch(`${baseUrl}/portfolios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Maya Lin Spatial Works',
        slug,
      })
    });
    const createData = await createRes.json();
    assert(createRes.status === 201 && createData.success, 'Portfolio creation failed');
    const portfolioId = createData.data.portfolio.id;
    console.log(`  -> PASS: Draft portfolio created (slug: ${slug})`);

    // 3. Assert unauthenticated GET /public/p/:slug returns 404 for draft
    console.log('[3/6] Verifying draft portfolio is private (404 on unauthenticated public request) ...');
    const draftPubRes = await fetch(`${baseUrl}/public/p/${slug}`);
    assert(draftPubRes.status === 404, `Expected 404 for draft, got ${draftPubRes.status}`);
    console.log('  -> PASS: Draft portfolio correctly hidden from public access');

    // 4. Test Slug validation & blacklist endpoint
    console.log('[4/6] Testing GET /public/check-slug with reserved, taken, and available slugs ...');
    // Reserved slug
    const resReserved = await fetch(`${baseUrl}/public/check-slug?slug=admin`);
    const dataReserved = await resReserved.json();
    assert(dataReserved.available === false && dataReserved.reason === 'RESERVED', 'Reserved slug check failed');

    // Taken slug
    const resTaken = await fetch(`${baseUrl}/public/check-slug?slug=${slug}`);
    const dataTaken = await resTaken.json();
    assert(dataTaken.available === false && dataTaken.reason === 'TAKEN', 'Taken slug check failed');

    // Available slug
    const resAvail = await fetch(`${baseUrl}/public/check-slug?slug=unique-avail-${timestamp}`);
    const dataAvail = await resAvail.json();
    assert(dataAvail.available === true, 'Available slug check failed');
    console.log('  -> PASS: Reserved slugs blocked and availability validated');

    // 5. Publish portfolio & verify public resolution
    console.log('[5/6] Publishing portfolio and testing GET /public/p/:slug ...');
    const pubUpdateRes = await fetch(`${baseUrl}/portfolios/${portfolioId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: 'published' })
    });
    assert(pubUpdateRes.status === 200, 'Failed to update portfolio to published');

    const liveRes = await fetch(`${baseUrl}/public/p/${slug}`);
    const liveData = await liveRes.json();
    assert(liveRes.status === 200 && liveData.success, 'Public portfolio failed to load');
    assert(liveData.data.portfolio.title === 'Maya Lin Spatial Works', 'Title mismatch');
    assert(liveData.data.profile.name === 'Maya Lin', 'Profile name mismatch');
    console.log('  -> PASS: Published portfolio rendered unauthenticated with full profile and data');

    // 6. Test Zero-Cookie Analytics tracking & aggregation
    console.log('[6/6] Tracking synthetic analytics events & checking creator dashboard metrics ...');
    // Track Desktop Pageview
    await fetch(`${baseUrl}/public/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      body: JSON.stringify({ slug, eventType: 'view', referrer: 'https://twitter.com' })
    });

    // Track Mobile Pageview
    await fetch(`${baseUrl}/public/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
      },
      body: JSON.stringify({ slug, eventType: 'view', referrer: 'https://news.ycombinator.com' })
    });

    // Track Project Click
    await fetch(`${baseUrl}/public/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, eventType: 'project_click' })
    });

    // Fetch Authenticated Analytics
    const analyticsRes = await fetch(`${baseUrl}/public/portfolios/${portfolioId}/analytics`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const analyticsData = await analyticsRes.json();
    assert(analyticsRes.status === 200 && analyticsData.success, 'Failed to fetch analytics');
    const a = analyticsData.data.analytics;

    assert(a.totalViews >= 2, `Expected >= 2 views, got ${a.totalViews}`);
    assert(a.uniqueVisitors >= 1, `Expected >= 1 unique visitor, got ${a.uniqueVisitors}`);
    assert(a.projectClicks >= 1, `Expected >= 1 project click, got ${a.projectClicks}`);
    assert(a.devices.mobile >= 1, 'Mobile device count was 0');
    assert(a.devices.desktop >= 1, 'Desktop device count was 0');
    console.log('  -> PASS: Analytics tracked zero-cookie views, device breakdown, and interactions');

    console.log('\n======================================================');
    console.log('   ALL PHASE 6 PUBLISHING & ANALYTICS TESTS PASSED!   ');
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
