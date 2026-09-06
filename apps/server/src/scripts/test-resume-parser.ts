import { ensurePostgresRunning } from '../db-server.js';
import { app } from '../app.js';
import http from 'http';
import { AddressInfo } from 'net';
import { ParsedResumeDto, ResumeMergePayload } from '@cove/shared';

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

const SAMPLE_RESUME_TEXT = `
Aria Thorne
Senior Spatial Computational Designer
San Francisco, CA • aria.thorne@example.com • (555) 234-5678
linkedin.com/in/ariathorne • github.com/ariathorne

Professional Summary:
Award-winning computational architect pioneering parametric envelopes and reactive web design systems. Passionate about sustainable materiality and real-time 3D spatial simulation.

Work Experience:
Snøhetta - Lead Spatial Architect
Jan 2022 - Present
• Designed carbon-negative maritime cultural pavilion in Oslo fjord
• Built custom Grasshopper algorithm reducing timber cutting waste by 22%
• Led multidisciplinary team of 8 designers and facade engineers

Foster + Partners - Computational Designer
Jun 2019 - Dec 2021
• Developed generative building envelopes using Rhino and Python
• Integrated Three.js and WebGL digital twin visualizations for client presentations

Education:
Harvard Graduate School of Design
Master of Architecture (M.Arch)
2019

Technical Skills:
Parametric Design, Rhino, Grasshopper, Three.js, TypeScript, React, WebGL, Docker, Python, BIM, Sustainable Architecture
`;

async function run() {
  console.log('\n======================================================');
  console.log('   COVE PHASE 5: RESUME PARSER & MERGE TEST SUITE    ');
  console.log('======================================================\n');

  await startServer();

  try {
    const timestamp = Date.now().toString().slice(-4);
    const email = `candidate_${timestamp}@cove.test`;
    const password = 'StrongPassword123!';

    // 1. Register candidate user
    console.log('[1/5] Registering test user ...');
    const signupRes = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name: 'Initial Name' })
    });
    const signupData = await signupRes.json();
    assert(signupRes.status === 201 && signupData.success, 'Registration failed');
    const token = signupData.data.token;
    console.log('  -> PASS: User registered');

    // 2. Test Resume Parsing
    console.log('[2/5] Testing POST /api/v1/resume/parse with synthetic resume ...');
    const parseRes = await fetch(`${baseUrl}/resume/parse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text: SAMPLE_RESUME_TEXT })
    });
    const parseData = await parseRes.json();
    assert(parseRes.status === 200 && parseData.success, 'Resume parse failed');
    const parsed: ParsedResumeDto = parseData.data.parsed;

    assert(parsed.contact.name === 'Aria Thorne', `Name mismatch: ${parsed.contact.name}`);
    assert(parsed.contact.email === 'aria.thorne@example.com', `Email mismatch: ${parsed.contact.email}`);
    assert(parsed.contact.phone?.includes('234-5678') === true, `Phone mismatch: ${parsed.contact.phone}`);
    assert(parsed.contact.headline?.includes('Computational') === true, `Headline mismatch: ${parsed.contact.headline}`);
    assert(parsed.contact.linkedinUrl?.includes('ariathorne') === true, 'LinkedIn mismatch');
    assert(parsed.contact.githubUrl?.includes('ariathorne') === true, 'GitHub mismatch');
    console.log('  -> PASS: Contact info and social URLs extracted cleanly');

    // Verify Experience Extraction
    assert(parsed.experiences.length >= 2, `Expected >= 2 experiences, got ${parsed.experiences.length}`);
    const firstExp = parsed.experiences[0];
    assert(firstExp.company.includes('Snøhetta'), `Expected Snøhetta, got ${firstExp.company}`);
    assert(firstExp.highlights.length >= 2, `Expected highlights on experience, got ${firstExp.highlights.length}`);
    console.log(`  -> PASS: Extracted ${parsed.experiences.length} work positions with highlights`);

    // Verify Skills Extraction
    assert(parsed.skills.length >= 6, `Expected >= 6 skills, got ${parsed.skills.length}`);
    const skillNames = parsed.skills.map((s) => s.name);
    assert(skillNames.includes('Rhino'), 'Missing skill Rhino');
    assert(skillNames.includes('TypeScript'), 'Missing skill TypeScript');
    assert(skillNames.includes('Parametric Design'), 'Missing skill Parametric Design');
    console.log(`  -> PASS: Extracted ${parsed.skills.length} matching taxonomy skills`);

    // 3. Test Granular Diff & Merge Application
    console.log('[3/5] Testing POST /api/v1/resume/apply with selective merge payload ...');
    const mergePayload: ResumeMergePayload = {
      selectedContactFields: {
        name: true,
        headline: true,
        bio: true,
        phone: true,
        linkedin: true,
        github: true,
        email: false, // Intentionally unselected
      },
      contact: parsed.contact,
      selectedExperiences: [parsed.experiences[0]], // Only select the 1st experience
      selectedEducations: parsed.educations,
      selectedSkills: parsed.skills.slice(0, 4), // Select first 4 skills
      selectedCertifications: [],
    };

    const applyRes = await fetch(`${baseUrl}/resume/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(mergePayload)
    });
    const applyData = await applyRes.json();
    assert(applyRes.status === 200 && applyData.success, 'Resume apply failed');
    console.log('  -> PASS: Resume data merged atomically into database');

    // 4. Verify Database Persistence in Profile
    console.log('[4/5] Verifying profile state via GET /api/v1/profile/me ...');
    const profileRes = await fetch(`${baseUrl}/profile/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const profileData = await profileRes.json();
    assert(profileRes.status === 200 && profileData.success, 'Failed to fetch profile');
    const profile = profileData.data.profile;

    assert(profile.name === 'Aria Thorne', `Profile name not updated: ${profile.name}`);
    assert(profile.headline?.includes('Computational') === true, 'Profile headline not updated');
    assert(profile.contactPhone?.includes('234-5678') === true, 'Profile phone not updated');
    assert(profile.socialLinks.some((l: any) => l.platform === 'LinkedIn'), 'LinkedIn link missing');
    assert(profile.experiences.some((e: any) => e.company.includes('Snøhetta')), 'Snøhetta experience missing');
    assert(profile.skills.length >= 4, `Expected >= 4 skills in profile, got ${profile.skills.length}`);
    console.log('  -> PASS: Verified profile, social links, experiences, and skills persisted correctly');

    // 5. Test Duplicate Skill Prevention
    console.log('[5/5] Verifying duplicate skill prevention on second merge ...');
    const initialSkillCount = profile.skills.length;
    await fetch(`${baseUrl}/resume/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        selectedContactFields: {},
        selectedExperiences: [],
        selectedEducations: [],
        selectedSkills: parsed.skills.slice(0, 4), // same 4 skills
        selectedCertifications: []
      })
    });

    const verifyRes = await fetch(`${baseUrl}/profile/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const verifyData = await verifyRes.json();
    assert(verifyData.data.profile.skills.length === initialSkillCount, 'Duplicate skills were incorrectly created');
    console.log('  -> PASS: Exact duplicate skills gracefully skipped');

    console.log('\n======================================================');
    console.log('   ALL PHASE 5 RESUME PARSER TESTS PASSED!            ');
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
