# SupraCloud — Design System v2 Drop

This branch (`design-system-v2`) adds two parallel things to your repo:

## 1. Static design-system drop-in — `public/design-system/`

Drop-in folder of plain HTML/CSS/SVG. Lives entirely in `public/`, doesn't touch your Next.js app. After `next build`, browsable live at:

- `/design-system/` — index of everything
- `/design-system/ui_kits/marketing/index.html` — full marketing site preview
- `/design-system/ui_kits/marketing/banking.html`
- `/design-system/ui_kits/marketing/supermarket.html`
- `/design-system/ui_kits/marketing/staffing.html`
- `/design-system/ui_kits/marketing/consultation.html`
- `/design-system/ui_kits/marketing/internships.html`
- `/design-system/ui_kits/marketing/training.html`
- `/design-system/ui_kits/marketing/booking.html`
- `/design-system/ui_kits/marketing/portal.html`
- `/design-system/ui_kits/portal/index.html`
- `/design-system/preview/*.html` — token + component cards (colors, type, components, brand)
- `/design-system/README.md` — full system documentation
- `/design-system/colors_and_type.css` — design tokens

Use this URL when sharing the design system with stakeholders before you've finished migrating to Next.js routes.

## 2. Next.js routes — `app/...`

Real site pages, replacing / extending your existing routes. Each page is a thin React shell that wraps the same vanilla HTML body inside a shared `<MarketingLayout>` (nav + footer as React components):

| URL | File |
|---|---|
| `/` | `app/page.tsx` *(left untouched — your existing homepage)* |
| `/solutions/banking` | `app/solutions/banking/page.tsx` |
| `/solutions/supermarket` | `app/solutions/supermarket/page.tsx` |
| `/services/it-staffing` | `app/services/it-staffing/page.tsx` |
| `/services/consultation` | `app/services/consultation/page.tsx` |
| `/careers/internships` | `app/careers/internships/page.tsx` |
| `/careers/training` | `app/careers/training/page.tsx` |
| `/book` | `app/book/page.tsx` *(overwritten — new booking flow)* |
| `/portal` | `app/portal/page.tsx` *(overwritten — new portal)* |

Shared infra under `app/components/marketing/`:
- `MarketingLayout.tsx` — wraps page in nav + footer
- `MarketingNav.tsx` — sticky multi-level dropdown nav
- `MarketingFooter.tsx` — five-column footer
- `kit.css` — shared styles (imported by `MarketingLayout`)
- `tokens.css` — design tokens (imported by `app/layout.tsx`)
- `LucideInit.tsx` — initialises Lucide icons after page render
- `BookingForm.tsx` — interactive 4-step booking flow

## Setup

After unzipping into your repo on the `design-system-v2` branch:

```bash
git checkout -b design-system-v2
# unzip files into repo root
git add .
git commit -m "Add SupraCloud design system v2 — Banking / Supermarket / Staffing / Consultation / Internships / Training pages, Booking flow, Client Portal redesign"
git push -u origin design-system-v2
```

Then open the PR on GitHub. Vercel will auto-build a **preview deployment** from the branch — that's the URL you share for review before merging to `main`.

## Visuals

The design uses **electric blue (#3B82F6)** as the primary brand color, matching your new logo. Body type is Inter (from `next/font/google`), display type uses the same stack. All tokens live in `app/components/marketing/tokens.css` so you can adjust the system in one place.

## Caveats

- I left `app/page.tsx` (homepage) untouched — when you're ready, copy `public/design-system/ui_kits/marketing/index.html`'s body into a new homepage route.
- The Booking flow is interactive (four steps, industry toggle, slot picker) but does **not** post to a backend yet — wire `<form>` to your existing `/api/apply` route or to Resend.
- The Client Portal redesign is mock data — wire it to your existing `/api/portal` reads.
