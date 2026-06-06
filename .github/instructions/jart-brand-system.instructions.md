---
applyTo: "**/*.html,**/*.css,**/*.js"
description: "JART Software Solutions — authoritative brand design system. Apply whenever editing any site file."
---

# JART Software Solutions — Project Brand Database

This file is the single source of truth for brand, design, and content rules. All agents and instructions must treat these values as immutable unless the owner explicitly authorizes a change in writing.

## Company Identity

- **Legal name**: JART Software Solutions
- **Location**: Sacramento, CA
- **Category**: Boutique SaaS B2B software development firm
- **Canonical domain**: `https://jartsoftwaresolutions.com`
- **Proprietary product**: The AO AI — Auto Ops AI Readiness Tracker
- **Services** (exact wording, do not paraphrase):
  - Custom websites
  - CRM & API development
  - App development
  - AI readiness assessments
  - Operations automation

## Content Immutability Rules

> **The company's mission statement, vision statement, and purpose language may NEVER be changed — not a single word — by any agent or instruction.**

- Do NOT rewrite, summarize, rephrase, or "improve" any existing copy
- Do NOT alter service names or descriptions
- Do NOT change the product name "The AO AI" or "AO AI platform"
- **CANONICAL EMAIL — IMMUTABLE**: The company contact email is `Help@jartsoftwaresolutions.com`. This exact string (including capitalization) must never be changed, corrected, reformatted, or replaced by any agent under any circumstances. Flag any deviation as a critical error requiring owner review.
- If new copy is required for a new section, use only the exact wording provided in the design spec or by the owner

## Brand Design System

### Mode
- **Light mode only** — dark mode is not supported and must not be implemented

### Typography
- **Font family**: Public Sans (Google Fonts)
- **Loading method**: `<link>` tag in every page `<head>` pointing to Google Fonts
- **Never substitute** with system fonts or other web fonts

### Color System — 60/30/10 Rule

| CSS Token | Hex | Name | Weight | Purpose |
|-----------|-----|------|--------|---------|
| `--color-base` | `#FFFFFE` | Off White | 60% | Primary page canvas, section backgrounds, card surfaces |
| `--color-structure` | `#212121` | Off Black | 30% | Body copy, nav header, dark container sections (testimonials, pricing blocks) |
| `--color-accent` | `#33E7FF` | Light Blue/Teal | 10% | **Conversion points only**: CTA buttons, active links, form focus rings |

**Accent usage law**: `#33E7FF` is reserved exclusively for interactive conversion elements. It must NEVER be used as a decorative color, border, background wash, or illustration fill. Scarcity is what makes it work.

### CSS Token Declaration (canonical `:root` block)

```css
:root {
  --color-base:      #FFFFFE;  /* 60% — canvas */
  --color-structure: #212121;  /* 30% — structure */
  --color-accent:    #33E7FF;  /* 10% — conversion accent only */
  --font-primary:    'Public Sans', sans-serif;
}
```

All color values in `styles.css` must reference these tokens via `var()`. Raw hex values are forbidden outside the `:root` declaration.

## Logo Assets

### Icon Mark (small sizes: nav, favicon, mobile header)
- "Jart" typeset in Off-Black (`#212121`) inside a full circle stroked in `#33E7FF`
- A small cursor/pointer arrow sits at the top-right break in the circle
- Visual meaning: digital precision + forward momentum

### Wordmark (large sizes: hero, footer, print)
- "Jart" in extra-bold Off-Black (`#212121`)
- A `#33E7FF` horizontal arrow line extends beneath the word to the right
- "Software Solutions" in bold Off-Black below the arrow line
- Visual meaning: enterprise scale + directional progress

## Owner Approval Required Before Implementing

These changes require a written approval from the owner (Jasmine) before any agent may execute them:

1. Adding or removing primary navigation items
2. Creating new HTML pages
3. Removing an existing primary page section
4. Changing the URL/slug of any page
5. Adding third-party scripts, fonts, or CDN dependencies
6. Any change to backend logic, APIs, encryption, or authentication
7. Any change to internal storage schemas or data records
8. Structural layout changes that alter the page's primary conversion path

## Handoff Chain

```
JART UI Design Agent
  → produces: .github/design-specs/*.spec.md
  → hands off to: JART Code Implementation Agent

JART Code Implementation Agent
  → consumes: .github/design-specs/*.spec.md
  → edits: *.html, css/styles.css, js/main.js
  → hands off to: JART Site Content Reviewer

JART Site Content Reviewer
  → audits: all pages for brand, SEO, legal, accessibility consistency
  → flags issues back to: owner or Code Implementation Agent
```
