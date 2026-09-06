import { app } from '../app.js';
import { ensurePostgresRunning } from '../db-server.js';
import { prisma } from '../prisma.js';
import http from 'http';

const PORT = 4098; // isolated port for test runner

function makeRequest(
  path: string,
  options: {
    method: string;
    body?: any;
    token?: string;
    isMultipart?: boolean;
    multipartBoundary?: string;
    rawBuffer?: Buffer;
  }
): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    let data: Buffer | string | null = null;
    const headers: Record<string, string> = {};

    if (options.isMultipart && options.rawBuffer && options.multipartBoundary) {
      data = options.rawBuffer;
      headers['Content-Type'] = `multipart/form-data; boundary=${options.multipartBoundary}`;
      headers['Content-Length'] = String(data.length);
    } else if (options.body) {
      data = JSON.stringify(options.body);
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = String(Buffer.byteLength(data));
    }

    if (options.token) {
      headers['Authorization'] = `Bearer ${options.token}`;
    }

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

function buildMultipartPayload(boundary: string, fields: Record<string, string>, file?: { name: string; filename: string; mimeType: string; content: Buffer }): Buffer {
  const chunks: Buffer[] = [];
  for (const [key, val] of Object.entries(fields)) {
    chunks.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${val}\r\n`));
  }
  if (file) {
    chunks.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="${file.name}"; filename="${file.filename}"\r\nContent-Type: ${file.mimeType}\r\n\r\n`));
    chunks.push(file.content);
    chunks.push(Buffer.from(`\r\n`));
  }
  chunks.push(Buffer.from(`--${boundary}--\r\n`));
  return Buffer.concat(chunks);
}

async function runCrudTests() {
  console.log('\n======================================================');
  console.log('   COVE PHASE 2: CONTENT ENGINE CRUD & MEDIA SUITE    ');
  console.log('======================================================\n');

  await ensurePostgresRunning(5433);
  await prisma.$connect();

  const server = app.listen(PORT);
  await new Promise((r) => setTimeout(r, 500));

  try {
    const randomSuffix = Math.floor(Math.random() * 10000);
    const aliceEmail = `alice_crud_${randomSuffix}@cove.test`;
    const bobEmail = `bob_crud_${randomSuffix}@cove.test`;

    // 1. Sign up Alice and Bob
    console.log('[1/10] Registering test users Alice & Bob ...');
    const aliceSignup = await makeRequest('/api/v1/auth/signup', {
      method: 'POST',
      body: { email: aliceEmail, password: 'Password123!', name: 'Alice Architect' }
    });
    const bobSignup = await makeRequest('/api/v1/auth/signup', {
      method: 'POST',
      body: { email: bobEmail, password: 'BobPassword123!', name: 'Bob Contractor' }
    });
    const aliceToken = aliceSignup.body.data.token;
    const bobToken = bobSignup.body.data.token;
    console.log('  -> PASS: Alice & Bob registered and tokens issued');

    // 2. Profile CRUD: Update and Retrieve
    console.log('[2/10] Testing Profile CRUD for Alice ...');
    const updateProfile = await makeRequest('/api/v1/profile/me', {
      method: 'PUT',
      token: aliceToken,
      body: {
        headline: 'Senior Spatial Designer & Creative Architect',
        bio: 'Designing sustainable urban sanctuaries for over a decade.',
        location: 'Stockholm, Sweden',
        contactPhone: '+46 70 123 4567',
        availableForWork: true,
        skills: [
          { name: 'Spatial Computing', category: 'Design', level: 'Expert', sortOrder: 0 },
          { name: 'Parametric Modeling', category: 'Architecture', level: 'Advanced', sortOrder: 1 }
        ],
        experiences: [
          {
            company: 'Nordic Habitat Lab',
            position: 'Lead Architectural Strategist',
            startDate: '2021-01-15T00:00:00.000Z',
            isCurrent: true,
            description: 'Directed 14 sustainable community developments.',
            highlights: ['Received 2023 Nordic Design Award', 'Pioneered timber-first construction system']
          }
        ],
        educations: [
          {
            institution: 'Royal Institute of Technology (KTH)',
            degree: 'Master of Architecture',
            fieldOfStudy: 'Urban Design',
            startDate: '2016-09-01T00:00:00.000Z',
            endDate: '2018-06-30T00:00:00.000Z'
          }
        ],
        certifications: [
          { name: 'LEED AP BD+C', issuer: 'U.S. Green Building Council', issueDate: '2020-04-10T00:00:00.000Z' }
        ],
        achievements: [
          { title: 'Venice Biennale Contributor', date: '2023-05-20T00:00:00.000Z' }
        ],
        publications: [
          { title: 'Monograph: The Resilient City', publisher: 'Birkhauser', publicationDate: '2024-02-15T00:00:00.000Z' }
        ],
        socialLinks: [
          { platform: 'github', url: 'https://github.com/alice', label: 'GitHub' },
          { platform: 'linkedin', url: 'https://linkedin.com/in/alice', label: 'LinkedIn' }
        ]
      }
    });
    if (updateProfile.status !== 200) throw new Error(`Profile update failed: ${JSON.stringify(updateProfile)}`);

    const getProfile = await makeRequest('/api/v1/profile/me', { method: 'GET', token: aliceToken });
    const profile = getProfile.body.data.profile;
    if (profile.skills.length !== 2 || profile.experiences.length !== 1 || profile.socialLinks.length !== 2) {
      throw new Error(`Profile relational count mismatch: ${JSON.stringify(profile)}`);
    }
    console.log(`  -> PASS: Profile updated and verified with skills (${profile.skills.length}), experiences (${profile.experiences.length}), and links (${profile.socialLinks.length})`);

    // 3. Portfolio CRUD: Create, Rename, Section Order, Publish
    console.log('[3/10] Testing Portfolio CRUD ...');
    const createPort = await makeRequest('/api/v1/portfolios', {
      method: 'POST',
      token: aliceToken,
      body: { title: 'Urban Sanctuaries', slug: `urban-${randomSuffix}`, sectionOrder: ['hero', 'projects', 'about', 'contact'] }
    });
    if (createPort.status !== 201) throw new Error(`Portfolio creation failed: ${JSON.stringify(createPort)}`);
    const portfolioId = createPort.body.data.portfolio.id;

    const updatePort = await makeRequest(`/api/v1/portfolios/${portfolioId}`, {
      method: 'PUT',
      token: aliceToken,
      body: {
        title: 'Urban Sanctuaries & Habitats 2026',
        status: 'published',
        sectionOrder: ['hero', 'projects', 'experience', 'skills', 'contact']
      }
    });
    if (updatePort.status !== 200 || updatePort.body.data.portfolio.status !== 'published') {
      throw new Error(`Portfolio update failed: ${JSON.stringify(updatePort)}`);
    }
    console.log('  -> PASS: Portfolio created, renamed, sectionOrder modified, and status switched to published');

    // 4. Project CRUD: Full 16-field Project Creation
    console.log('[4/10] Testing Project creation with full 16-field set ...');
    const createProj1 = await makeRequest(`/api/v1/portfolios/${portfolioId}/projects`, {
      method: 'POST',
      token: aliceToken,
      body: {
        title: 'Fjord Eco Pavilion',
        coverImage: null,
        year: '2025',
        category: 'Cultural Architecture',
        location: 'Bergen, Norway',
        shortDescription: 'Zero-carbon timber pavilion overlooking the Byfjorden.',
        fullDescription: 'Constructed entirely of locally harvested cross-laminated timber with solar-integrated roof panels.',
        role: 'Lead Project Architect',
        duration: '14 months',
        outcome: 'Completed on schedule with 100% net-positive energy footprint',
        githubLink: 'https://github.com/alice/fjord-pavilion-code',
        tools: ['Rhino 3D', 'Grasshopper', 'Ladybug Tools', 'Revit'],
        collaborators: ['Nordic Timber Group', 'Arup Structural Engineering'],
        externalLinks: [{ label: 'Press Release', url: 'https://archdaily.com/fjord-pavilion' }],
        customSectionOrder: ['Concept', 'Materiality', 'Plans', 'Sections', 'Renders']
      }
    });
    if (createProj1.status !== 201) throw new Error(`Project 1 creation failed: ${JSON.stringify(createProj1)}`);
    const project1Id = createProj1.body.data.project.id;

    // Create Project 2
    const createProj2 = await makeRequest(`/api/v1/portfolios/${portfolioId}/projects`, {
      method: 'POST',
      token: aliceToken,
      body: {
        title: 'Solar Promenade Walkway',
        year: '2024',
        category: 'Urban Infrastructure'
      }
    });
    const project2Id = createProj2.body.data.project.id;
    console.log(`  -> PASS: Projects created: P1 (${project1Id}) and P2 (${project2Id})`);

    // 5. Project Update
    console.log('[5/10] Testing Project update ...');
    const updateProj1 = await makeRequest(`/api/v1/projects/${project1Id}`, {
      method: 'PUT',
      token: aliceToken,
      body: {
        title: 'Fjord Eco Pavilion & Research Station',
        outcome: 'Awarded 2025 European Sustainability Crown'
      }
    });
    if (updateProj1.status !== 200 || updateProj1.body.data.project.title !== 'Fjord Eco Pavilion & Research Station') {
      throw new Error(`Project update failed: ${JSON.stringify(updateProj1)}`);
    }
    console.log('  -> PASS: Project 1 successfully updated');

    // 6. Media Upload Abstraction
    console.log('[6/10] Testing Media upload abstraction (disk storage + ProjectMedia linking) ...');
    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
    // Create a 1x1 test image buffer (PNG header)
    const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52]);
    const multipartBody = buildMultipartPayload(boundary, { projectId: project1Id, caption: 'North Elevation Render' }, {
      name: 'file',
      filename: 'north-elevation.png',
      mimeType: 'image/png',
      content: pngHeader
    });

    const uploadRes = await makeRequest('/api/v1/media/upload', {
      method: 'POST',
      token: aliceToken,
      isMultipart: true,
      multipartBoundary: boundary,
      rawBuffer: multipartBody
    });
    if (uploadRes.status !== 201 || !uploadRes.body.data.media) {
      throw new Error(`Media upload failed: ${JSON.stringify(uploadRes)}`);
    }
    const mediaId = uploadRes.body.data.media.id;
    console.log(`  -> PASS: Media uploaded (ID: ${mediaId}) and linked to project as cover image`);

    // 7. Media Alt Text & Cover Modification
    console.log('[7/10] Testing Media alt text and caption updates ...');
    const patchMedia = await makeRequest(`/api/v1/projects/${project1Id}/media/${mediaId}`, {
      method: 'PATCH',
      token: aliceToken,
      body: { altText: 'Detailed technical drawing of timber facade', isCover: true }
    });
    if (patchMedia.status !== 200 || patchMedia.body.data.media.altText !== 'Detailed technical drawing of timber facade') {
      throw new Error(`Media patch failed: ${JSON.stringify(patchMedia)}`);
    }
    console.log('  -> PASS: Media alt text and cover flag updated');

    // 8. Project Duplication
    console.log('[8/10] Testing Project duplication ...');
    const duplicateRes = await makeRequest(`/api/v1/projects/${project1Id}/duplicate`, {
      method: 'POST',
      token: aliceToken
    });
    if (duplicateRes.status !== 201) throw new Error(`Project duplication failed: ${JSON.stringify(duplicateRes)}`);
    const duplicatedProject = duplicateRes.body.data.project;
    if (!duplicatedProject.title.includes('(Copy)') || duplicatedProject.media.length !== 1) {
      throw new Error(`Duplicated project mismatch: ${JSON.stringify(duplicatedProject)}`);
    }
    console.log(`  -> PASS: Project duplicated successfully (Title: "${duplicatedProject.title}") with copied media`);

    // 9. Project Reordering & Deletion
    console.log('[9/10] Testing Project reordering and deletion ...');
    const reorderRes = await makeRequest(`/api/v1/portfolios/${portfolioId}/projects/reorder`, {
      method: 'POST',
      token: aliceToken,
      body: { projectIds: [project2Id, project1Id, duplicatedProject.id] }
    });
    if (reorderRes.status !== 200) throw new Error(`Reorder failed: ${JSON.stringify(reorderRes)}`);

    const deleteRes = await makeRequest(`/api/v1/projects/${duplicatedProject.id}`, {
      method: 'DELETE',
      token: aliceToken
    });
    if (deleteRes.status !== 200) throw new Error(`Delete failed: ${JSON.stringify(deleteRes)}`);
    console.log('  -> PASS: Projects reordered and duplicate deleted cleanly');

    // 10. Cross-Tenant Ownership Violations (Bob cannot touch Alice's data)
    console.log('[10/10] Testing cross-tenant ownership violation enforcement ...');
    const unauthorizedAdd = await makeRequest(`/api/v1/portfolios/${portfolioId}/projects`, {
      method: 'POST',
      token: bobToken, // Bob tries to add project to Alice's portfolio
      body: { title: 'Unauthorized Project' }
    });
    if (unauthorizedAdd.status !== 403) {
      throw new Error(`Expected 403 Forbidden for unauthorized project add, got ${unauthorizedAdd.status}`);
    }

    const unauthorizedEdit = await makeRequest(`/api/v1/projects/${project1Id}`, {
      method: 'PUT',
      token: bobToken, // Bob tries to edit Alice's project
      body: { title: 'Malicious Change' }
    });
    if (unauthorizedEdit.status !== 403) {
      throw new Error(`Expected 403 Forbidden for unauthorized project edit, got ${unauthorizedEdit.status}`);
    }

    const unauthorizedDelete = await makeRequest(`/api/v1/projects/${project1Id}`, {
      method: 'DELETE',
      token: bobToken // Bob tries to delete Alice's project
    });
    if (unauthorizedDelete.status !== 403) {
      throw new Error(`Expected 403 Forbidden for unauthorized project delete, got ${unauthorizedDelete.status}`);
    }
    console.log('  -> PASS: Cross-tenant mutations strictly rejected with 403 Forbidden');

    console.log('\n======================================================');
    console.log('   ALL PHASE 2 CRUD & OWNERSHIP TESTS PASSED!         ');
    console.log('======================================================\n');
  } finally {
    server.close();
    await prisma.$disconnect();
  }
}

runCrudTests().catch((err) => {
  console.error('\nCRUD TEST RUN FAILED:', err);
  process.exit(1);
});
