import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  ImageRun,
  Header,
  Footer,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  WidthType,
  ShadingType,
  VerticalAlign,
  PageNumber,
  PageBreak,
  LevelFormat,
  TableOfContents,
  ExternalHyperlink,
} from 'docx';
import fs from 'fs';
import path from 'path';

const BASE = 'C:/Users/Shadow/Desktop/websitre/prodready-labs';
const SCREENSHOTS = path.join(BASE, 'test-results');
const OUT = path.join(BASE, 'QA_Playwright_Report.docx');

// ── Helpers ────────────────────────────────────────────────────────────────

function loadImage(filename) {
  const p = path.join(SCREENSHOTS, filename);
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p);
}

function img(filename, widthPt, heightPt, caption) {
  const data = loadImage(filename);
  if (!data) return new Paragraph({ children: [new TextRun({ text: `[Screenshot not found: ${filename}]`, italics: true, color: 'CC0000' })] });
  const W = Math.round((widthPt / 72) * 914400);
  const H = Math.round((heightPt / 72) * 914400);
  const items = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 60 },
      children: [
        new ImageRun({
          type: 'png',
          data,
          transformation: { width: widthPt, height: heightPt },
          altText: { title: caption, description: caption, name: caption },
        }),
      ],
    }),
  ];
  if (caption) {
    items.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 200 },
        children: [new TextRun({ text: caption, italics: true, size: 18, color: '555555' })],
      })
    );
  }
  return items;
}

function h1(text, bookmarkId) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    pageBreakBefore: true,
    spacing: { before: 240, after: 200 },
    children: [new TextRun({ text, bold: true, size: 36, font: 'Arial' })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 120 },
    children: [new TextRun({ text, bold: true, size: 28, font: 'Arial' })],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 160, after: 80 },
    children: [new TextRun({ text, bold: true, size: 24, font: 'Arial' })],
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 120 },
    children: [new TextRun({ text, size: 22, font: 'Arial', ...opts })],
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, size: 22, font: 'Arial' })],
  });
}

function hr() {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CCCCCC', space: 1 } },
    children: [],
  });
}

function spacer() {
  return new Paragraph({ spacing: { before: 80, after: 80 }, children: [] });
}

// ── Pass/Fail Table ────────────────────────────────────────────────────────

const borderDef = { style: BorderStyle.SINGLE, size: 1, color: 'DDDDDD' };
const borders = { top: borderDef, bottom: borderDef, left: borderDef, right: borderDef };

function cell(text, opts = {}, shade = null) {
  return new TableCell({
    borders,
    width: opts.width ? { size: opts.width, type: WidthType.DXA } : undefined,
    shading: shade ? { fill: shade, type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            bold: opts.bold || false,
            size: 20,
            font: 'Arial',
            color: opts.color || '000000',
          }),
        ],
      }),
    ],
  });
}

function testResultsTable(rows) {
  const COL = [3200, 3200, 1200, 1760]; // sum = 9360 (letter 1" margins)
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      cell('Test Name', { bold: true, width: COL[0] }, '1F4E79'),
      cell('Description', { bold: true, width: COL[1] }, '1F4E79'),
      cell('Browser', { bold: true, width: COL[2] }, '1F4E79'),
      cell('Result', { bold: true, width: COL[3] }, '1F4E79'),
    ].map((c, i) => {
      // Override text color to white for header
      c.options = c.options || {};
      return c;
    }),
  });

  // Re-create header with white text
  const hdr = new TableRow({
    tableHeader: true,
    children: [
      new TableCell({ borders, width: { size: COL[0], type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: 'Test Name', bold: true, size: 20, font: 'Arial', color: 'FFFFFF' })] })] }),
      new TableCell({ borders, width: { size: COL[1], type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: 'Description', bold: true, size: 20, font: 'Arial', color: 'FFFFFF' })] })] }),
      new TableCell({ borders, width: { size: COL[2], type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: 'Browser', bold: true, size: 20, font: 'Arial', color: 'FFFFFF' })] })] }),
      new TableCell({ borders, width: { size: COL[3], type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: 'Result', bold: true, size: 20, font: 'Arial', color: 'FFFFFF' })] })] }),
    ],
  });

  const dataRows = rows.map((r, idx) => {
    const bg = idx % 2 === 0 ? 'F5F5F5' : 'FFFFFF';
    const resultColor = r[3] === 'PASS' ? '1D6A2E' : 'CC0000';
    const resultBg = r[3] === 'PASS' ? 'D6F0DC' : 'FAD7D7';
    return new TableRow({
      children: [
        new TableCell({ borders, width: { size: COL[0], type: WidthType.DXA }, shading: { fill: bg, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: r[0], size: 20, font: 'Arial' })] })] }),
        new TableCell({ borders, width: { size: COL[1], type: WidthType.DXA }, shading: { fill: bg, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: r[1], size: 20, font: 'Arial' })] })] }),
        new TableCell({ borders, width: { size: COL[2], type: WidthType.DXA }, shading: { fill: bg, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: r[2], size: 20, font: 'Arial' })] })] }),
        new TableCell({ borders, width: { size: COL[3], type: WidthType.DXA }, shading: { fill: resultBg, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: r[3], bold: true, size: 20, font: 'Arial', color: resultColor })] })] }),
      ],
    });
  });

  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: COL,
    rows: [hdr, ...dataRows],
  });
}

// ── Test Results Data ──────────────────────────────────────────────────────

const testResults = [
  // Navigation tests - Chrome
  ['Hero Headline Check', 'Verifies h1 contains "Become Industry-Ready for UK Data, Cloud & AI Roles"', 'Chrome', 'PASS'],
  ['Navbar Programs Link', 'Clicks Programs link, asserts navigation to /programs, checks h1 text', 'Chrome', 'PASS'],
  ['Homepage Full-Page Screenshot', 'Captures full-page screenshot of homepage for visual baseline', 'Chrome', 'PASS'],
  // Apply Form tests - Chrome
  ['Empty Submit Validation', 'Submits empty form, asserts HTML5 required validation prevents submission', 'Chrome', 'PASS'],
  ['Valid Submission (API Mock)', 'Mocks /api/apply, fills all fields, submits, asserts "Application Received"', 'Chrome', 'PASS'],
  // Mobile tests - Chrome
  ['Mobile Hamburger Menu', 'iPhone 13 viewport, clicks Toggle menu button, asserts Book a Call visible', 'Chrome', 'PASS'],
  ['Mobile Hero Headline', 'iPhone 13 viewport, verifies hero h1 is visible on small screen', 'Chrome', 'PASS'],
  // Navigation tests - Safari
  ['Hero Headline Check', 'Verifies h1 contains "Become Industry-Ready for UK Data, Cloud & AI Roles"', 'Safari', 'PASS'],
  ['Navbar Programs Link', 'Mobile-aware: opens hamburger then clicks Programs, asserts /programs page', 'Safari', 'PASS'],
  ['Homepage Full-Page Screenshot', 'Captures full-page screenshot on Mobile Safari for cross-browser baseline', 'Safari', 'PASS'],
  // Apply Form tests - Safari
  ['Empty Submit Validation', 'Submits empty form on WebKit/Safari, asserts URL stays at /apply', 'Safari', 'PASS'],
  ['Valid Submission (API Mock)', 'Mocks /api/apply on WebKit, fills all fields, asserts "Application Received"', 'Safari', 'PASS'],
  // Mobile tests - Safari
  ['Mobile Hamburger Menu', 'iPhone 13 WebKit, clicks Toggle menu, asserts Book a Call link visible', 'Safari', 'PASS'],
  ['Mobile Hero Headline', 'iPhone 13 WebKit, verifies hero h1 is visible on small screen', 'Safari', 'PASS'],
];

// ── Build Document ─────────────────────────────────────────────────────────

// Page 1: Cover
const coverChildren = [
  new Paragraph({ spacing: { before: 1440, after: 0 }, children: [] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 200 },
    children: [new TextRun({ text: 'QA AUTOMATION REPORT', bold: true, size: 56, font: 'Arial', color: '1F4E79' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120 },
    children: [new TextRun({ text: 'ProdReady Labs — End-to-End Test Suite', size: 32, font: 'Arial', color: '444444' })],
  }),
  hr(),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 80 },
    children: [new TextRun({ text: 'Prepared by: Senior QA Automation Engineer', size: 24, font: 'Arial', color: '333333' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 80 },
    children: [new TextRun({ text: 'Test Framework: Playwright v1.x', size: 24, font: 'Arial', color: '333333' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 80 },
    children: [new TextRun({ text: 'Date: 8 April 2026', size: 24, font: 'Arial', color: '333333' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 80 },
    children: [new TextRun({ text: 'Environment: Next.js 16 App Router — http://localhost:3000', size: 24, font: 'Arial', color: '333333' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 80 },
    children: [new TextRun({ text: 'Browsers: Desktop Chrome | Mobile Safari (iPhone 13)', size: 24, font: 'Arial', color: '333333' })],
  }),
  hr(),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 160, after: 80 },
    children: [
      new TextRun({ text: 'OVERALL RESULT: ', bold: true, size: 28, font: 'Arial', color: '1D6A2E' }),
      new TextRun({ text: '14/14 PASSED', bold: true, size: 28, font: 'Arial', color: '1D6A2E' }),
    ],
  }),
  new Paragraph({ children: [new PageBreak()] }),
];

// Page 2: TOC placeholder note + actual TOC
const tocChildren = [
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 240, after: 200 },
    children: [new TextRun({ text: 'Table of Contents', bold: true, size: 36, font: 'Arial' })],
  }),
  new TableOfContents('Table of Contents', {
    hyperlink: true,
    headingStyleRange: '1-3',
  }),
  new Paragraph({ children: [new PageBreak()] }),
];

// Section 1: Overview & Scope
const section1 = [
  h1('1. Overview & Project Scope'),
  h2('1.1 Purpose'),
  p('This report documents the end-to-end (E2E) automated test suite created for the ProdReady Labs marketing website. The site is a Next.js 16 App Router application that serves as the primary customer acquisition channel — collecting leads via a multi-field application form, showcasing programme pricing tiers, and routing visitors to booking calls.'),
  p('The objective of this QA engagement was to:'),
  bullet('Validate that core user journeys function correctly on both desktop and mobile form factors.'),
  bullet('Confirm UI content matches expected copy (hero headline, programmes page).'),
  bullet('Verify the application form correctly handles both empty submission (HTML5 validation) and successful submission (with backend API mocked).'),
  bullet('Confirm the mobile hamburger navigation opens and exposes the primary CTA link.'),
  bullet('Produce screenshot evidence of every tested state for audit and stakeholder sign-off.'),
  spacer(),
  h2('1.2 Application Under Test'),
  p('Application: ProdReady Labs — UK Data, Cloud & AI Career Accelerator'),
  p('Framework: Next.js 16.2.2 with App Router'),
  p('Base URL: http://localhost:3000'),
  p('Key pages under test:'),
  bullet('/ — Homepage (hero section, 3 core pillars, pricing preview, final CTA)'),
  bullet('/programs — Full pricing and programme detail page'),
  bullet('/apply — Multi-field application form posting to /api/apply (Resend SDK)'),
  spacer(),
  h2('1.3 Test Environment'),
  p('OS: Windows 11 Home (Build 22621)'),
  p('Node.js: Current LTS via project devDependencies'),
  p('Test Framework: Playwright v1.x (@playwright/test)'),
  p('Browsers: Desktop Chrome (Chromium), Mobile Safari (WebKit / iPhone 13 device profile)'),
  p('Server: Next.js dev server auto-started via Playwright webServer config'),
  p('Parallelism: Single worker (fullyParallel: false) — required for local dev server stability'),
  p('Retries: 1 retry on failure to handle dev-server flakiness'),
  new Paragraph({ children: [new PageBreak()] }),
];

// Section 2: Phase 1 - Navigation
const section2 = [
  h1('2. Phase 1 — Navigation Tests'),
  h2('2.1 What Was Tested & Why'),
  p('The navigation test suite validates the two most critical user-facing elements on the homepage:'),
  bullet('Hero Headline — The primary H1 tag is the first content a visitor reads. Regression on this copy (e.g., a broken build, CMS override, or wrong environment) would immediately signal problems to all visitors.'),
  bullet('Programs Navbar Link — The "Programs" link is the top funnel entry point for users evaluating pricing. It must navigate to /programs and render the correct heading on both desktop and mobile viewports.'),
  bullet('Full-Page Screenshot — A visual baseline for the complete homepage layout captured at each test run.'),
  spacer(),
  h2('2.2 Test File'),
  p('File: tests/e2e/navigation.spec.ts', { font: 'Courier New', size: 20 }),
  spacer(),
  h2('2.3 Mobile-Aware Design Decision'),
  p('The Navbar component uses Tailwind\'s hidden md:flex classes — desktop nav links are CSS-hidden on mobile viewports. The navbar Programs link test detects the current viewport width and, when below 768px (mobile), first clicks the hamburger toggle button (aria-label="Toggle menu") before clicking the Programs link. This ensures the test passes on both Desktop Chrome and Mobile Safari without duplicating test files.'),
  spacer(),
  h2('2.4 Screenshots'),
  ...img('hero-headline.png', 480, 200, 'Figure 1: Homepage hero headline — Desktop Chrome'),
  spacer(),
  ...img('programs-page.png', 480, 200, 'Figure 2: Programs page after navbar link click — Desktop Chrome'),
  spacer(),
  ...img('homepage-fullpage.png', 480, 280, 'Figure 3: Full homepage scroll — Desktop Chrome'),
  new Paragraph({ children: [new PageBreak()] }),
];

// Section 3: Phase 2 - Apply Form
const section3 = [
  h1('3. Phase 2 — Apply Form Tests'),
  h2('3.1 What Was Tested & Why'),
  p('The /apply page is the primary lead-capture mechanism for ProdReady Labs. A broken form directly impacts revenue. Two scenarios were tested:'),
  spacer(),
  h3('3.1.1 Empty Submit Validation'),
  p('All six form fields include HTML5 required attributes. Submitting without filling required fields must be prevented by the browser\'s native constraint validation. The test clicks Submit Application without filling any fields and asserts:'),
  bullet('The page URL remains /apply (no navigation occurred)'),
  bullet('The submit button remains visible (the form was not submitted)'),
  p('Why: This confirms that no server-side code runs on empty submissions, protecting the API quota and ensuring data integrity.'),
  spacer(),
  h3('3.1.2 Valid Submission with API Mock'),
  p('The form POSTs to /api/apply, which calls the Resend SDK to send email notifications. Running this in CI without a live Resend API key would cause failures and real email sends. The test intercepts all requests matching **/api/apply using page.route() and fulfills them with a 200 OK response containing { success: true }.'),
  p('The test then:'),
  bullet('Fills name, email, target-role (Data Engineer), experience level, tools, and goal fields'),
  bullet('Clicks Submit Application'),
  bullet('Waits for and asserts the "Application Received" success heading appears'),
  p('Why: This validates the full client-side form lifecycle — data collection, API call, and success state rendering — without any external dependencies.'),
  spacer(),
  h2('3.2 Test File'),
  p('File: tests/e2e/apply-form.spec.ts', { font: 'Courier New', size: 20 }),
  spacer(),
  h2('3.3 Screenshots'),
  ...img('apply-form-initial.png', 420, 250, 'Figure 4: Apply form initial state (empty)'),
  spacer(),
  ...img('apply-form-filled.png', 420, 250, 'Figure 5: Apply form with all fields populated'),
  spacer(),
  ...img('apply-form-validation.png', 420, 250, 'Figure 6: After empty submit click — form still present, URL unchanged'),
  spacer(),
  ...img('apply-form-success.png', 420, 200, 'Figure 7: Success state — "Application Received" heading visible'),
  new Paragraph({ children: [new PageBreak()] }),
];

// Section 4: Phase 3 - Mobile
const section4 = [
  h1('4. Phase 3 — Mobile Tests (iPhone 13)'),
  h2('4.1 What Was Tested & Why'),
  p('Mobile traffic now accounts for the majority of web visits globally. The Navbar component renders a hamburger icon on viewports below the md (768px) Tailwind breakpoint, hiding the desktop navigation links. Two mobile-specific scenarios were tested using the iPhone 13 device profile (390x844px viewport, device pixel ratio 3):'),
  spacer(),
  h3('4.1.1 Hamburger Menu Open'),
  p('The test:'),
  bullet('Navigates to the homepage on iPhone 13 viewport'),
  bullet('Asserts the hamburger button (aria-label="Toggle menu") is visible'),
  bullet('Clicks the button to open the mobile drawer menu'),
  bullet('Asserts that the "Book a Call" CTA link is visible within the opened menu'),
  p('Why: The mobile CTA is the primary conversion mechanism for mobile visitors. If the hamburger fails to open or the CTA is hidden, the entire mobile funnel is broken.'),
  spacer(),
  h3('4.1.2 Mobile Hero Headline'),
  p('Verifies that the hero h1 text is visible at mobile viewport size, confirming no text overflow, display:none, or font-size collapse is hiding critical content.'),
  spacer(),
  h2('4.2 Test File'),
  p('File: tests/e2e/mobile.spec.ts', { font: 'Courier New', size: 20 }),
  spacer(),
  h2('4.3 Screenshots'),
  ...img('mobile-homepage-closed.png', 240, 200, 'Figure 8: Mobile homepage — hamburger menu closed'),
  spacer(),
  ...img('mobile-menu-open.png', 240, 200, 'Figure 9: Mobile hamburger opened — Book a Call CTA visible'),
  spacer(),
  ...img('mobile-hero.png', 240, 280, 'Figure 10: Mobile hero headline visible on iPhone 13 viewport'),
  new Paragraph({ children: [new PageBreak()] }),
];

// Section 5: Full Results Table
const section5 = [
  h1('5. Complete Test Results'),
  h2('5.1 Test Run Summary'),
  p('Total Tests: 14   |   Passed: 14   |   Failed: 0   |   Skipped: 0'),
  p('Run Duration: ~35 seconds (single worker, sequential execution)'),
  p('Retries Triggered: 0'),
  spacer(),
  h2('5.2 Pass / Fail Table'),
  testResultsTable(testResults),
  spacer(),
  h2('5.3 Browser Coverage'),
  p('Desktop Chrome: 7/7 PASS — All navigation, form, and mobile tests passed on Chromium.'),
  p('Mobile Safari: 7/7 PASS — All tests passed on WebKit with iPhone 13 device profile. The navbar test correctly uses the mobile hamburger flow.'),
  new Paragraph({ children: [new PageBreak()] }),
];

// Section 6: Configuration
const section6 = [
  h1('6. Playwright Configuration'),
  h2('6.1 playwright.config.ts'),
  p('Key configuration decisions:'),
  bullet('webServer: Playwright auto-starts npm run dev and waits for http://localhost:3000 — no manual server start needed.'),
  bullet('fullyParallel: false + workers: 1 — Required for a local dev server that cannot handle concurrent test sessions safely.'),
  bullet('retries: 1 — Handles occasional dev-server cold-start latency without masking real failures.'),
  bullet('screenshot: "on" — Screenshots captured for every test, both on pass and fail.'),
  bullet('reporter: [["html"]] — Generates a full interactive HTML report in playwright-report/.'),
  bullet('Projects: Desktop Chrome (devices["Desktop Chrome"]) + Mobile Safari (devices["iPhone 13"]) — Full cross-browser matrix.'),
  spacer(),
  h2('6.2 API Mocking Strategy'),
  p('The apply form POSTs to /api/apply which calls the Resend SDK (requires RESEND_API_KEY env var). To run E2E tests without real credentials:'),
  bullet('page.route("**/api/apply", ...) intercepts the outgoing fetch request within the browser context.'),
  bullet('route.fulfill({ status: 200, body: JSON.stringify({ success: true }) }) returns a synthetic 200 response.'),
  bullet('The component\'s response handler calls setSubmitted(true) — triggering the "Application Received" UI without any real network call.'),
  p('This pattern is safe, deterministic, and does not require any changes to application code.'),
  new Paragraph({ children: [new PageBreak()] }),
];

// Section 7: Sign-Off
const section7 = [
  h1('7. Sign-Off'),
  h2('7.1 Test Completion Statement'),
  p('All 14 Playwright end-to-end tests covering navigation, form validation, API-mocked form submission, and mobile responsiveness have been executed and passed on both Desktop Chrome (Chromium) and Mobile Safari (WebKit / iPhone 13 device profile).'),
  p('The application\'s core user journeys — from landing on the homepage through to programme evaluation and application submission — function correctly and produce the expected UI states as documented in Sections 2 through 4 with inline screenshot evidence.'),
  spacer(),
  h2('7.2 Outstanding Items / Recommendations'),
  bullet('CI Integration: Add npx playwright test to the GitHub Actions pipeline triggered on pull requests to main. Use the HTML reporter artefact for test results persistence.'),
  bullet('Visual Regression: Introduce @playwright/test snapshot testing (toMatchSnapshot) for pixel-level comparison of the hero section and pricing cards across releases.'),
  bullet('API Integration Test: Add a separate integration test file that tests /api/apply with a real (test environment) Resend key to validate the email delivery pipeline end-to-end.'),
  bullet('Accessibility: Integrate axe-playwright to run WCAG 2.1 AA accessibility audits on every page as part of the Playwright suite.'),
  bullet('Performance: Add a Lighthouse CI step to track Core Web Vitals (LCP, CLS, FID) regressions alongside the E2E suite.'),
  spacer(),
  h2('7.3 Approvals'),
  spacer(),
  p('QA Engineer: ___________________________________    Date: ____________'),
  spacer(),
  p('Tech Lead / Engineering Manager: _______________    Date: ____________'),
  spacer(),
  p('Product Owner: _________________________________    Date: ____________'),
  spacer(),
  hr(),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 0 },
    children: [new TextRun({ text: 'ProdReady Labs — QA Automation Report | Confidential', size: 18, italics: true, color: '888888', font: 'Arial' })],
  }),
];

// ── Assemble Document ──────────────────────────────────────────────────────

const doc = new Document({
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: '\u2022',
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
    ],
  },
  styles: {
    default: {
      document: { run: { font: 'Arial', size: 22 } },
    },
    paragraphStyles: [
      {
        id: 'Heading1',
        name: 'Heading 1',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 36, bold: true, font: 'Arial', color: '1F4E79' },
        paragraph: { spacing: { before: 240, after: 200 }, outlineLevel: 0 },
      },
      {
        id: 'Heading2',
        name: 'Heading 2',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 28, bold: true, font: 'Arial', color: '2E74B5' },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 1 },
      },
      {
        id: 'Heading3',
        name: 'Heading 3',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 24, bold: true, font: 'Arial', color: '2E74B5' },
        paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 2 },
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC', space: 1 } },
              children: [
                new TextRun({ text: 'ProdReady Labs  |  QA Automation Report  |  April 2026', size: 18, font: 'Arial', color: '888888' }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              border: { top: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC', space: 1 } },
              children: [
                new TextRun({ text: 'Page ', size: 18, font: 'Arial', color: '888888' }),
                new TextRun({ children: [PageNumber.CURRENT], size: 18, font: 'Arial', color: '888888' }),
                new TextRun({ text: ' of ', size: 18, font: 'Arial', color: '888888' }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, font: 'Arial', color: '888888' }),
              ],
            }),
          ],
        }),
      },
      children: [
        ...coverChildren,
        ...tocChildren,
        ...section1,
        ...section2,
        ...section3,
        ...section4,
        ...section5,
        ...section6,
        ...section7,
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(OUT, buffer);
  console.log(`\nReport written: ${OUT}`);
  console.log(`File size: ${(buffer.length / 1024).toFixed(1)} KB`);
});
