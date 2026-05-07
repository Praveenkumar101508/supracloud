# QA Report — supracloud.co.uk
**Date:** 2026-05-07  
**Site:** `https://supracloud.co.uk` (Next.js 16.2.2 · React 19 · Tailwind 4 · App Router)  
**Scope:** Full 7-phase pipeline — unit tests, E2E, accessibility, links, responsive

---

## Executive Summary

| Phase | Result | Details |
|---|---|---|
| Phase 2 — Unit Tests | ✅ 56/56 passed | 4 suites · 0 failures |
| Phase 3 — E2E Tests | ⚠️ 90/96 passed | 6 real site bugs found |
| Phase 4 — Accessibility | ❌ 33 violations | 2 critical, all routes affected |
| Phase 5 — Performance | ⚠️ Not run | Lighthouse CLI unavailable |
| Phase 6 — Broken Links | ⚠️ 2/4 external links broken | Twitter + LinkedIn 404 |

**Overall verdict:** Site is functionally sound (all routes 200, APIs working) but has systemic accessibility failures (colour contrast sitewide) and responsive overflow bugs at tablet width on multiple pages. Recommend blocking deployment on the `label` CRITICAL violations.

---

## Phase 1 — Coverage Map

### Routes (15)

| Route | Returns 200 | Unit tested | E2E tested | Notes |
|---|---|---|---|---|
| `/` | ✅ | — | ✅ TC-1.01, TC-2.xx | |
| `/about` | ✅ | — | ✅ TC-6.xx | |
| `/contact` | ✅ | — | ✅ TC-7.xx | |
| `/book` | ✅ | — | ✅ TC-8.xx | |
| `/solutions/banking` | ✅ | — | ✅ TC-3.01, TC-3.03, TC-3.05 | |
| `/solutions/retail` | ✅ | — | ✅ TC-3.02, TC-3.04, TC-3.06 | |
| `/services/staffing` | ✅ | — | ✅ TC-4.01, TC-4.03, TC-4.05 | |
| `/services/consultation` | ✅ | — | ✅ TC-4.02, TC-4.04, TC-4.06 | |
| `/talent/programs` | ✅ | — | ✅ TC-5.01, TC-5.04 | |
| `/talent/partnerships` | ✅ | — | ✅ TC-5.02, TC-5.05 | |
| `/talent/internships` | ✅ | — | ✅ TC-5.03, TC-5.06 | |
| `/portal` | ✅ | — | ✅ TC-9.xx | |
| `/portal/resources` | ✅ | — | — | 200 confirmed via link checker |
| `/privacy` | ✅ | — | ✅ TC-11.01, TC-11.03 | |
| `/terms` | ✅ | — | ✅ TC-11.02, TC-11.04 | |

### API Routes (3)

| Route | Unit tested | Notes |
|---|---|---|
| `POST /api/apply` | ✅ 16 cases | Validation, email fields, error paths |
| `POST /api/checkout` | ✅ 13 cases | All 3 tiers, Stripe mock, 500 handling |
| `POST /api/contact` | ✅ 17 cases | Business brief + candidate paths |

### Config / SEO

| File | Unit tested |
|---|---|
| `app/robots.ts` | ✅ 7 cases |

---

## Phase 2 — Unit Test Results

**4 suites · 56 tests · 0 failures**

```
qa-output/unit-tests/contact-route.test.ts   17 passed
qa-output/unit-tests/apply-route.test.ts     16 passed
qa-output/unit-tests/checkout-route.test.ts  16 passed
qa-output/unit-tests/robots.test.ts           7 passed
```

### Notable coverage points
- `POST /api/contact`: business brief and candidate enquiry paths both fully tested; Resend mock captured via module-level instance pattern
- `POST /api/apply`: all 5 required fields validated independently; email content (to, replyTo, subject) verified
- `POST /api/checkout`: all 3 valid tiers return 200 with Stripe URL; 4 invalid-tier variants return 400; Stripe error returns 500 and does not leak internal error message to client
- `robots.ts`: disallows `/portal/` and `/api/`, allows `/`, sitemap contains `supracloud.co.uk`

---

## Phase 3 — E2E Test Results

**Playwright 1.59 · 11 spec files · 96 tests · Desktop Chrome (1440×900)**

| Spec | Tests | Passed | Failed |
|---|---|---|---|
| `nav.spec.ts` (TC-1.xx) | 22 | 22 | 0 |
| `homepage.spec.ts` (TC-2.xx) | 10 | 10 | 0 |
| `solutions.spec.ts` (TC-3.xx) | 6 | 6 | 0 |
| `services.spec.ts` (TC-4.xx) | 6 | 6 | 0 |
| `talent.spec.ts` (TC-5.xx) | 6 | 6 | 0 |
| `about.spec.ts` (TC-6.xx) | 4 | 4 | 0 |
| `contact.spec.ts` (TC-7.xx) | 7 | 7 | 0 |
| `book.spec.ts` (TC-8.xx) | 8 | 8 | 0 |
| `portal.spec.ts` (TC-9.xx) | 7 | 7 | 0 |
| `responsive.spec.ts` (TC-10.xx) | 16 | 10 | **6** |
| `legal.spec.ts` (TC-11.xx) | 4 | 4 | 0 |
| **Total** | **96** | **90** | **6** |

### E2E Failures (real site bugs)

All 6 failures are horizontal overflow bugs at tablet/mobile viewports — confirmed reproducible:

| Test | URL | Viewport | Bug |
|---|---|---|---|
| TC-10 [768px] | `/` | 768×600 | scrollWidth > clientWidth |
| TC-10 [768px] | `/about` | 768×600 | scrollWidth > clientWidth |
| TC-10 [768px] | `/contact` | 768×600 | scrollWidth > clientWidth |
| TC-10 [375px] | `/solutions/banking` | 375×812 | scrollWidth > clientWidth |
| TC-10 [375px] | `/portal` | 375×812 | scrollWidth > clientWidth |
| TC-10 [768px] | `/portal` | 768×600 | scrollWidth > clientWidth |

Note: all pages pass at 1440px. The overflow at 768px (tablet breakpoint) suggests a fixed-width element is exceeding the viewport between the mobile (375px OK) and desktop (1440px OK) breakpoints on most pages. The banking and portal pages overflow at 375px as well.

### Notable E2E coverage points
- TC-1.10–TC-1.18: all 9 sub-routes return 200 (banking, retail, staffing, consultation, 3× talent, privacy, terms)
- TC-2.09: meta title contains "SupraCloud" ✅
- TC-7.06: API POST mocked via `route.fulfill` — no real form submission
- TC-9.02: portal H1 visible; TC-9.03–9.06: all sidebar nav links present in DOM
- TC-8.08: submit button correctly disabled when form empty

---

## Phase 4 — Accessibility Audit

**Tool:** axe-core (WCAG 2.1 AA + best-practice)  
**Routes audited:** 14  
**Total violations:** 33  
**Routes fully clean:** 0

### Summary

| Issue | Impact | Routes affected | Occurrences |
|---|---|---|---|
| `color-contrast` | SERIOUS | All 14 | Emerald-500 (#10B981) on white/light backgrounds fails AA ratio |
| `label` | **CRITICAL** | `/book`, `/solutions/retail` | Form inputs have no `<label>` — blocks screen reader users |
| `landmark-main-is-top-level` | MODERATE | 5 routes | Embedded `<main>` inside layout |
| `landmark-no-duplicate-main` | MODERATE | 5 routes | Two `<main>` elements on same page |
| `landmark-unique` | MODERATE | 5 routes | Same root cause as above |
| `heading-order` | MODERATE | `/book`, `/solutions/banking`, `/services/consultation` | h5 appears before h3/h4 |
| `link-in-text-block` | SERIOUS | `/privacy`, `/terms` | Email links not underlined at rest — colour-only distinction |

### Recommended fixes (priority order)

1. **CRITICAL — Add `<label>` elements to all booking form inputs** (`/book` and the embedded form on solution/service pages). Currently 4 inputs per form have no associated label. Use `htmlFor`/`id` pairing or `aria-label`.
2. **SERIOUS — Adjust emerald-500 contrast** — #10B981 on white yields ~2.9:1, below the 4.5:1 AA minimum for normal text (3:1 for large text). Options: darken to `#059669` (emerald-600) for text, or use on dark backgrounds only.
3. **MODERATE — Fix duplicate `<main>` landmark** — The layout wraps content in `<main class="flex-1">` and some pages embed another `<main>`. Remove the inner `<main>` from page-level components.
4. **MODERATE — Fix heading hierarchy** — Ensure h1 → h2 → h3 order is sequential. Current jumps: h3 directly to h5 on `/book`.
5. **SERIOUS — Underline links in text** (`/privacy`, `/terms`) — Add `underline` class or `text-decoration: underline` to inline links so they're distinguishable without colour.

---

## Phase 5 — Performance

Lighthouse CLI was not available in the test environment. Skipped.

**Manual recommendation:** Run `npx lighthouse https://supracloud.co.uk --output=json` to capture LCP, FID, CLS and TTI baselines. Add to CI as a regression gate.

---

## Phase 6 — Broken Link Audit

**Internal routes checked:** 15 — all returned 200 ✅  
**External links checked:** 3 HTTP + 1 mailto

| URL | Status | Result |
|---|---|---|
| `https://wa.me/447776456694` | 200 | ✅ OK |
| `mailto:rk@supracloud.co.uk` | N/A | ✅ (mailto — not HTTP-checked) |
| `https://twitter.com/supraclouduk` | **404** | ❌ BROKEN |
| `https://linkedin.com/company/supracloud` | **404** | ❌ BROKEN |

### Action required
Remove or update Twitter and LinkedIn links. The Twitter handle `supraclouduk` returns 404 (account does not exist or was deactivated). The LinkedIn company slug `supracloud` is not found. Either register the correct handles and update the URLs, or remove the social links until accounts are active.

---

## Bugs Found

### BUG-01 — Critical: Form inputs missing `<label>` elements
- **Pages:** `/book`, `/solutions/retail` (embedded form), `/solutions/banking` (embedded form, not detected separately)
- **Symptom:** `name`, `company`, `email`, and other booking form inputs have no `<label for>` or `aria-label`. Screen readers cannot announce field purpose.
- **Impact:** WCAG 2.1 AA failure (SC 1.3.1 and 4.1.2). Affects all assistive technology users.
- **Fix:** Add `<label htmlFor="name">Name</label>` to each input, or add `aria-label` attribute.
- **Status:** Open

### BUG-02 — Serious: Emerald-500 colour contrast fails WCAG AA
- **Pages:** All 14 routes
- **Symptom:** `#10B981` (emerald-500) as text colour on white/slate-50 backgrounds yields ~2.9:1 contrast ratio, below the 4.5:1 minimum for normal text (3:1 for large text).
- **Impact:** Low-vision users may not be able to read labels, badges, and CTA button text.
- **Fix:** Switch text uses to `text-emerald-700` (`#047857`, ~5.5:1 on white); use emerald-500 as a background with white text only where it passes.
- **Status:** Open

### BUG-03 — Moderate: Horizontal scroll overflow at 768px tablet viewport
- **Pages:** `/`, `/about`, `/contact`, `/solutions/banking`, `/portal`
- **Symptom:** `document.documentElement.scrollWidth > clientWidth` at 768px viewport width. The banking and portal pages also overflow at 375px.
- **Impact:** Tablet users (iPad landscape) see horizontal scrollbars. Content may be clipped on some devices.
- **Fix:** Audit the layout for fixed-width elements (likely a grid or table with a `min-width` that exceeds 768px). Add `overflow-x: hidden` as a workaround, but prefer fixing the root element.
- **Status:** Open

### BUG-04 — Moderate: Duplicate `<main>` landmark
- **Pages:** `/book`, `/solutions/banking`, `/solutions/retail`, `/services/consultation`, `/portal`
- **Symptom:** Two `<main>` elements rendered — one from `layout.tsx` and one inside certain page components. axe-core flags `landmark-no-duplicate-main` and `landmark-unique`.
- **Impact:** Screen readers that use landmark navigation (NVDA, JAWS) may present duplicate "main" regions to users.
- **Fix:** Remove the `<main>` wrapper from individual page components where `layout.tsx` already provides one.
- **Status:** Open

### BUG-05 — Moderate: Heading hierarchy violations
- **Pages:** `/book`, `/solutions/banking`, `/services/consultation`
- **Symptom:** H5 (`<h5>AI Solutions</h5>`) appears in the footer without a preceding H3/H4 in the document flow. `/book` jumps from H3 to H5 with no H4.
- **Fix:** Use `<p>` or `<span>` styled as a heading for decorative headings; ensure heading levels are sequential.
- **Status:** Open

### BUG-06 — Serious: Stale social media links (404)
- **Pages:** Footer (all pages)
- **Symptom:** Twitter and LinkedIn footer links return 404.
- **Fix:** Register `supraclouduk` on Twitter and `supracloud` on LinkedIn, or remove the links.
- **Status:** Open

---

## Gaps — Manual Testing Required

| Area | Reason |
|---|---|
| Lighthouse performance audit | CLI not in test environment; LCP/CLS/TTI not measured |
| Real form submission to `/api/contact` | Mocked in E2E to avoid sending emails |
| Stripe checkout redirect | Full Stripe session requires test-mode keys + live E2E |
| Colour contrast with correct ratios | axe detects failures but cannot auto-fix; manual verification of final colours needed |
| Cross-browser (Safari, Firefox) | Only Desktop Chrome tested in this run |
| Portal auth flow | No authentication implemented — portal shows static demo |

---

## Recommendations

1. **Fix CRITICAL label violations immediately** — Unlabelled form inputs are a WCAG 2.1 AA blocker that would fail a VPAT audit. Four inputs on `/book` and the embedded forms need `<label>` elements.
2. **Darken emerald-500 to emerald-700 for text** — A single Tailwind config change would fix 16+ colour-contrast failures across all pages.
3. **Fix tablet overflow** — Add a responsive test to CI (`scrollWidth <= clientWidth` at 768px) and investigate the fixed-width element causing overflow, likely in the solution matrix or grid on the banking page.
4. **Fix duplicate `<main>` landmark** — Remove `<main>` from page-level components that embed inside `layout.tsx`'s `<main>`.
5. **Register or remove social media handles** — Twitter and LinkedIn 404 links damage brand credibility. Either claim the handles or remove the footer links.
6. **Add Lighthouse to CI** — Run `lighthouse --budget-path budget.json` against staging on every deploy; gate on LCP < 2.5 s and CLS < 0.1.
7. **Add axe-core to Playwright suite** — The accessibility violations found here should be regression-tested. Add `@axe-core/playwright` to `seo-a11y.spec.ts` so violations block CI.
8. **Add `<label>` to contact form** — `/contact`'s dynamically revealed form fields should also be checked; the contact form currently passes but is rendered via state; ensure labels are rendered for all revealed fields.

---

*Generated by the SupraCloud QA pipeline — 2026-05-07*  
*Reports: `accessibility-report.md` · `broken-links-report.md` · `e2e-tests/` · `unit-tests/`*
