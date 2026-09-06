import { ensurePostgresRunning } from '../db-server.js';
import { app } from '../app.js';
import { prisma } from '../prisma.js';
import http from 'http';
import { AddressInfo } from 'net';

const PORT = 4101;
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
  console.log('   COVE PHASE 11: ADMIN, USER SETTINGS & FINAL QA SUITE   ');
  console.log('==========================================================\n');

  await startServer();

  try {
    const timestamp = Date.now().toString().slice(-4);
    const standardEmail = `eve_standard_${timestamp}@cove.test`;
    const adminEmail = `adam_admin_${timestamp}@cove.test`;
    const initialPassword = 'Password123!';
    const updatedPassword = 'NewStrongPassword456!';

    // 1. Register Standard User
    console.log('[1/7] Registering standard user Eve ...');
    const eveRes = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: standardEmail, password: initialPassword, name: 'Eve Standard' })
    });
    const eveData = await eveRes.json();
    assert(eveRes.status === 201 && eveData.success, 'Eve registration failed');
    const eveToken = eveData.data.token;
    const eveId = eveData.data.user.id;
    console.log(`  -> PASS: Eve registered (ID: ${eveId}, Role: ${eveData.data.user.role})`);

    // 2. Test Admin Barrier on Standard User
    console.log('[2/7] Verifying standard user blocked from /admin routes with 403 ...');
    const statsForbidden = await fetch(`${baseUrl}/admin/stats`, {
      headers: { Authorization: `Bearer ${eveToken}` }
    });
    assert(statsForbidden.status === 403, `Expected 403 Forbidden for Eve on /admin/stats, got ${statsForbidden.status}`);

    const usersForbidden = await fetch(`${baseUrl}/admin/users`, {
      headers: { Authorization: `Bearer ${eveToken}` }
    });
    assert(usersForbidden.status === 403, `Expected 403 Forbidden for Eve on /admin/users, got ${usersForbidden.status}`);
    console.log('  -> PASS: Standard user strictly denied administrative access (403 Forbidden)');

    // 3. Register Admin User and Query Admin Telemetry
    console.log('[3/7] Registering and promoting Admin Adam ...');
    const adamRes = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: adminEmail, password: initialPassword, name: 'Adam Admin' })
    });
    const adamData = await adamRes.json();
    const adamToken = adamData.data.token;
    const adamId = adamData.data.user.id;

    // Promote Adam to ADMIN in database
    await prisma.user.update({
      where: { id: adamId },
      data: { role: 'ADMIN' }
    });

    console.log('[4/7] Admin Adam accessing /admin/stats and /admin/users ...');
    const statsRes = await fetch(`${baseUrl}/admin/stats`, {
      headers: { Authorization: `Bearer ${adamToken}` }
    });
    const statsData = await statsRes.json();
    assert(statsRes.status === 200 && statsData.success, 'Failed to fetch admin stats');
    console.log(`  -> Total Users: ${statsData.data.metrics.totalUsers}`);
    console.log(`  -> Total Portfolios: ${statsData.data.metrics.totalPortfolios}`);
    console.log(`  -> Published: ${statsData.data.metrics.publishedPortfolios}`);
    console.log(`  -> Publication Rate: ${statsData.data.metrics.publishRate}%`);
    assert(statsData.data.metrics.totalUsers >= 2, 'Expected at least 2 users');

    const usersRes = await fetch(`${baseUrl}/admin/users`, {
      headers: { Authorization: `Bearer ${adamToken}` }
    });
    const usersData = await usersRes.json();
    assert(usersRes.status === 200 && usersData.success, 'Failed to fetch admin users');
    assert(usersData.data.users.length >= 2, 'Expected users list in admin registry');
    console.log('  -> PASS: Admin stats & user registry retrieved successfully');

    // 4. Admin Role Governance: Adam promotes Eve to ADMIN
    console.log('[5/7] Admin Adam promoting Eve via PATCH /admin/users/:id/role ...');
    const roleRes = await fetch(`${baseUrl}/admin/users/${eveId}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adamToken}`
      },
      body: JSON.stringify({ role: 'ADMIN' })
    });
    const roleData = await roleRes.json();
    assert(roleRes.status === 200 && roleData.data.user.role === 'ADMIN', 'Failed to promote user role');
    console.log('  -> PASS: Role governance updated Eve to ADMIN');

    // 5. User Settings: Password update & Login verification
    console.log('[6/7] Testing Password Update & Authentication lifecycle ...');
    const pwRes = await fetch(`${baseUrl}/user/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${eveToken}`
      },
      body: JSON.stringify({
        currentPassword: initialPassword,
        newPassword: updatedPassword
      })
    });
    const pwData = await pwRes.json();
    assert(pwRes.status === 200 && pwData.success, 'Password update failed');

    // Test login with old password fails
    const oldLogin = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: standardEmail, password: initialPassword })
    });
    assert(oldLogin.status === 401, 'Old password should be rejected');

    // Test login with new password succeeds
    const newLogin = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: standardEmail, password: updatedPassword })
    });
    const newLoginData = await newLogin.json();
    assert(newLogin.status === 200 && newLoginData.success, 'Login with updated password failed');
    const freshToken = newLoginData.data.token;
    console.log('  -> PASS: Password rotation verified with immediate session validation');

    // 6. GDPR Data Portability (Full JSON Archive Export)
    console.log('[7/7] Testing GDPR Data Portability (Export) & Account Purge ...');
    // Create a portfolio and project for Eve to export
    const portRes = await fetch(`${baseUrl}/portfolios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${freshToken}`
      },
      body: JSON.stringify({
        title: 'Eve Showcase Archive Test',
        slug: `eve-archive-${timestamp}`
      })
    });
    const portData = await portRes.json();
    const portfolioId = portData.data.portfolio.id;

    await fetch(`${baseUrl}/portfolios/${portfolioId}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${freshToken}`
      },
      body: JSON.stringify({
        title: 'Generative Archive Project',
        shortDescription: 'Verifying data export completeness.',
        tools: ['TypeScript', 'Prisma', 'PostgreSQL']
      })
    });

    const exportRes = await fetch(`${baseUrl}/user/export`, {
      headers: { Authorization: `Bearer ${freshToken}` }
    });
    const exportData = await exportRes.json();
    assert(exportRes.status === 200 && exportData.success, 'GDPR export failed');
    assert(exportData.data.meta.gdprCompliant === true, 'Missing GDPR meta flag');
    assert(exportData.data.user.portfolios.length >= 1, 'Portfolios missing from export');
    assert(exportData.data.user.portfolios[0].projects.length >= 1, 'Projects missing from export');
    assert(exportData.data.user.passwordHash === undefined, 'Security violation: passwordHash included in export');
    console.log('  -> PASS: GDPR complete JSON archive exported without credential leak');

    // 7. GDPR Permanent Account Deletion
    const deleteRes = await fetch(`${baseUrl}/user/account`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${freshToken}`
      },
      body: JSON.stringify({ confirmation: 'DELETE' })
    });
    const deleteData = await deleteRes.json();
    assert(deleteRes.status === 200 && deleteData.success, 'GDPR account purge failed');

    // Verify user is deleted from db
    const userInDb = await prisma.user.findUnique({ where: { id: eveId } });
    assert(userInDb === null, 'User still exists in database after deletion');

    // Verify orphaned portfolios are purged
    const portInDb = await prisma.portfolio.findUnique({ where: { id: portfolioId } });
    assert(portInDb === null, 'Portfolio still exists after cascading user deletion');

    // Verify login with deleted account fails
    const deletedLogin = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: standardEmail, password: updatedPassword })
    });
    assert(deletedLogin.status === 401, 'Deleted user should be rejected on login');
    console.log('  -> PASS: GDPR cascading account purge verified (Zero orphaned records)');

    console.log('\n==========================================================');
    console.log('   ALL PHASE 11 ADMIN, SETTINGS & FINAL QA TESTS PASSED!  ');
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
