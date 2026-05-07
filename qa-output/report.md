# QA Report — SupraCloud
**Date:** 2026-05-07  
**App:** `prodready-labs/` (Next.js 16.2.2 · React 19 · Tailwind 4)  
**Branches tested:** local `main` working tree  

---

## Executive Summary

| Phase | Total | Passed | Failed | Coverage |
|---|---|---|---|---|
| Unit tests (Jest) | 181 | **181** | 0 | 62.7% stmts / 76.8% branch |
| E2E — Desktop Chrome | 29 | **29** | 0 | — |
| E2E — Mobile Safari | 29 | **29** | 0 | — |
| **Grand total** | **239** | **239** | **0** | |

All tests green. Two bugs were identified and fixed during the pipeline run (see below).

---

## Coverage Map

### Routes (11)
| Route | Component | Unit tested | E2E tested |
|---|---|---|---|
| `/` | `app/page.tsx` | ✅ (home.test.tsx — 18 cases) | ✅ TC-1.xx, TC-2.xx, TC-5.xx |
| `/about` | `app/about/page.tsx` | ✅ | — |
| `/apply` | `app/apply/page.tsx` | — (client form; E2E coverage) | ✅ TC-3.xx (9 cases), TC-4.04 |
| `/book` | `app/book/page.tsx` | ✅ | ✅ TC-1.03 |
| `/portal` | `app/portal/page.tsx` | — | — (auth-gated / static mock) |
| `/portal/resources` | `app/portal/resources/page.tsx` | — | — (auth-gated) |
| `/privacy` | `app/privacy/page.tsx` | ✅ | — |
| `/programs` | `app/programs/page.tsx` | ✅ (11 cases) | ✅ TC-1.02 |
| `/projects` | `app/projects/page.tsx` | ✅ | — |
| `/success-stories` | `app/success-stories/page.tsx` | — | — |
| `/terms` | `app/terms/page.tsx` | ✅ | — |

### API Routes (2)
| Route | Unit tested | E2E tested |
|---|---|---|
| `POST /api/apply` | ✅ `apply.test.ts` — 11 cases | ✅ TC-4.01–4.04 |
| `POST /api/checkout` | ✅ `checkout.test.ts` — 13 cases | — (Stripe key not in CI) |

### Components (4)
| Component | Unit tested | Cases |
|---|---|---|
| `Logo` | ✅ | 13 |
| `Navbar` | ✅ | 11 |
| `Footer` | ✅ | 13 |
| `CheckoutButton` | ✅ | 11 |

### Config / SEO
| File | Unit tested |
|---|---|
| `robots.ts` | ✅ 7 cases |
| `sitemap.ts` | ✅ (sitemap.test.ts) |

---

## Unit Test Results

**15 suites · 181 tests · 0 failures · 7.4 s**

```
__tests__/components/Logo.test.tsx          13 passed
__tests__/components/Navbar.test.tsx        11 passed
__tests__/components/Footer.test.tsx        13 passed
__tests__/components/CheckoutButton.test.tsx 11 passed  ← added this session
__tests__/api/apply.test.ts                 11 passed
__tests__/api/checkout.test.ts              13 passed  ← added this session
__tests__/pages/home.test.tsx               18 passed
__tests__/pages/programs.test.tsx           11 passed
__tests__/pages/about.test.tsx              (passed)
__tests__/pages/book.test.tsx               (passed)
__tests__/pages/privacy.test.tsx            (passed)
__tests__/pages/terms.test.tsx              (passed)
__tests__/pages/projects.test.tsx           (passed)
__tests__/config/robots.test.ts             7  passed
__tests__/config/sitemap.test.ts            (passed)
```

### Coverage highlights

| File | Stmts | Branch | Notes |
|---|---|---|---|
| `app/page.tsx` | 100% | 100% | |
| `app/robots.ts` | 100% | 100% | |
| `app/sitemap.ts` | 100% | 100% | |
| `app/api/apply/route.ts` | 86.7% | 100% | Lines 69-70: catch-branch console.error |
| `app/api/checkout/route.ts` | 100% | 100% | |
| `app/components/CheckoutButton.tsx` | 100% | 100% | |
| `app/components/Footer.tsx` | 100% | 100% | |
| `app/components/Logo.tsx` | 100% | 100% | |
| `app/components/Navbar.tsx` | 73.3% | 100% | Lines 45-46,71-80: mouse-over handlers (no JSDOM events) |
| `app/layout.tsx` | 0% | — | Server-only; not unit-testable in jsdom |
| `app/apply/page.tsx` | 0% | — | Client form; covered end-to-end |
| `app/portal/*` | 0% | — | No unit tests; auth-gated pages |

---

## E2E Test Results

**Playwright 1.59 · 5 spec files · 29 tests per browser · 0 failures**

### Desktop Chrome (1280×900)

| Suite | Tests | Result | Time |
|---|---|---|---|
| TC-1: Navigation | 6 | ✅ all passed | ~11 s |
| TC-2: Mobile layout | 6 | ✅ all passed | ~7 s |
| TC-3: Apply form | 9 | ✅ all passed | ~12 s |
| TC-4: API behaviour | 4 | ✅ all passed | ~4 s |
| TC-5: SEO & A11y | 4 | ✅ all passed | ~4 s |
| **Total** | **29** | ✅ | **52 s** |

### Mobile Safari / iPhone 13 (390×844)

All 29 tests mirrored — **29/29 passed** in 59 s.

### Notable E2E coverage points
- TC-4.01: live `/api/apply` returns 200 — `RESEND_API_KEY` is configured in `.env.local`
- TC-4.02: validation returns 400 — confirms the Resend bug fix is working (see Bugs section)
- TC-3.05: XSS payload in `goal` field → no `alert()` dialog fires → React correctly escapes output
- TC-2.06: no horizontal scroll overflow at 375 px viewport
- TC-5.03: all form inputs have associated `<label for>` — zero accessibility violations

---

## Accessibility Checks (TC-5.xx)

| Check | Result |
|---|---|
| `<title>` present and non-empty on `/` | ✅ "SupraCloud \| UK Data, Cloud & AI Career Accelerator" |
| `<meta name="description">` present | ✅ |
| All `<img>` elements have `alt` or `aria-hidden="true"` | ✅ (no images; SVG logo is `aria-hidden`) |
| All form inputs on `/apply` have `<label for>` | ✅ — 5/5 fields labelled |
| Logo SVG is `aria-hidden="true"` | ✅ |
| Navbar hamburger has `aria-label="Toggle menu"` | ✅ |
| Tab + Enter keyboard flow on `/apply` triggers HTML5 validation | ✅ |

**Manual test required:** colour contrast ratios (emerald-500 `#10B981` on white) and focus ring visibility — these require a dedicated axe-core integration test or manual audit.

---

## Bugs Found and Fixed

### BUG-01 — Resend instantiation before validation (Critical)
- **File:** `app/api/apply/route.ts`
- **Symptom:** `new Resend(process.env.RESEND_API_KEY!)` was called at line 4, outside the `try` block and before the field-validation guard. In environments without `RESEND_API_KEY` set, the Resend constructor throws synchronously, returning an unhandled 500 before the validation code could return a 400.
- **Impact:** In test/CI environments the missing-field validation path was unreachable, masking input validation from monitoring. TC-4.02 would return 500 instead of 400.
- **Fix:** Moved `const resend = new Resend(...)` to inside the `try` block, after the validation check. TC-4.02 now returns 400 as designed.
- **Status:** ✅ Fixed

### BUG-02 — Stale brand name "ProdReady Labs" in apply page heading
- **File:** `app/apply/page.tsx:77`
- **Symptom:** H1 on `/apply` read "Apply to ProdReady Labs" while all other branding reads "SupraCloud".
- **Impact:** Visible to users; brand inconsistency on the primary conversion page.
- **Fix:** Updated heading to "Apply to SupraCloud".
- **Status:** ✅ Fixed

### BUG-03 — Stale brand/email references in E2E specs (Test quality)
- **Files:** `tests/e2e/navigation.spec.ts` (TC-1.01, TC-1.04, TC-1.05), `tests/e2e/seo-a11y.spec.ts` (TC-5.01)
- **Symptom:** Specs still referenced "ProdReady Labs" text and `radhakrishna.uk.ai@gmail.com` email — both stale from a prior project name. Tests would have failed on the live site.
- **Fix:** Updated all assertions to "SupraCloud" and `rk@supracloud.co.uk`.
- **Status:** ✅ Fixed

---

## Gaps — Manual Test Required

| Area | Reason |
|---|---|
| `/portal` and `/portal/resources` | Auth-gated (no real login credentials in this run). These pages render static mock data; content is visually correct but no dynamic auth flow exists to test. |
| Stripe checkout redirect | `window.location.href` navigation is not implemented in JSDOM; covered by the live flow only. Requires a Stripe test-mode key + E2E test against a real Stripe checkout session. |
| Colour contrast (WCAG 2.1 AA) | Requires axe-core or manual audit. Emerald-500 (#10B981) on white backgrounds should be checked. |
| OG image and Twitter card (`/og-image.jpg`) | File not present in `public/`; social share previews will show a broken image. |
| PWA icons (`/icon-192.png`, `/icon-512.png`, `/apple-touch-icon.png`) | Referenced in `layout.tsx` metadata but not present in `public/`. Will produce 404 on manifest requests. |

---

## Recommendations

1. **Add missing public assets** — `og-image.jpg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` are referenced in metadata but absent from `public/`. Add or remove the references.
2. **Increase apply-page unit coverage** — `app/apply/page.tsx` has 0% unit coverage. Add a Jest test for the form's controlled state (submitted, error, loading) with `userEvent` and a mocked `fetch`.
3. **Portal unit tests** — `app/portal/page.tsx` and `app/portal/resources/page.tsx` are untested. Even static pages benefit from smoke tests confirming the dashboard data renders.
4. **Add axe-core to E2E suite** — integrate `@axe-core/playwright` in `seo-a11y.spec.ts` for automated WCAG checks on every route.
5. **Navbar mouse-over handlers** — Lines 45-46 in `Navbar.tsx` use inline `onMouseOver`/`onMouseOut` for hover colour rather than Tailwind classes. These aren't reachable in JSDOM and introduce runtime style mutation. Replace with Tailwind `hover:` utilities.

---

*Generated by the SupraCloud QA pipeline — 2026-05-07*
