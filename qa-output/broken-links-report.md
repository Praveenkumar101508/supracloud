# Broken Link Report — supracloud.co.uk
**Date:** 2026-05-08

## Summary

| | Count |
|---|---|
| Internal routes checked | 18 |
| External links checked | 1 |
| mailto links (not HTTP-checked) | 1 |
| Broken / unreachable | 3 |

## Internal Routes

| Route | Status | Result |
|---|---|---|
| `/` | 200 | OK |
| `/about` | 200 | OK |
| `/contact` | 200 | OK |
| `/book` | 200 | OK |
| `/solutions/banking` | 200 | OK |
| `/solutions/retail` | 200 | OK |
| `/services/staffing` | 200 | OK |
| `/services/consultation` | 200 | OK |
| `/talent/programs` | 200 | OK |
| `/talent/partnerships` | 200 | OK |
| `/talent/internships` | 200 | OK |
| `/portal` | 200 | OK |
| `/portal/resources` | 200 | OK |
| `/privacy` | 200 | OK |
| `/terms` | 200 | OK |
| `/portal/schedule` | 404 | BROKEN |
| `/portal/projects` | 404 | BROKEN |
| `/portal/mock-interviews` | 404 | BROKEN |

## External Links

| URL | Status | Result |
|---|---|---|
| `https://wa.me/447776456694` | 200 | OK |
| `mailto:rk@supracloud.co.uk` | N/A | OK — mailto, not HTTP-checkable |

## Broken Links Detail

### /portal/schedule — 404
Linked from the portal sidebar in `app/portal/layout.tsx`. No corresponding page file exists in `app/portal/schedule/`. When a user navigates to any portal page, Next.js's router prefetches this link and logs a console error:
`Failed to load resource: the server responded with a status of 404 () @ https://supracloud.co.uk/portal/schedule?_rsc=...`

### /portal/projects — 404
Linked from the portal sidebar. No corresponding page file exists in `app/portal/projects/`. Same prefetch error behaviour as above.

### /portal/mock-interviews — 404
Linked from the portal sidebar. No corresponding page file exists in `app/portal/mock-interviews/`. Same prefetch error behaviour as above.

**Impact:** These broken links are only reachable from within the portal area, not from the public marketing site. A regular website visitor is unaffected. However, any enterprise client using the portal will immediately encounter broken navigation, which undermines the portal's credibility as a client delivery dashboard.

**Fix options:**
1. Create stub pages at these routes (simplest — even a "Coming soon" page)
2. Remove the links from the portal sidebar until the pages are implemented
3. Add `aria-disabled` and pointer-events styling to indicate these are planned but not yet live

---
*Generated 2026-05-08 | Tested against https://supracloud.co.uk (production)*
