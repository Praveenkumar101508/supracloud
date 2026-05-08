# Accessibility Audit Report — supracloud.co.uk
**Date:** 2026-05-08
**Tool:** DOM inspection via Playwright browser (WCAG 2.1 AA criteria)
**Scope:** 14 routes

## Summary

| Metric | Value |
|---|---|
| Routes audited | 14 |
| Routes with CRITICAL violations | 1 (/contact) |
| Routes with MEDIUM violations | 0 |
| Routes fully clean (zero violations) | 13 |
| Improvement vs previous run | /book CRITICAL label violations fixed |

## Per-Route Results

| Route | Violations | Worst Impact | Notes |
|---|---|---|---|
| `/` | 0 | — | Clean |
| `/about` | 0 | — | Clean |
| `/contact` | 6 | CRITICAL | All form inputs missing id/label association |
| `/book` | 0 | — | FIXED: all inputs now have id + label[for] |
| `/solutions/banking` | 0 | — | Clean |
| `/solutions/retail` | 0 | — | Clean |
| `/services/staffing` | 0 | — | Clean |
| `/services/consultation` | 0 | — | Clean |
| `/talent/programs` | 0 | — | Clean |
| `/talent/partnerships` | 0 | — | Clean |
| `/talent/internships` | 0 | — | Clean |
| `/portal` | 0 | INFO | 3 nav elements by design (main + sidebar + dashboard nav) |
| `/privacy` | 0 | — | Clean |
| `/terms` | 0 | — | Clean |

## Violation Details

### `/contact` — CRITICAL: Form inputs missing programmatic label association

After the user selects an inquiry type and the `ContactForm` component renders, all 6 inputs lack `id` attributes. Their `<label>` elements have no `htmlFor` binding and are only visually adjacent.

**Affected inputs:** name (text), company (text), email (email), phone (tel), service (select), message (textarea)

**WCAG criteria violated:**
- SC 1.3.1 Info and Relationships (Level A)
- SC 4.1.2 Name, Role, Value (Level AA)

**Impact:** Screen reader users hear input fields announced with no label context. Voice control users cannot activate fields by their visible label names. This affects all three inquiry types (Enterprise Client, Partnership, Talent).

**Fix:** Add `id` attributes to each input and matching `htmlFor` on each `<label>` in `app/contact/page.tsx`. The same pattern was already successfully applied to `app/components/BookingSystem.tsx` for the `/book` page:

```tsx
// Before (broken):
<label className="...">Your Name *</label>
<input name="name" required ... />

// After (correct):
<label htmlFor="contact-name" className="...">Your Name *</label>
<input id="contact-name" name="name" required ... />
```

Suggested id values: `contact-name`, `contact-company`, `contact-email`, `contact-phone`, `contact-service`, `contact-message`.

## Improvements vs Previous Run

| Issue | Previous Run | This Run |
|---|---|---|
| /book — Full Name input (no id/label) | CRITICAL | FIXED |
| /book — Company input (no id/label) | CRITICAL | FIXED |
| /book — Email input (no id/label) | CRITICAL | FIXED |
| /book — Phone input (no id/label) | CRITICAL | FIXED |
| /book — Message textarea (no id/label) | CRITICAL | FIXED |
| /contact — 6 inputs (no id/label) | Not previously audited | CRITICAL — newly identified |
| Double navbar on marketing pages | CRITICAL | FIXED |
| ProdReady text rendered in DOM | Bug | FIXED |

## General Accessibility Notes

- All images across audited pages have `alt` attributes or are decorative with `aria-hidden`
- All interactive buttons have either visible text content or an `aria-label` attribute
- Cookie consent banner (`CookieBanner`) is present on all pages
- Zero JavaScript console errors on content pages (only portal prefetch 404s)
- Navbar is keyboard-navigable (all links and dropdown buttons reachable via Tab)
- The portal page renders 3 `<nav>` elements by design — the first is always the main Navbar with "Book a Call"

---
*Generated 2026-05-08 | Tested against https://supracloud.co.uk (production)*
