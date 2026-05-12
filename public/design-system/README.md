# SupraCloud Design System

> **Premium UK-Based IT Solutions & AI Development Firm.**
> Autonomous AI Agents for Banking & Retail · Enterprise IT Consultation & Staffing · Talent Pipeline.

This folder is the canonical reference for designing anything that looks, sounds, or feels like SupraCloud — marketing pages, slide decks, the Client Portal, internal tooling, pitch material, sales collateral.

---

## Company Snapshot

**SupraCloud Ltd** is a UK-based enterprise AI & IT solutions firm. The aesthetic is **"Dark Mode Enterprise"** — high-tech, clean, data-driven, engineer-led. Not consultant-glossy, not startup-playful. Production-grade.

**Three pillars of capability:**

1. **AI Solutions** — Autonomous agents for two verticals
   - **Banking AI** — L1/L2 support automation, FCA/COBS-aware, RAG + LangGraph stack
   - **Supermarket AI / Retail AI** — Order, inventory, customer support agents
2. **Enterprise Services**
   - **IT Staffing & Outsourcing** — Vetted contract & permanent engineers
   - **IT Consultation** — Technology advisory and transformation
3. **Talent Hub**
   - **Internships** — Paid graduate technical placements
   - **Training** — Structured programmes for Data, Cloud, AI

**Interactive surfaces:**
- Custom **booking engine** for industry-specific demos (Banking / Retail).
- **Client Portal** — automated QA reports (ProdReady Labs, Playwright), delivery tracker, live agent metrics.

**Voice:** Professional, technical, efficient. "Solutions Engineering" and "Operational Excellence" — never "coaching", never "journey".

---

## Sources Used

- **Codebase:** `Praveenkumar101508/supracloud` (Next.js 16, React 19, Tailwind 4, Lucide icons, Inter font)
  - `app/page.tsx` — homepage with terminal hero, industry matrix, three pillars
  - `app/globals.css` — color tokens, glassmorphism, animations
  - `app/components/Logo.tsx` — geometric wordmark + cyan→emerald gradient bars
  - `app/components/Navbar.tsx` — multi-level dropdown nav (Solutions / Services / Talent)
  - `app/portal/page.tsx` — Client Portal dashboard
  - `app/book/page.tsx` — booking engine
  - `app/solutions/banking/page.tsx`, `app/solutions/retail/page.tsx` — vertical landing pages
- **Domain:** `supracloud.co.uk`
- **Contact:** rk@supracloud.co.uk · +44 7776 456694

---

## CONTENT FUNDAMENTALS

### Voice & Tone
**Professional · Technical · Efficient.** Engineer-led, not consultant-led. The reader is a CTO, head of operations, or procurement lead at a bank or retailer — they want measurable outcomes, not jargon.

- **First person plural** ("We design, build and deploy…") — speaks for the team.
- **Direct second person** ("You get L1 deflection rates, cost-per-query metrics…") — never patronising.
- **No coaching language.** Avoid "journey", "empower", "unlock", "transform your business". Use "Solutions Engineering", "Operational Excellence", "deployment", "scope", "deliver".
- **Numbers up front.** "63% reduction in L1 call volume", "< 0.5s response time", "99.97% uptime SLA". Specifics over adjectives.
- **British English.** "specialise", "optimise", "programme" (not "program" — except for code/agent context where US English is fine).
- **No emoji** in body copy. Lucide line icons or unicode arrows (→, ↑, ✓) only.
- **No exclamation marks** outside of error/success microcopy ("Request received!").

### Casing
- **Sentence case** for body copy and most headings.
- **Title Case** for navigation labels and section eyebrows ("What We Deliver", "Industry Solution Matrix").
- **UPPERCASE eyebrows** with wide tracking (`tracking-widest`, ~0.15em) for section labels — this is a signature treatment. Always emerald, always small (`text-xs`, ~12px).

### Examples (lifted verbatim from production copy)
- Eyebrow: `Enterprise AI · UK-Based · Production-Grade`
- H1: `Autonomous AI Agents for Global Enterprise`
- Sub: `We design, build and deploy production-grade AI agents for banking and retail — slashing support costs and handling L1/L2 queries at scale, 24/7.`
- CTA primary: `Book a Discovery Call →`
- CTA secondary: `Submit a Brief`
- Trust signals: `Banking & Retail Specialists · Engineer-Led Delivery · UK-Based Team`
- Stat callout: `63%` / `reduction in L1 call volume`
- Founder positioning: `Engineer-Led. Production-Proven. Enterprise-Focused.`
- Microcopy on hold: `Sending…` / `Request received!` / `We'll confirm your slot within 1 business day`

### Terminal voice (a recurring motif)
The homepage features a live-typing terminal. Lines are written as shell commands or pipe output — lowercase, monospaced, prefixed with `$`:
```
$ initialising SupraCloud enterprise runtime...
$ deploying banking-ai-agent v3.2.1 → production
$ L1_deflection_rate: 63% ↑ | SLA: 99.97%
$ all systems operational ✓
```

---

## VISUAL FOUNDATIONS

### Color
A **two-mode palette**: dark navy hero sections (marketing wow-moments) alternating with light slate body sections (high-density information).

- **Surface dark:** `#0A192F` (primary navy hero), `#071527` (deeper navy for stat bars / final CTAs), `#0d2137` (dropdown menus).
- **Surface light:** `#F8FAFC` (slate-50 page bg), `#FFFFFF` (cards on light), `#F1F5F9` (slate-100 inset).
- **Primary action:** `#10B981` (emerald-500) — buttons, accent strokes, gradient base, success.
- **Accent gradient:** `#10B981 → #34D399` (gradient-text), `#06B6D4 → #10B981` (logo bars).
- **Cyan accent:** `#22D3EE` (the "Cloud" half of the wordmark), `#06B6D4` (logo node). Reserved — appears on the brand mark, not in chrome.
- **Text dark surface:** `#FFFFFF` (headings), `#94A3B8` (slate-400 body), `#64748B` (slate-500 captions).
- **Text light surface:** `#111827` (gray-900 headings), `#6B7280` (gray-500 body), `#9CA3AF` (gray-400 captions).
- **Borders dark:** `rgba(255,255,255,0.08)` (glass), `#1E293B` (slate-800).
- **Borders light:** `#F1F5F9` (slate-100), `#E2E8F0` (slate-200).
- **Semantic:** success = emerald-500, info = blue-400 `#60A5FA`, error = red-500 `#EF4444`.

### Typography
- **Single family: Inter** (variable, weights 400/500/600/700/800). Loaded via `next/font/google`.
- Tight tracking (`tracking-tight`) on display, `tracking-widest` on uppercase eyebrows.
- Generous line-height on body (`leading-relaxed` ≈ 1.625).
- Display sizes are heavy: `font-extrabold` (800) for hero H1 + stat numbers, `font-bold` (700) for section H2, `font-semibold` (600) for nav and labels.

Type scale (clamped, fluid):
- Display H1 — 48–60px, ext-bold, leading-[1.1]
- Section H2 — 30–36px, bold
- Card H3 — 18–20px, bold
- Body — 14–16px, regular
- Caption — 12–13px, regular
- Eyebrow — 11–12px, semibold, uppercase, tracking-widest

### Spacing & Layout
- **Tailwind scale:** 4px base. Common values: 4, 8, 12, 16, 20, 24, 32, 48, 64.
- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (1280px max). Narrower forms use `max-w-3xl`, `max-w-4xl`.
- **Section vertical rhythm:** `py-20` to `py-24` between sections on marketing pages. Tight `py-4` for stat bars.
- **Grid gaps:** `gap-6`, `gap-8`, `gap-16` for major splits.

### Backgrounds
- **Grid overlay** — Faint white grid (1px lines, 48px squares, opacity 3.5%) layered over every dark hero. This is the single most distinctive background motif. Code:
  ```css
  background-image:
    linear-gradient(#fff 1px, transparent 1px),
    linear-gradient(90deg, #fff 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.035;
  ```
- **Radial emerald glow** — Soft 8% opacity emerald ellipse glowing from the top-center (`radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.08), transparent 70%)`).
- **No photographic imagery** in the codebase. No illustrations. Visuals are produced through type, gradient, geometric mark, terminal UI, and data.
- **No full-bleed photos.** The site is intentionally device-and-data led.

### Glassmorphism
A core motif. Used inside dark sections for content cards (industry matrix panels, etc).
```css
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### Borders & Radii
- **Radius scale:** 6px (sm — pills, badges), 8px (md — buttons, inputs), 12px (lg — small cards), 16px (xl — content cards), 24px (2xl — large feature cards).
- **Pill radius** (`rounded-full`) for eyebrow chips, status badges, tag chips.
- Borders are 1px, used liberally — every card has one. On dark: white at 8%. On light: slate-100/slate-200.

### Shadows & Elevation
- **Cards on light:** `shadow-sm` (0 1px 2px rgba(0,0,0,0.05)) is the default. `shadow-md` on hover.
- **Cards on dark:** No shadow — borders + glass do the work. Dropdowns use `0 24px 48px rgba(0,0,0,0.4)`.
- **Hero terminal:** `shadow-2xl` (0 25px 50px -12px rgba(0,0,0,0.25)).
- **Hover-lift utility:** `transform: translateY(-3px)` + soft shadow on hover. Apply to interactive cards.
- **Emerald glow:** `box-shadow: 0 0 0 1px #10B981, 0 4px 20px rgba(16,185,129,0.15)` for highlighted/focused panels.

### Animation
- **Tone:** Subtle, snappy, professional. Never bouncy. Ease defaults.
- **Fade-up entrance** — Sections fade in + 24px upward translate, 600ms ease, staggered 100/250/400/550ms (`.animate-fade-up`, `.animate-fade-up-1` … `-4`).
- **Fade-in** — 800ms ease for non-staggered elements (the terminal).
- **Matrix-in** — 300ms fade + 10px translate when toggling industry tabs.
- **Terminal cursor blink** — `step-end 1s infinite`.
- **Transitions** — `transition-colors` 150ms is the default for hover. `transition-all` 200ms for layout-affecting hovers.
- No spring physics, no parallax, no scroll-jacking.

### Hover & Press states
- **Buttons (primary):** Background `#10B981 → #059669` on hover. No shadow change. No scale.
- **Buttons (ghost/outline):** Border color shift `slate-600 → emerald-500` or `slate-600 → slate-400`. Text color `slate-300 → white`.
- **Nav links:** Text color `slate-300 → white`. No underline.
- **Cards (hover-lift):** translateY(-3px) + soft shadow. 200ms ease.
- **Press:** No shrink, no color flip beyond the hover state. Browser default focus rings replaced with emerald-tinted focus ring on inputs.

### Iconography
**Lucide React only.** See ICONOGRAPHY section below.

### Composition rules
- **Sticky navbar** with `z-50`, dark surface, 64px tall.
- **Eyebrow → H2 → sub-paragraph → grid** is the canonical section header pattern. Eyebrow is always uppercase emerald.
- Stat bars are dense single-line ribbons between sections, dark surface, emerald check-glyphs.
- Forms live on white cards with slate-200 borders, 32px (`p-8`) padding, 16px gap fields, emerald focus ring.
- Footer is dark navy, 4-column at `lg`, 1-column at `sm`. Logo + contact in the wide column.
- Use of transparency + blur is **only on the glassmorphism cards** and dropdown shadows. Don't blur full sections.

---

## ICONOGRAPHY

**System:** [**Lucide**](https://lucide.dev) — used via `lucide-react@1.7.0` in production. Single source of truth. No custom SVG illustrations, no emoji, no Font Awesome, no Heroicons.

- **Stroke weight:** 1.5–2px (Lucide default).
- **Sizes:** 11–16px in chrome (eyebrow chips, footer, body), 18–22px in card icon-bins, 28px+ in pillar icons.
- **Color:** Almost always `text-emerald-500` (`#10B981`) when sitting on a card icon-bin, or `text-slate-400` for navigation chrome on dark. Black/gray-700 only when explicitly inactive.
- **Icon-bin pattern:** A 36–48px rounded square (`rounded-xl`) bg `emerald-50` with `border-emerald-100` containing the icon — used to anchor card titles. On dark, the bin becomes `bg-emerald-500/10` `border-emerald-500/20`.

**Reach for these specific icons:**
| Use | Icon |
|---|---|
| AI agents | `Bot` |
| Banking | `Building2` |
| Retail | `ShoppingCart` |
| IT Staffing | `Briefcase` |
| Consultation | `Lightbulb` |
| Training | `BookOpen` |
| Internships | `GraduationCap` |
| Partnerships | `Handshake` |
| Compliance / Trust | `Shield` |
| Performance / ROI | `TrendingUp`, `BarChart2` |
| People / Team | `Users` |
| Speed / Power | `Zap` |
| Confirmations | `CheckCircle` |
| Caveats / Info | `AlertCircle` |
| Time / SLA | `Clock` |
| Reports / Docs | `FileText` |
| Architecture / Data | `Database`, `Cpu` |
| Email / Phone | `Mail`, `MessageCircle`, `PhoneCall` |
| Nav / arrows | `ChevronDown`, `ChevronRight`, `ArrowRight` |
| Mobile menu | `Menu`, `X` |

**Loading in HTML mocks:** `<script src="https://unpkg.com/lucide@latest"></script>` then `<i data-lucide="bot"></i>` and `lucide.createIcons()`. Or inline SVG using the `lucide-static` SVGs from `https://unpkg.com/lucide-static@latest/icons/<name>.svg`.

**Unicode glyphs OK** in tightly controlled places: `→` (rightward arrow in CTA), `↑ ↓` (trend deltas in metrics), `✓` (success ribbons), `·` (dot separators in trust strips). Never emoji.

**Logo / brand mark.** Geometric three-bar staircase rising from bottom-left to top-right with two transition nodes. Cyan-to-emerald gradient. Lives at `assets/logo-mark.svg` and `assets/logo-full-light.svg` (light wordmark for dark backgrounds) / `assets/logo-full-dark.svg` (navy wordmark for light backgrounds).

---

## INDEX (manifest)

```
SupraCloud Design System/
├── README.md                  ← you are here
├── SKILL.md                   ← agent skill manifest (Claude Code compatible)
├── colors_and_type.css        ← CSS variables: colors, typography, semantic styles
├── assets/                    ← logos, social cards, favicons
│   ├── logo-mark.svg
│   ├── logo-full-light.svg
│   ├── logo-full-dark.svg
│   └── favicon.svg
├── fonts/                     ← Inter Variable (loaded via Google Fonts CDN — no local files needed)
├── preview/                   ← design-system tab cards (one HTML per concept)
│   ├── Colors-Surface.html
│   ├── Colors-Brand.html
│   ├── Colors-Semantic.html
│   ├── Type-Display.html
│   ├── Type-Body.html
│   ├── Type-Eyebrow.html
│   ├── Spacing-Radii.html
│   ├── Spacing-Shadows.html
│   ├── Components-Buttons.html
│   ├── Components-Inputs.html
│   ├── Components-Badges.html
│   ├── Components-Cards.html
│   ├── Components-StatTile.html
│   ├── Components-Terminal.html
│   ├── Components-IconBin.html
│   ├── Brand-Logo.html
│   └── Brand-GridGlow.html
└── ui_kits/
    ├── marketing/             ← public-facing site recreation
    │   ├── README.md
    │   ├── index.html
    │   └── components/        ← jsx components
    └── portal/                ← Client Portal recreation
        ├── README.md
        ├── index.html
        └── components/
```

---

## Caveats / Substitutions

- **Inter** is loaded from **Google Fonts CDN** rather than bundled locally — same family used in production via `next/font`. If you need offline assets, drop the variable `.woff2` into `fonts/` and switch to `@font-face`.
- The codebase ships **no real raster imagery** (no team photos, no product screenshots, no OG image). The recreated design system reflects this — visuals are typographic + geometric. If you need photography, ask the user for source material.
