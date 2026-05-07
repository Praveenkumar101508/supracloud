# Accessibility Audit Report — supracloud.co.uk
**Date:** 2026-05-07
**Tool:** axe-core (WCAG 2.1 AA + best-practice)
**Scope:** 14 routes

## Summary

| Metric | Value |
|---|---|
| Routes audited | 14 |
| Total violations | 33 |
| Routes with critical violations | 2 |
| Routes with serious violations | 14 |
| Routes fully clean (zero violations) | 0 |

## Per-Route Results

| Route | Violations | Worst Impact | Passes |
|---|---|---|---|
| `/` | 1 | serious | 37 |
| `/about` | 1 | serious | 37 |
| `/contact` | 1 | serious | 37 |
| `/book` | 6 | critical | 40 |
| `/solutions/banking` | 5 | serious | 37 |
| `/solutions/retail` | 2 | critical | 40 |
| `/services/staffing` | 1 | serious | 37 |
| `/services/consultation` | 5 | serious | 37 |
| `/talent/programs` | 1 | serious | 37 |
| `/talent/partnerships` | 1 | serious | 37 |
| `/talent/internships` | 1 | serious | 37 |
| `/portal` | 4 | serious | 35 |
| `/privacy` | 2 | serious | 37 |
| `/terms` | 2 | serious | 37 |

## Violation Details

### `/`

#### SERIOUS — `color-contrast`
Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

Affected nodes (first 3 of 16):
```html
<a class="text-sm font-semibold px-4 py-2 rounded-md text-white transition-colors" style="background-color:#10B981" href="/book">Book a Call</a>
```
```html
<p class="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">What We Deliver</p>
```
```html
<a class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors" href="/solutions/banking">
```

### `/about`

#### SERIOUS — `color-contrast`
Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

Affected nodes (first 3 of 7):
```html
<a class="text-sm font-semibold px-4 py-2 rounded-md text-white transition-colors" style="background-color:#10B981" href="/book">Book a Call</a>
```
```html
<p class="text-slate-500 mb-2"># system: candidate_journey.py</p>
```
```html
<a class="inline-block px-8 py-3.5 rounded-md text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors" href="/book">Book Free Assessment Call</a>
```

### `/contact`

#### SERIOUS — `color-contrast`
Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

Affected nodes (first 3 of 7):
```html
<a class="text-sm font-semibold px-4 py-2 rounded-md text-white transition-colors" style="background-color:#10B981" href="/book">Book a Call</a>
```
```html
<div class="bg-white rounded-2xl p-12 border border-slate-200 shadow-sm text-center text-gray-400 text-sm">Select an inquiry type above to see the relevant form.</div>
```
```html
<div class="flex items-center gap-2 text-xs text-gray-400">
```

### `/book`

#### SERIOUS — `color-contrast`
Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

Affected nodes (first 3 of 5):
```html
<a class="btn-primary" href="/book">Book a Demo</a>
```
```html
<span class="text-slate-500">(select all that apply)</span>
```
```html
<p class="text-xs text-center text-slate-500">Confirmation email sent immediately · Calendar invite within 1 business day</p>
```

#### MODERATE — `heading-order`
Ensure the order of headings is semantically correct

Affected nodes (first 2 of 2):
```html
<h3 class="text-2xl font-extrabold text-white mb-1">Schedule a Technical Demo</h3>
```
```html
<h5>AI Solutions</h5>
```

#### CRITICAL — `label`
Ensure every form element has a label

Affected nodes (first 3 of 4):
```html
<input required="" class="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" name="name
```
```html
<input class="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" name="company">
```
```html
<input type="email" required="" class="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transitio
```

#### MODERATE — `landmark-main-is-top-level`
Ensure the main landmark is at top level

Affected nodes (first 1 of 1):
```html
<main>
```

#### MODERATE — `landmark-no-duplicate-main`
Ensure the document has at most one main landmark

Affected nodes (first 1 of 1):
```html
<main class="flex-1">
```

#### MODERATE — `landmark-unique`
Ensure landmarks are unique

Affected nodes (first 1 of 1):
```html
<main class="flex-1">
```

### `/solutions/banking`

#### SERIOUS — `color-contrast`
Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

Affected nodes (first 3 of 17):
```html
<a class="btn-primary" href="/book">Book a Demo</a>
```
```html
<a class="btn-primary-lg" href="/book">
```
```html
<div class="nd-eye">Orchestrator</div>
```

#### MODERATE — `heading-order`
Ensure the order of headings is semantically correct

Affected nodes (first 3 of 3):
```html
<h3>Level 1: Autonomous Response</h3>
```
```html
<h4>Playwright QA Reports</h4>
```
```html
<h5>AI Solutions</h5>
```

#### MODERATE — `landmark-main-is-top-level`
Ensure the main landmark is at top level

Affected nodes (first 1 of 1):
```html
<main>
```

#### MODERATE — `landmark-no-duplicate-main`
Ensure the document has at most one main landmark

Affected nodes (first 1 of 1):
```html
<main class="flex-1">
```

#### MODERATE — `landmark-unique`
Ensure landmarks are unique

Affected nodes (first 1 of 1):
```html
<main class="flex-1">
```

### `/solutions/retail`

#### SERIOUS — `color-contrast`
Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

Affected nodes (first 3 of 24):
```html
<a class="text-sm font-semibold px-4 py-2 rounded-md text-white transition-colors" style="background-color:#10B981" href="/book">Book a Call</a>
```
```html
<p class="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Agent Capabilities</p>
```
```html
<p class="text-xs text-emerald-600">Instant responses, zero wait time</p>
```

#### CRITICAL — `label`
Ensure every form element has a label

Affected nodes (first 3 of 4):
```html
<input required="" class="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" name="name
```
```html
<input class="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" name="company">
```
```html
<input type="email" required="" class="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transitio
```

### `/services/staffing`

#### SERIOUS — `color-contrast`
Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

Affected nodes (first 3 of 14):
```html
<a class="text-sm font-semibold px-4 py-2 rounded-md text-white transition-colors" style="background-color:#10B981" href="/book">Book a Call</a>
```
```html
<p class="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Engagement Models</p>
```
```html
<p class="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Technical Disciplines</p>
```

### `/services/consultation`

#### SERIOUS — `color-contrast`
Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

Affected nodes (first 3 of 5):
```html
<a class="btn-primary" href="/book">Book a Demo</a>
```
```html
<a class="btn-primary-lg" href="/book">
```
```html
<a class="btn-primary-lg" href="/book">
```

#### MODERATE — `heading-order`
Ensure the order of headings is semantically correct

Affected nodes (first 2 of 2):
```html
<h4>Discovery</h4>
```
```html
<h5>AI Solutions</h5>
```

#### MODERATE — `landmark-main-is-top-level`
Ensure the main landmark is at top level

Affected nodes (first 1 of 1):
```html
<main>
```

#### MODERATE — `landmark-no-duplicate-main`
Ensure the document has at most one main landmark

Affected nodes (first 1 of 1):
```html
<main class="flex-1">
```

#### MODERATE — `landmark-unique`
Ensure landmarks are unique

Affected nodes (first 1 of 1):
```html
<main class="flex-1">
```

### `/talent/programs`

#### SERIOUS — `color-contrast`
Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

Affected nodes (first 3 of 14):
```html
<a class="text-sm font-semibold px-4 py-2 rounded-md text-white transition-colors" style="background-color:#10B981" href="/book">Book a Call</a>
```
```html
<p class="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Training Tracks</p>
```
```html
<span class="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">12 weeks</span>
```

### `/talent/partnerships`

#### SERIOUS — `color-contrast`
Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

Affected nodes (first 3 of 10):
```html
<a class="text-sm font-semibold px-4 py-2 rounded-md text-white transition-colors" style="background-color:#10B981" href="/book">Book a Call</a>
```
```html
<div class="text-xl font-extrabold text-emerald-500 mb-2">01</div>
```
```html
<div class="text-xl font-extrabold text-emerald-500 mb-2">02</div>
```

### `/talent/internships`

#### SERIOUS — `color-contrast`
Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

Affected nodes (first 3 of 20):
```html
<a class="text-sm font-semibold px-4 py-2 rounded-md text-white transition-colors" style="background-color:#10B981" href="/book">Book a Call</a>
```
```html
<p class="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Open Roles</p>
```
```html
<span class="flex items-center gap-1">
```

### `/portal`

#### SERIOUS — `color-contrast`
Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

Affected nodes (first 3 of 18):
```html
<p class="text-xs font-semibold uppercase tracking-widest text-slate-500 px-2 mb-3">Member Portal</p>
```
```html
<span class="meta">Updated daily</span>
```
```html
<div class="t">↑ +4% vs last month</div>
```

#### MODERATE — `landmark-main-is-top-level`
Ensure the main landmark is at top level

Affected nodes (first 1 of 1):
```html
<main class="flex-1 p-6 sm:p-8">
```

#### MODERATE — `landmark-no-duplicate-main`
Ensure the document has at most one main landmark

Affected nodes (first 1 of 1):
```html
<main class="flex-1">
```

#### MODERATE — `landmark-unique`
Ensure landmarks are unique

Affected nodes (first 1 of 1):
```html
<main class="flex-1">
```

### `/privacy`

#### SERIOUS — `color-contrast`
Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

Affected nodes (first 3 of 7):
```html
<a class="text-sm font-semibold px-4 py-2 rounded-md text-white transition-colors" style="background-color:#10B981" href="/book">Book a Call</a>
```
```html
<p class="text-sm text-slate-400 mb-10">Last updated: April 2026</p>
```
```html
<a href="mailto:rk@supracloud.co.uk" class="text-emerald-600 hover:underline">rk@supracloud.co.uk</a>
```

#### SERIOUS — `link-in-text-block`
Ensure links are distinguished from surrounding text in a way that does not rely on color

Affected nodes (first 1 of 1):
```html
<a href="mailto:rk@supracloud.co.uk" class="text-emerald-600 hover:underline">rk@supracloud.co.uk</a>
```

### `/terms`

#### SERIOUS — `color-contrast`
Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

Affected nodes (first 3 of 7):
```html
<a class="text-sm font-semibold px-4 py-2 rounded-md text-white transition-colors" style="background-color:#10B981" href="/book">Book a Call</a>
```
```html
<p class="text-sm text-slate-400 mb-10">Last updated: April 2026</p>
```
```html
<a href="mailto:rk@supracloud.co.uk" class="text-emerald-600 hover:underline">rk@supracloud.co.uk</a>
```

#### SERIOUS — `link-in-text-block`
Ensure links are distinguished from surrounding text in a way that does not rely on color

Affected nodes (first 1 of 1):
```html
<a href="mailto:rk@supracloud.co.uk" class="text-emerald-600 hover:underline">rk@supracloud.co.uk</a>
```

---
*Generated 2026-05-07T21:53:54.922Z*
