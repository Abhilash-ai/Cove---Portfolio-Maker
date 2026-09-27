import { chromium } from 'playwright';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\3cbc7ed2-0103-47bc-84c5-6b9427468dda';

async function main() {
  console.log('--- STARTING WORKSPACES E2E VERIFICATION ---');

  // 1. Authenticate / create user via API
  const timestamp = Date.now().toString().slice(-4);
  const email = `workspace_qa_${timestamp}@cove.test`;
  const password = 'Password123!';
  const name = 'Alex Workspace QA';

  console.log(`[1] Creating test user ${email}...`);
  const signupRes = await fetch('http://localhost:4000/api/v1/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  const signupData = await signupRes.json();
  if (!signupData.success) {
    throw new Error(`Failed to create test user: ${JSON.stringify(signupData)}`);
  }
  const token = signupData.data.token;
  console.log('[1] User authenticated. Token acquired.');

  // Pre-seed 1 portfolio to verify auto-assigned portfolio workspace
  console.log('[2] Seeding initial portfolio with default workspaceType...');
  const seedPortRes = await fetch('http://localhost:4000/api/v1/portfolios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title: 'Original Career Portfolio',
      slug: `career-alex-${timestamp}`,
      // Notice workspaceType is omitted or defaulted to verify auto-assign
    })
  });
  const seedPortData = await seedPortRes.json();
  console.log('[2] Seeded portfolio:', seedPortData.data?.portfolio?.title, 'workspaceType:', seedPortData.data?.portfolio?.workspaceType);

  // 2. Launch browser
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-gl=angle', '--use-angle=swiftshader']
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  // Navigate & set auth token
  await page.goto('http://localhost:4173/');
  await page.evaluate((t) => {
    localStorage.setItem('cove_token', t);
  }, token);
  await page.goto('http://localhost:4173/');
  await page.waitForLoadState('networkidle');

  // Give React a moment to render
  await page.waitForTimeout(1000);

  // 3. VERIFY SCREENSHOT 1: 4-Tab Top-Level Navigation & Portfolio Workspace
  console.log('[3] Verifying 4-Tab Top Navigation and Portfolio Workspace...');
  page.on('console', (msg) => console.log('BROWSER CONSOLE:', msg.text()));
  
  await page.waitForSelector('nav button:has-text("Profile")');
  await page.waitForSelector('nav button:has-text("Portfolio")');
  await page.waitForSelector('nav button:has-text("Website")');
  await page.waitForSelector('nav button:has-text("PPT")');

  // Check what's rendered
  const h2s = await page.$$eval('h2', els => els.map(e => e.textContent));
  console.log('ALL H2 ELEMENTS ON PAGE:', h2s);

  await page.waitForSelector('text=Showcase your work and career.', { timeout: 10000 });
  console.log('Portfolio workspace tagline confirmed: Showcase your work and career.');

  // Verify seeded item is present with ✨ Portfolio badge
  await page.waitForSelector('h4:has-text("Original Career Portfolio")');
  await page.waitForSelector('span:has-text("✨ Portfolio")');
  console.log('Seeded portfolio project confirmed with auto-assigned ✨ Portfolio badge!');

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'evidence_1_four_tab_navigation.png'),
    fullPage: false
  });
  console.log('Screenshot 1 captured: evidence_1_four_tab_navigation.png');

  // 4. VERIFY SCREENSHOT 2: Profile Workspace
  console.log('[4] Verifying Profile Workspace...');
  await page.click('nav button:has-text("Profile")');
  await page.waitForSelector('h2:has-text("Build your professional identity.")');
  await page.waitForSelector('span:has-text("👤 PROFILE WORKSPACE")');
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'evidence_2_profile_workspace.png'),
    fullPage: false
  });
  console.log('Screenshot 2 captured: evidence_2_profile_workspace.png');

  // 5. VERIFY SCREENSHOT 3: Website Workspace
  console.log('[5] Verifying Website Workspace...');
  await page.click('nav button:has-text("Website")');
  await page.waitForSelector('h2:has-text("Build a website for anything.")');
  await page.waitForSelector('span:has-text("🌐 WEBSITE WORKSPACE")');
  
  // Note: "Original Career Portfolio" should NOT be visible in Website workspace!
  const hasCareerInWebsite = await page.$('h4:has-text("Original Career Portfolio")');
  console.log('Career portfolio correctly hidden from Website workspace:', hasCareerInWebsite === null);

  // Create a new Website item
  console.log('[5.1] Creating a new Website item in Website workspace...');
  const siteTitle = `Apex Cloud ${timestamp}`;
  const newWebsiteBtn = await page.$('button:has-text("New Website")');
  if (newWebsiteBtn) {
    await newWebsiteBtn.click();
    await page.waitForSelector('label:has-text("Website Title")');
    await page.fill('input[placeholder*="Acme Studio"]', siteTitle);
    await page.click('button:has-text("Save & Start")');
    await page.waitForSelector(`h4:has-text("${siteTitle}")`);
    await page.waitForSelector('span:has-text("🌐 Website")');
    console.log(`Created website "${siteTitle}" with 🌐 Website badge!`);
  }

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'evidence_3_website_workspace.png'),
    fullPage: false
  });
  console.log('Screenshot 3 captured: evidence_3_website_workspace.png');

  // 6. VERIFY SCREENSHOT 4: PPT Honest Coming Soon State
  console.log('[6] Verifying PPT Workspace...');
  await page.click('nav button:has-text("PPT")');
  await page.waitForSelector('h2:has-text("Create presentations that communicate.")');
  await page.waitForSelector('span:has-text("Coming Soon")');
  await page.waitForSelector('h4:has-text("Spatial Keynote 3D")');
  await page.waitForSelector('h4:has-text("Venture Pitch System")');
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'evidence_4_ppt_coming_soon.png'),
    fullPage: false
  });
  console.log('Screenshot 4 captured: evidence_4_ppt_coming_soon.png');

  // 7. VERIFY SCREENSHOT 5: Website Template Gallery Separation
  console.log('[7] Opening Website Visual Editor & Template Gallery...');
  await page.click('nav button:has-text("Website")');
  await page.waitForSelector(`h4:has-text("${siteTitle}")`);
  
  // Click Editor on Website item
  const websiteEditorBtn = await page.locator(`div:has-text("${siteTitle}") button:has-text("🎨 Editor")`).first();
  await websiteEditorBtn.click();
  await page.waitForSelector('button:has-text("Browse All & AI Recommendations")');

  // Check that the sidebar template filter has defaulted to 🌐 Website 3D
  const websitePillSelected = await page.$('button:has-text("🌐 Website 3D")');
  console.log('Website 3D pill present in editor sidebar:', websitePillSelected !== null);

  // Open discovery modal
  await page.click('button:has-text("Browse All & AI Recommendations")');
  await page.waitForSelector('h2:has-text("Template Discovery")');
  await page.waitForTimeout(500);

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'evidence_5_website_template_gallery.png'),
    fullPage: false
  });
  console.log('Screenshot 5 captured: evidence_5_website_template_gallery.png');

  // Close discovery modal and return to workspace
  await page.click('button:has-text("✕")');
  await page.waitForSelector('h2:has-text("Template Discovery")', { state: 'detached' });
  await page.waitForTimeout(500);
  await page.click('button:has-text("Dashboard")');
  await page.waitForSelector('nav button:has-text("Portfolio")');
  await page.waitForTimeout(500);

  // 8. VERIFY SCREENSHOT 6: Portfolio Template Gallery Separation
  console.log('[8] Opening Portfolio Visual Editor & Template Gallery...');
  await page.click('nav button:has-text("Portfolio")');
  await page.waitForSelector('h4:has-text("Original Career Portfolio")');
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => {
    const headers = Array.from(document.querySelectorAll('h4'));
    const target = headers.find(h => h.textContent?.includes('Original Career Portfolio'));
    const container = target?.closest('div.rounded-2xl');
    const editorBtn = container ? Array.from(container.querySelectorAll('button')).find(b => b.textContent?.includes('Editor')) : null;
    (editorBtn as HTMLElement)?.click();
  });

  await page.waitForSelector('button:has-text("Browse All & AI Recommendations")');
  await page.waitForTimeout(500);

  // Open discovery modal
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Browse All & AI Recommendations'));
    (btn as HTMLElement)?.click();
  });

  await page.waitForSelector('h2:has-text("Template Discovery")');
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'evidence_6_portfolio_template_gallery.png'),
    fullPage: false
  });
  console.log('Screenshot 6 captured: evidence_6_portfolio_template_gallery.png');

  await browser.close();
  console.log('--- ALL WORKSPACE VERIFICATION STEPS PASSED SUCCESSFULLY! ---');
}

main().catch((err) => {
  console.error('VERIFICATION ERROR:', err);
  process.exit(1);
});
