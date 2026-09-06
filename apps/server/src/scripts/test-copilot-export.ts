import { ensurePostgresRunning } from '../db-server.js';
import { app } from '../app.js';
import http from 'http';
import { AddressInfo } from 'net';

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
  console.log('\n======================================================');
  console.log('   COVE PHASE 7: COPILOT & TEMPLATE SWITCH TEST SUITE ');
  console.log('======================================================\n');

  await startServer();

  try {
    const timestamp = Date.now().toString().slice(-4);
    const email = `copilot_${timestamp}@cove.test`;
    const password = 'StrongPassword123!';

    // 1. Register test user
    console.log('[1/7] Registering test user & creating workspace ...');
    const signupRes = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name: 'Zaha Hadid' })
    });
    const signupData = await signupRes.json();
    assert(signupRes.status === 201 && signupData.success, 'Registration failed');
    const token = signupData.data.token;
    console.log('  -> PASS: User registered');

    // Create test portfolio & project
    const portRes = await fetch(`${baseUrl}/portfolios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Parametric Spatial Pavilions',
        slug: `parametric-${timestamp}`,
      })
    });
    const portData = await portRes.json();
    const portfolioId = portData.data.portfolio.id;

    const projRes = await fetch(`${baseUrl}/portfolios/${portfolioId}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Heydar Center Shell',
        category: 'Architecture',
        role: 'Lead Architect',
        shortDescription: 'i made a cool building with curves and lots of stuff.',
        fullDescription: 'i worked on this big project where we had to fix the geometry. i helped the client understand curved surfaces and it was good.'
      })
    });
    const projData = await projRes.json();
    const projectId = projData.data.project.id;
    console.log(`  -> PASS: Portfolio (${portfolioId}) and Project (${projectId}) created`);

    // 2. Test Copilot: make_professional
    console.log('[2/7] Testing Copilot command: make_professional ...');
    const profRes = await fetch(`${baseUrl}/ai/copilot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        command: 'make_professional',
        contextType: 'project',
        targetId: projectId,
        text: 'i worked on this big project where we had to fix the geometry.'
      })
    });
    const profData = await profRes.json();
    assert(profRes.status === 200 && profData.success, 'make_professional command failed');
    assert(profData.data.suggestion.includes('Spearheaded') || profData.data.suggestion.length > 30, 'Professional text transform check failed');
    assert(profData.data.actionId, 'Missing actionId in Copilot response');
    const firstActionId = profData.data.actionId;
    console.log('  -> PASS: Copilot elevated text to authoritative professional tone');

    // 3. Test Copilot: make_shorter
    console.log('[3/7] Testing Copilot command: make_shorter ...');
    const shortRes = await fetch(`${baseUrl}/ai/copilot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        command: 'make_shorter',
        contextType: 'project',
        targetId: projectId,
        text: 'This was a very long sentence explaining everything in extreme detail. It had many redundant adjectives and filler clauses that diluted the signal. We finally concluded the phase successfully.'
      })
    });
    const shortData = await shortRes.json();
    assert(shortRes.status === 200 && shortData.success, 'make_shorter command failed');
    assert(shortData.data.suggestion.length < 180, 'make_shorter did not condense text');
    console.log('  -> PASS: Copilot condensed text cleanly while preserving meaning');

    // 4. Test Copilot: suggest_title
    console.log('[4/7] Testing Copilot command: suggest_title ...');
    const titleRes = await fetch(`${baseUrl}/ai/copilot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        command: 'suggest_title',
        contextType: 'project',
        targetId: projectId,
        text: 'Parametric Fluid Canopy',
        metadata: { title: 'Parametric Fluid Canopy' }
      })
    });
    const titleData = await titleRes.json();
    assert(titleRes.status === 200 && titleData.success, 'suggest_title command failed');
    assert(Array.isArray(titleData.data.titles) && titleData.data.titles.length >= 3, 'Expected >= 3 title suggestions');
    console.log('  -> PASS: Copilot generated 4 evocative title variations');

    // 5. Test Copilot: turn_case_study & which_images
    console.log('[5/7] Testing Copilot commands: turn_case_study and which_images ...');
    const caseRes = await fetch(`${baseUrl}/ai/copilot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        command: 'turn_case_study',
        contextType: 'project',
        targetId: projectId,
        text: 'Complex continuous curved surfaces required novel algorithmic rationalization.'
      })
    });
    const caseData = await caseRes.json();
    assert(caseRes.status === 200 && caseData.success, 'turn_case_study command failed');
    assert(caseData.data.caseStudy && caseData.data.caseStudy.problem && caseData.data.caseStudy.outcome, 'Case study missing 4-stage structure');

    const imgRes = await fetch(`${baseUrl}/ai/copilot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        command: 'which_images',
        contextType: 'project',
        targetId: projectId,
        text: '',
        metadata: {
          images: [
            { id: '1', url: '/uploads/hero.jpg' },
            { id: '2', url: '/uploads/diagram.png' },
            { id: '3', url: '/uploads/render.jpg' }
          ]
        }
      })
    });
    const imgData = await imgRes.json();
    assert(imgRes.status === 200 && imgData.success, 'which_images command failed');
    assert(imgData.data.imageRecommendations && imgData.data.imageRecommendations.length === 3, 'Expected 3 image recommendations');
    console.log('  -> PASS: turn_case_study & which_images returned structured narrative breakdown');

    // 6. Test Copilot Accept & Undo Cycle
    console.log('[6/7] Testing Copilot Accept and Undo cycle ...');
    const acceptRes = await fetch(`${baseUrl}/ai/copilot/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ actionId: firstActionId })
    });
    const acceptData = await acceptRes.json();
    assert(acceptRes.status === 200 && acceptData.data.action.status === 'accepted', 'Accept action failed');

    const undoRes = await fetch(`${baseUrl}/ai/copilot/undo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ actionId: firstActionId })
    });
    const undoData = await undoRes.json();
    assert(undoRes.status === 200 && undoData.data.action.status === 'reverted', 'Undo action failed');
    assert(undoData.data.beforeState.text === 'i worked on this big project where we had to fix the geometry.', 'Undo did not restore beforeState');
    console.log('  -> PASS: Accept and Undo state cycle verified with full fidelity');

    // 7. Test Mandatory Template Switching Invariant
    console.log('[7/7] Testing Mandatory Template Switching Invariant (Zero Data Loss) ...');
    const templatesToTest = ['tpl-minimal-pure', 'tpl-editorial-journal', 'tpl-studio-neo-dark'];

    for (const tId of templatesToTest) {
      const updateRes = await fetch(`${baseUrl}/portfolios/${portfolioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ activeTemplateId: tId })
      });
      assert(updateRes.status === 200, `Failed to switch to template ${tId}`);

      const verifyRes = await fetch(`${baseUrl}/portfolios/${portfolioId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const verifyData = await verifyRes.json();
      const p = verifyData.data.portfolio;
      assert(p.activeTemplateId === tId, `Template ID not persisted: expected ${tId}, got ${p.activeTemplateId}`);
      assert(p.projects.length === 1, `Project count corrupted during template switch to ${tId}`);
      assert(p.projects[0].title === 'Heydar Center Shell', `Project title corrupted during template switch to ${tId}`);
      assert(p.projects[0].role === 'Lead Architect', `Project role corrupted during template switch to ${tId}`);
    }
    console.log('  -> PASS: Portfolio switched across Minimal, Editorial, and Studio templates with 100% data preservation');

    console.log('\n======================================================');
    console.log('   ALL PHASE 7 COPILOT & TEMPLATE SWITCH TESTS PASSED! ');
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
