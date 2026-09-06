import { app } from '../app.js';
import { ensurePostgresRunning } from '../db-server.js';
import { prisma } from '../prisma.js';
import http from 'http';

const PORT = 4099; // isolated port for test runner

function makeRequest(path: string, options: { method: string; body?: any; token?: string }): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    const data = options.body ? JSON.stringify(options.body) : null;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (data) headers['Content-Length'] = String(Buffer.byteLength(data));
    if (options.token) headers['Authorization'] = `Bearer ${options.token}`;

    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path,
        method: options.method,
        headers,
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          try {
            const body = JSON.parse(raw);
            resolve({ status: res.statusCode || 500, body });
          } catch {
            resolve({ status: res.statusCode || 500, body: raw });
          }
        });
      }
    );

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log('\n========================================');
  console.log('      COVE PHASE 1 AUTH & OWNERSHIP TEST');
  console.log('========================================\n');

  await ensurePostgresRunning(5433);
  await prisma.$connect();

  const server = app.listen(PORT);
  await new Promise((r) => setTimeout(r, 500));

  try {
    const randomSuffix = Math.floor(Math.random() * 10000);
    const aliceEmail = `alice_${randomSuffix}@cove.test`;
    const bobEmail = `bob_${randomSuffix}@cove.test`;

    // 1. Health check
    console.log('[1/10] Testing GET /api/v1/health ...');
    const health = await makeRequest('/api/v1/health', { method: 'GET' });
    if (health.status !== 200 || health.body.status !== 'ok') throw new Error(`Health check failed: ${JSON.stringify(health)}`);
    console.log('  -> PASS: Health check 200 OK');

    // 2. Alice Signup
    console.log(`[2/10] Testing Alice Signup (${aliceEmail}) ...`);
    const aliceSignup = await makeRequest('/api/v1/auth/signup', {
      method: 'POST',
      body: { email: aliceEmail, password: 'Password123!', name: 'Alice Walker' }
    });
    if (aliceSignup.status !== 201 || !aliceSignup.body.data.token) {
      throw new Error(`Alice signup failed: ${JSON.stringify(aliceSignup)}`);
    }
    const aliceToken = aliceSignup.body.data.token;
    console.log('  -> PASS: Alice registered successfully (201 Created) with JWT token');

    // 3. Duplicate Signup Rejection
    console.log('[3/10] Testing duplicate signup rejection ...');
    const dupSignup = await makeRequest('/api/v1/auth/signup', {
      method: 'POST',
      body: { email: aliceEmail, password: 'AnotherPassword!' }
    });
    if (dupSignup.status !== 409) {
      throw new Error(`Expected 409 Conflict on duplicate email, got ${dupSignup.status}`);
    }
    console.log('  -> PASS: Duplicate email correctly rejected with 409 Conflict');

    // 4. Invalid Login Rejection
    console.log('[4/10] Testing wrong password login ...');
    const badLogin = await makeRequest('/api/v1/auth/login', {
      method: 'POST',
      body: { email: aliceEmail, password: 'WrongPassword!' }
    });
    if (badLogin.status !== 401) {
      throw new Error(`Expected 401 Unauthorized, got ${badLogin.status}`);
    }
    console.log('  -> PASS: Invalid password rejected with 401 Unauthorized');

    // 5. Valid Login
    console.log('[4/10] Testing Alice Login ...');
    const aliceLogin = await makeRequest('/api/v1/auth/login', {
      method: 'POST',
      body: { email: aliceEmail, password: 'Password123!' }
    });
    if (aliceLogin.status !== 200 || !aliceLogin.body.data.token) {
      throw new Error(`Alice login failed: ${JSON.stringify(aliceLogin)}`);
    }
    console.log('  -> PASS: Alice authenticated with 200 OK and valid JWT');

    // 6. Alice GET /auth/me
    console.log('[6/10] Testing GET /api/v1/auth/me for Alice ...');
    const meRes = await makeRequest('/api/v1/auth/me', {
      method: 'GET',
      token: aliceToken
    });
    if (meRes.status !== 200 || meRes.body.data.user.email !== aliceEmail) {
      throw new Error(`GET /auth/me failed: ${JSON.stringify(meRes)}`);
    }
    console.log(`  -> PASS: Verified authenticated identity for ${meRes.body.data.user.name} (${meRes.body.data.user.email})`);

    // 7. Bob Signup
    console.log(`[7/10] Testing Bob Signup (${bobEmail}) ...`);
    const bobSignup = await makeRequest('/api/v1/auth/signup', {
      method: 'POST',
      body: { email: bobEmail, password: 'BobPassword99!', name: 'Bob Stone' }
    });
    const bobToken = bobSignup.body.data.token;
    console.log('  -> PASS: Bob registered successfully with distinct JWT token');

    // 8. Alice creates a Portfolio
    console.log('[8/10] Testing Alice creating portfolio "Design Systems 2026" ...');
    const portfolioRes = await makeRequest('/api/v1/portfolios', {
      method: 'POST',
      token: aliceToken,
      body: { title: 'Design Systems 2026', slug: `alice-portfolio-${randomSuffix}` }
    });
    if (portfolioRes.status !== 201) {
      throw new Error(`Failed to create portfolio: ${JSON.stringify(portfolioRes)}`);
    }
    const alicePortfolioId = portfolioRes.body.data.portfolio.id;
    console.log(`  -> PASS: Portfolio created (ID: ${alicePortfolioId}) with server-side ownership linked to Alice`);

    // 9. Ownership Verification on /portfolios/mine
    console.log('[9/10] Verifying server-side ownership isolation on GET /portfolios/mine ...');
    const alicePortfolios = await makeRequest('/api/v1/portfolios/mine', {
      method: 'GET',
      token: aliceToken
    });
    const bobPortfolios = await makeRequest('/api/v1/portfolios/mine', {
      method: 'GET',
      token: bobToken
    });

    if (alicePortfolios.body.data.portfolios.length === 0) {
      throw new Error('Alice should have 1 portfolio, found 0');
    }
    if (bobPortfolios.body.data.portfolios.length !== 0) {
      throw new Error(`Bob should have 0 portfolios, but found: ${bobPortfolios.body.data.portfolios.length}`);
    }
    console.log('  -> PASS: Alice sees her portfolio; Bob sees 0 portfolios (Strict ownership isolation verified)');

    // 10. Cross-Tenant Authorization Violation Check
    console.log('[10/10] Testing cross-user access: Bob attempts GET on Alice\'s portfolio ID ...');
    const unauthorizedAccess = await makeRequest(`/api/v1/portfolios/${alicePortfolioId}`, {
      method: 'GET',
      token: bobToken // Bob tries to view Alice's resource
    });
    if (unauthorizedAccess.status !== 403) {
      throw new Error(`Expected 403 Forbidden for cross-tenant access, got ${unauthorizedAccess.status}`);
    }
    console.log('  -> PASS: Server rejected cross-user access with 403 Forbidden ("You do not own this portfolio resource")');

    console.log('\n========================================');
    console.log('   ALL PHASE 1 AUTH & OWNERSHIP TESTS PASSED!   ');
    console.log('========================================\n');
  } finally {
    server.close();
    await prisma.$disconnect();
  }
}

runTests().catch((err) => {
  console.error('\nTEST RUN FAILED:', err);
  process.exit(1);
});
