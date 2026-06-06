# HANDOFF.md — Design Handoff Package
**Version**: 1.0 | **Date**: 2026-06-05 | **Prepared by**: JART UI Design Agent

---

## Overview

This document is the master handoff package for the JART Software Solutions site redesign. All spec files are saved to `.github/design-specs/`. This package governs the full transition from the current dark-mode, multi-color, Inter/Syne-based site to the owner-specified light-mode, 60/30/10 brand system, Public Sans typography.

**Scope**: Pure HTML/CSS/JS static site hosted on GitHub Pages. No build tools. No frameworks. Direct file edits only.

**Constraint**: All existing copy — every headline, paragraph, list item, FAQ answer, section tag, and footer tagline — must be preserved verbatim. Zero content changes. Design implementation only.

---

## Spec Files

| File | Covers | Summary |
|------|--------|---------|
| [index.spec.md](index.spec.md) | `index.html` | Full redesign spec for the home page — nav, hero, about, services, AO AI, why JART, new social proof section, process, service area, FAQ, contact, footer. Includes complete new CSS token set, typography scale, button system, trust signal placement map, CTA hierarchy table, animation specs, accessibility notes, and 14 implementation directives. |
| [legal-pages.spec.md](legal-pages.spec.md) | `cookie-policy.html`, `gdpr-statement.html`, `privacy-policy.html`, `security-policy.html`, `terms-of-service.html` | Layout and readability improvements to all 5 legal pages. Covers sticky TOC, back-to-top button, scrollspy, table accessibility, footer addition, and full reskinning to the new design system. Zero content changes. |

---

## Implementation Order (Highest-Impact First)

Execute in this sequence. Each step can be shipped independently.

### Phase 1 — Foundation (Blocks everything else — do this first)

**Step 1.1 — CSS Custom Property Overhaul** (`css/styles.css`)
- Delete the entire current `:root` block
- Replace with the new token set from `index.spec.md` > "CSS Custom Properties"
- This single step controls ~80% of the visual change across all pages
- **Risk**: Medium — test all pages after this step before proceeding
- **Test**: Verify `--color-base`, `--color-structure`, `--color-accent` render correctly in Chrome and Firefox

**Step 1.2 — Font Swap (all 6 HTML files + CSS)**
- Replace Google Fonts `<link>` in all 6 HTML files: `index.html`, `cookie-policy.html`, `gdpr-statement.html`, `privacy-policy.html`, `security-policy.html`, `terms-of-service.html`
- New link: `https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap`
- In `css/styles.css`: replace `font-family: 'Inter', system-ui` with `font-family: 'Public Sans', system-ui` and `font-family: 'Syne', sans-serif` with `font-family: 'Public Sans', sans-serif`

**Step 1.3 — Logo Placeholder (all 6 HTML files)**
- Replace the laptop SVG logo in all 6 navs with a temporary text-only logo: `<span class="nav__logo-text">JART</span>` styled in Public Sans 800
- This is a placeholder until the owner delivers the final brand SVG assets (see "Content Owner Must Provide" below)

---

### Phase 2 — Home Page Core (index.html — highest conversion impact)

**Step 2.1 — Nav redesign** (`index.html`, `css/styles.css`)
- Background: `--color-structure` always (remove `is-scrolled` glass-morphism)
- Apply button style to "Get Started" nav link
- Update active state to `--color-accent` underline

**Step 2.2 — Hero section** (`index.html`, `css/styles.css`)
- Background: `--color-base`
- Replace `.gradient-text` with `.text-emphasis` (italic, no color change)
- Restyle stats strip, badge, floating badges for light mode
- Terminal widget: restyle shadow and frame border for light mode
- Add trusted-by placeholder strip (see "Content Owner Must Provide")

**Step 2.3 — About, Services, Why JART sections**
- Remove all `.service-card--cyan`, `.service-card--gold` tinted icon backgrounds
- Replace with unified `rgba(33,33,33,0.05)` icon square
- About cards: remove colored left borders, replace with `--color-structure`
- Compliance badges: reskin to structure-based palette

**Step 2.4 — The AO AI section**
- Background: `--color-structure`
- Text: `--text-on-dark`
- AO AI stat values: `--color-accent` (approved exception — see index.spec.md)
- "The AO AI Platform" in H2: `--color-accent` as text (approved exception — dark section only)

**Step 2.5 — New Social Proof section (placeholder)**
- Insert `<section id="social-proof">` between `#why-us` and `#process`
- 3 metric placeholder boxes + 3 testimonial card placeholders
- Full spec in `index.spec.md` > "NEW SECTION: Client Results / Social Proof"
- Mark all placeholders with `<!-- PLACEHOLDER: Owner to provide -->`

**Step 2.6 — Process section horizontal layout**
- Convert `.process__steps` from flex-column to CSS grid (5 equal columns)
- Add horizontal connector lines via CSS pseudo-elements
- Responsive collapse as specified

**Step 2.7 — Service Area, FAQ, Contact sections**
- Service Area Nationwide card → `--color-structure` dark panel (existing structure preserved)
- FAQ expand icon active color → `--color-accent`
- Contact form: update focus ring to `rgba(51,231,255,0.25)`
- Contact form submit → `--color-accent` bg button

**Step 2.8 — Footer**
- Background: `--color-structure`
- All text → `--text-on-dark` with appropriate opacity levels
- Implement wordmark logo placeholder

---

### Phase 3 — Legal Pages

**Step 3.1 — Shared CSS updates** (`css/styles.css`)
- Restyle all `.legal-*` classes per `legal-pages.spec.md`
- Add sticky TOC positioning
- Add scroll-margin-top to legal heading anchors

**Step 3.2 — Footer addition to legal pages**
- Copy footer block from `index.html` into all 5 legal pages
- Update internal anchor hrefs to `index.html#section` format

**Step 3.3 — Back-to-top button**
- Add HTML element to all 5 legal pages
- Add JS in `main.js` (legal page detection + scroll listener)

**Step 3.4 — TOC scrollspy**
- Add `scrollspyLegal()` function to `main.js`
- IntersectionObserver on `h2[id]` within `.legal-content`
- Toggle `.is-active` on `.legal-toc__link`

**Step 3.5 — Mobile TOC accordion**
- Legal TOC collapses to accordion at ≤ 900px
- Toggle via JS + `max-height` CSS transition

**Step 3.6 — Table accessibility**
- Add `scope="col"` to all `<th>` in legal tables
- Add `<caption class="sr-only">` to each table

---

### Phase 4 — Final Polish (after owner delivers assets)

**Step 4.1 — Logo SVG replacement** (requires owner delivery)
- Replace nav icon mark placeholder in all 6 HTML files
- Replace footer wordmark placeholder in `index.html`
- See "Content Owner Must Provide" below

**Step 4.2 — Social proof section population** (requires owner delivery)
- Replace metric placeholders with real data
- Replace testimonial placeholders with real quotes
- Remove all `<!-- PLACEHOLDER -->` comments

**Step 4.3 — Trusted-by strip** (requires owner delivery)
- Replace placeholder boxes with real client logo `<img>` elements
- Apply grayscale filter + full-color on hover

**Step 4.4 — Cross-browser QA**
- Test in Chrome, Firefox, Safari (macOS + iOS), Edge
- Verify `Public Sans` loads via Google Fonts CDN
- Verify all `--color-accent` buttons are accessible
- Verify TOC scrollspy works on all 5 legal pages
- Verify contact form still submits correctly to FormSubmit.co

**Step 4.5 — Performance**
- Verify Google Fonts `display=swap` is set (already in spec)
- Confirm all SVGs are inlined or optimized
- No new JS libraries to be added — pure JS only

---

## Content Owner Must Provide

The following content items are **required before the site can be considered complete**. Sections are built as placeholders and marked with HTML comments until owner delivers these assets.

| # | Asset | Used in | Priority | Notes |
|---|-------|---------|----------|-------|
| 1 | **Final brand logo SVG — Icon mark** | All 6 HTML navs | HIGH | Circle filled `#33E7FF`, "Jart" in Public Sans 800 `#212121` inside, cursor arrow at top-right circle break. Owner must produce or approve final SVG. Code Agent uses text placeholder until then. |
| 2 | **Final brand logo SVG — Wordmark** | `index.html` footer | HIGH | "JART" in Public Sans 800 + `#33E7FF` horizontal arrow underline extending right + "Software Solutions" in Public Sans 600 below. |
| 3 | **3× real client testimonials** | Social proof section | HIGH | Each needs: verbatim quote, client name, client role/title, client company name. Must have written permission to publish. |
| 4 | **3× client results metrics** | Social proof section | HIGH | Real, defensible numbers (e.g., "X% efficiency improvement", "$Y cost savings"). Must be from actual engagements. Cannot be estimated or invented. |
| 5 | **Client/partner logos (5–8 logos)** | Trusted-by hero strip | MEDIUM | Logos of real clients or technology partners. Owner must have permission to display each. Provide SVG or PNG 2× minimum. |
| 6 | **OG image** | `<meta property="og:image">` | MEDIUM | All pages reference `https://jartsoftwaresolutions.com/assets/og-image.png`. This file needs to exist. Recommend 1200×630px, light-mode branded. |
| 7 | **Favicon SVG** | All 6 HTML pages | LOW | `favicon.svg` referenced but not inspected in this audit. Verify it matches the new brand icon mark. |

---

## Design System Delta — What Changes from Current CSS

This section documents every material change from the current `css/styles.css` for complete transparency.

### Token Changes (`:root` block)

| Current Token | Current Value | New Token | New Value | Reason |
|---------------|--------------|-----------|-----------|--------|
| `--bg-primary` | `#030b18` | `--color-base` | `#FFFFFE` | Light mode directive |
| `--bg-secondary` | `#060f21` | `--color-surface` | `#F5F5F5` | Light mode alternate section bg |
| `--bg-card` | `#0a1628` | `--color-card` | `#FFFFFF` | Light mode cards |
| `--bg-card-hover` | `#0e1e38` | `--color-card-hover` | `#FAFAFA` | Light mode hover |
| `--bg-elevated` | `#101f3a` | *(removed)* | — | No dark elevation needed |
| `--indigo` | `#6366f1` | *(removed)* | — | Not in brand palette |
| `--indigo-light` | `#818cf8` | *(removed)* | — | Not in brand palette |
| `--indigo-dim` | `rgba(99,102,241,0.12)` | *(removed)* | — | Not in brand palette |
| `--cyan` | `#06b6d4` | *(removed)* | — | Replaced by `--color-accent` on CTAs only |
| `--cyan-light` | `#22d3ee` | *(removed)* | — | Replaced by `--color-accent` |
| `--cyan-dim` | `rgba(6,182,212,0.12)` | *(removed)* | — | Not in brand palette |
| `--gold` | `#f59e0b` | *(removed)* | — | Not in brand palette |
| `--gold-light` | `#fbbf24` | *(removed)* | — | Not in brand palette |
| `--gold-dim` | `rgba(245,158,11,0.12)` | *(removed)* | — | Not in brand palette |
| `--border` | `rgba(99,102,241,0.14)` | `--border` | `rgba(33,33,33,0.10)` | Light mode border |
| `--border-hover` | `rgba(99,102,241,0.38)` | `--border-hover` | `rgba(33,33,33,0.22)` | Light mode hover border |
| `--border-subtle` | `rgba(255,255,255,0.06)` | `--border-subtle` | `rgba(33,33,33,0.06)` | Light mode subtle divider |
| `--text-primary` | `#f0f4ff` | `--text-primary` | `#212121` | Light mode — same as `--color-structure` |
| `--text-secondary` | `#94a3b8` | `--text-secondary` | `#4B5563` | Light mode mid-dark |
| `--text-muted` | `#4e637a` | `--text-muted` | `#9CA3AF` | Light mode muted |
| `--shadow-card` | `0 4px 24px rgba(0,0,0,0.4)` | `--shadow-card` | `0 2px 16px rgba(33,33,33,0.08)` | Light mode shadow |
| `--shadow-glow-indigo` | `0 0 40px rgba(99,102,241,0.25)` | *(removed)* | — | No indigo in palette |
| `--shadow-glow-cyan` | `0 0 40px rgba(6,182,212,0.20)` | *(removed)* | — | Replaced by accent shadow on buttons |
| *(new)* | — | `--color-structure` | `#212121` | 30% structural anchor |
| *(new)* | — | `--color-accent` | `#33E7FF` | 10% CTA-only conversion accent |
| *(new)* | — | `--text-on-dark` | `#FFFFFE` | Text on `--color-structure` sections |
| *(new)* | — | `--text-on-accent` | `#212121` | Text inside accent buttons |
| *(new)* | — | `--shadow-elevated` | `0 8px 32px rgba(33,33,33,0.12)` | Hover elevation on cards |

### Typography Changes

| Element | Current | New |
|---------|---------|-----|
| Body font | `'Inter', system-ui, sans-serif` | `'Public Sans', system-ui, sans-serif` |
| Heading font | `'Syne', sans-serif` | `'Public Sans', sans-serif` (weight 700–800) |
| Google Fonts URL | Inter + Syne | Public Sans `400;500;600;700;800` |
| `.gradient-text` class | Indigo→Cyan gradient text | `.text-emphasis` — italic, `--text-primary` |

### Component Changes

| Component | Current | New |
|-----------|---------|-----|
| `.btn--primary` | Indigo gradient bg (`#6366f1` → `#4338ca`) | `--color-accent` (#33E7FF) bg, `--text-on-accent` text |
| `.btn--ghost` | Transparent + `var(--border-hover)` border | Transparent + `--color-structure` border (light) / white border (dark sections) |
| `.nav__link--cta` | Indigo gradient bg | `--color-accent` bg, `--text-on-accent` text |
| `.section__tag` | `--indigo-light` text + `--indigo-dim` bg | `--text-primary` + `rgba(33,33,33,0.06)` bg |
| `.service-card--cyan` hover border | `rgba(6,182,212,0.4)` | `--border-hover` |
| `.service-card--gold` hover border | `rgba(245,158,11,0.4)` | `--border-hover` |
| `.service-card__icon--blue/cyan/gold` | Colored bg/border | Unified: `rgba(33,33,33,0.05)` bg, `rgba(33,33,33,0.12)` border |
| `.service-card__link` | `var(--indigo-light)` | `--text-primary` |
| `.service-card__list li::before` dot | `var(--indigo-light)` / `--cyan-light` / `--gold-light` | `--text-muted` (all unified) |
| `.service-featured__badge` | Indigo→Cyan gradient | `--color-structure` bg, `--text-on-dark` text |
| `.why-card__number` | `rgba(99,102,241,0.08)` | `rgba(33,33,33,0.06)` |
| `.why-card__icon` | `var(--indigo-light)` | `--text-primary` |
| `.compliance__badge` | `--indigo-light` text, `--indigo-dim` bg | `--text-primary`, `rgba(33,33,33,0.06)` bg |
| `.about__card--1/2/3` left border | `--indigo` / `--cyan` / `--gold` | `--color-structure` (all three) |
| `.process__step-num` | Indigo gradient circle | `--color-structure` bg, `--text-on-dark` |
| `.process__step-line` | Indigo gradient line | `rgba(33,33,33,0.15)` dashed horizontal |
| `.process__steps` layout | `flex-direction: column` | CSS grid, `repeat(5, 1fr)` desktop |
| `.hero__badge-dot` glow | `var(--cyan)` | `--color-accent` (interactive indicator) |
| `.hero__floating-badge` | Dark glass bg | `--color-card` bg, `--border` border, `--shadow-card` |
| `.faq__icon` active color | `var(--indigo-light)` | `--color-accent` |
| `.form__input:focus` ring | `rgba(99,102,241,0.18)` | `rgba(51,231,255,0.25)` |
| `.contact__info-icon` | `--indigo-dim` bg, `--indigo-light` icon | `rgba(33,33,33,0.06)` bg, `--text-primary` icon |
| `.contact__promise` | `--indigo-dim` bg | `--color-surface` bg |
| `.footer` bg | `var(--bg-primary)` (#030b18) | `--color-structure` (#212121) |
| `.footer__link` | `var(--text-muted)` | `--text-on-dark` at 50% opacity |
| `.header.is-scrolled` | Glass: `rgba(3,11,24,0.85)` + blur | Remove glass — nav is always `--color-structure` solid |
| `.aoai__stat-value` | `--text-primary` (#f0f4ff) | `--color-accent` (approved exception on dark section) |
| `.aoai__brand-name` | Indigo→Cyan gradient text | `--text-on-dark` (#FFFFFE) |
| `.aoai__external-link` | `--cyan-light` text, `--cyan-dim` bg | `--color-accent` text (on dark section — ✅ interactive link), `rgba(51,231,255,0.1)` bg |
| `.hero__scroll-line` | `--indigo-light` gradient | `rgba(33,33,33,0.2) → --color-accent → transparent` |
| `:focus-visible` ring | `2px solid var(--indigo-light)` | `2px solid var(--color-accent)` |

### New CSS Classes Needed

| Class | Purpose |
|-------|---------|
| `.text-emphasis` | Replaces `.gradient-text` — italic, `--text-primary`, no color |
| `.trusted-by` | New hero trusted-by logo strip container |
| `.logo-placeholder` | Placeholder boxes for client logos |
| `.social-proof` | New social proof section |
| `.metric-card` | Metric boxes in social proof section |
| `.testimonial-card` | Testimonial cards in social proof section |
| `.back-to-top` | Fixed back-to-top button (legal pages) |
| `.legal-toc__link.is-active` | Active TOC link state (scrollspy) |
| `.sr-only` | Screen-reader-only class (if not already in CSS) |
| `.process__step-connector` | Horizontal connector line between process steps |

### Removed CSS Patterns

The following CSS blocks can be removed or emptied when no longer referenced:

- All `--indigo`, `--indigo-light`, `--indigo-dim` usage
- All `--gold`, `--gold-light`, `--gold-dim` usage
- `.service-card--cyan`, `.service-card--gold` color overrides (class names can stay, color values reset)
- `.service-card__icon--blue`, `--cyan`, `--gold` color overrides
- `.hero__orb` gradient colors (replace with `rgba(33,33,33,0.03)` subtle orbs, or remove entirely — on light bg these are less visible and may be removed)
- `@keyframes pulse-orb` — can be kept for badge dot animation, but remove from `.hero__orb` elements
- `.header.is-scrolled` glass effect (nav is always solid `--color-structure`)
- `var(--shadow-glow-indigo)`, `var(--shadow-glow-cyan)`

---

## Approved `--color-accent` Exceptions

The following are documented exceptions where `--color-accent` (#33E7FF) is used outside of a primary button, but approved because they serve conversion or interactive signaling purposes:

| Location | Element | Justification |
|----------|---------|--------------|
| AO AI section H2 | "The AO AI Platform" text | Product name in primary product showcase — conversion-critical call-out. Dark section bg (#212121) provides 11.5:1 contrast ratio ✅ |
| AO AI section stats | Stat values (98%, 3×, 500+, 40+) | Conversion-anchor numbers in product proof strip on dark bg. Interactive equivalent — drives "Request a Demo" action |
| AO AI feature icons | Small icon squares | Interactive guide within product showcase — conversion-adjacent |
| FAQ expand icon | `+` / `×` toggle | Active state of an interactive element |
| Form focus ring | `box-shadow` on `:focus` | Required interactive affordance |
| `:focus-visible` ring | Global focus style | Required accessibility affordance — all interactive elements |
| TOC active link | Border-left on `.is-active` | Active navigation state on interactive element |
| Hero badge dot pulse | 7px dot animation | Location/status indicator — borderline. Justified as directional signal for "we're here, we're active" geo-trust |
| Nav "Get Started" | Button background | Primary CTA — canonical accent use |
| All `<a>` hover underlines | `text-decoration-color: --color-accent` | Interactive hover affordance |

**Rejected uses** (documented to prevent Code Agent from adding these):
- Section decorative dividers
- Background gradients on sections
- Icon fill colors that are not inside CTA-adjacent elements
- Border highlights on non-interactive card elements
- `.gradient-text` class replacement color

---

## Quality Gates (before marking implementation complete)

- [ ] All 6 HTML files load with Public Sans (verified in browser)
- [ ] All 6 HTML files render in light mode (`--color-base` background visible)
- [ ] Hero section CTAs display in `--color-accent` buttons with `--text-on-accent` text
- [ ] Nav "Get Started" button is in `--color-accent`
- [ ] AO AI section renders as dark (`--color-structure`) with light text
- [ ] Service Area / Nationwide card renders as dark panel
- [ ] Footer renders as `--color-structure` dark
- [ ] No `#6366f1`, `#818cf8`, `#06b6d4`, `#22d3ee`, `#f59e0b`, `#fbbf24` colors visible anywhere
- [ ] Contact form focus ring is cyan (`--color-accent`)
- [ ] Social proof section placeholder is present with HTML comments
- [ ] Trusted-by strip placeholder is present below hero
- [ ] All 5 legal pages have footer (with `index.html#section` hrefs)
- [ ] All 5 legal pages have sticky TOC on desktop
- [ ] All 5 legal pages have back-to-top button
- [ ] `prefers-reduced-motion` still respected
- [ ] All existing copy matches original HTML verbatim
- [ ] No new content has been added beyond section placeholders
- [ ] All `<a>` elements have proper href (no dead links introduced)
- [ ] FormSubmit form action is unchanged: `https://formsubmit.co/hello@jartsoftwaresolutions.com`
- [ ] Contrast ratios verified: body text 7:1+ on all backgrounds
- [ ] Mobile nav works correctly (hamburger, drawer, close on link click, Escape key)
- [ ] Page scrolls smoothly to all `#section` anchors with correct header offset
