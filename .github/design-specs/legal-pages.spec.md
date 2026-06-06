# Legal Pages — Design Spec
**Version**: 1.0 | **Date**: 2026-06-05 | **Status**: Ready for Code Implementation

**Pages covered** (layout/readability improvements only — zero content changes):
1. `cookie-policy.html` — Cookie Policy
2. `gdpr-statement.html` — California Privacy Rights (CCPA/CPRA)
3. `privacy-policy.html` — Privacy Policy
4. `security-policy.html` — Security Policy
5. `terms-of-service.html` — Terms of Service

---

## Page Goal
Allow any user — including those on mobile devices — to quickly find, read, and navigate the legal content they are looking for, with full confidence in the company's professionalism. Legal pages should feel premium, not like an afterthought.

---

## Current Issues (grounded in actual file review)

1. **Wrong mode**: All 5 legal pages inherit the dark navy theme (`#030b18`) from `styles.css`. Must switch to light mode with the new design system.
2. **Wrong fonts**: Same Inter + Syne issue as index.html. Must be Public Sans throughout.
3. **Wrong color palette**: All five pages use the current gradient-based nav logo (indigo/cyan laptop SVG). Must be updated to brand spec logo.
4. **Nav logo mismatch**: Each page uses a page-specific gradient ID for the nav SVG (`lg-cp-nav`, `lg-gdpr-nav`, `lg-pp-nav`, `lg-sp-nav`, `lg-tos-nav`). These all render the same laptop icon. All five must be replaced with the brand icon mark.
5. **Legal hero is adequately structured**: The breadcrumb + title + metadata row is good. It just needs color system update.
6. **TOC sticky behavior**: No CSS sticky is currently applied to the `.legal-toc` aside. On long-form legal pages, a sticky TOC is a major readability improvement.
7. **Table styling**: `.legal-table` inherits dark background styling. Must be re-skinned for light mode.
8. **Contact box styling**: `.legal-contact-box` uses dark card styling. Must be reskinned.
9. **`legal-note` callout**: Currently styled like a dark card. Must be reskinned as a warm off-white callout with a left border accent.
10. **No "back to top" or mid-page nav**: Long documents like terms-of-service and privacy-policy have no fast-return mechanism. A "Back to top" fixed button or sticky TOC solves this.
11. **Nav links on legal pages point to `index.html#section` anchors correctly** ✅ — do not change these hrefs.
12. **"Get Started" nav CTA on legal pages links to `index.html#contact`** — ensure this is preserved.

---

## Design System

All legal pages must use the same CSS custom property tokens as `index.html` (see index.spec.md for the full `:root` token set). No new tokens are needed. All changes flow from the shared `styles.css`.

---

## Shared Layout Across All 5 Pages

### Navigation (identical to index.html)

Apply the same nav spec from index.spec.md:
- `--color-structure` (#212121) background
- Brand icon mark logo (left)
- Nav links in `--text-on-dark`
- "Get Started" CTA → Primary button → links to `index.html#contact`
- Mobile hamburger with slide-in drawer

The 5 legal pages have slightly different nav links (they omit "The AO AI") — keep the existing link set as-is per each page's HTML.

---

### Legal Hero Section (`.legal-hero`)

**Layout**: Full-width band, no grid. Centered content. `padding-block: 3rem 2.5rem`.
**Background**: `--color-surface` (#F5F5F5) — not the full dark or full white; a subtle tint that creates visual separation from the nav.

**Breadcrumb** (`.legal-breadcrumb`):
- "Home" link: `--text-secondary`, `0.84rem`, hover underline `--color-accent` — ✅ interactive link
- Separator `›`: `--text-muted`
- Current page: `--text-primary`, `0.84rem`, weight 600

**H1** (`.legal-hero__title`):
- Font: Public Sans 800, `clamp(2rem, 4vw, 2.8rem)`
- Color: `--text-primary`
- Margin-bottom: `0.75rem`

**Metadata row** (`.legal-hero__meta`):
- Three spans inline (Effective Date, Last Updated, Version/Statute)
- Style: `--text-muted`, `0.84rem`, separated by `·` dividers with `gap: 1rem`
- `strong` labels: `--text-secondary`, weight 600

---

### Legal Body (`.legal-body`)

**Layout**: `--color-base` (#FFFFFE) background. `padding-block: 3rem 5rem`.

**Inner layout** (`.legal-layout`):
- 2-column CSS grid: `260px 1fr`, gap `3rem`
- Breakpoint ≤ 900px: single column, TOC collapses to top
- Breakpoint ≤ 640px: single column, TOC collapses to a horizontally scrollable strip

---

### Table of Contents Aside (`.legal-toc`)

**Desktop (sticky)**:
- `position: sticky; top: calc(nav-height + 1.5rem)` — Code Agent: nav height is ~68px, use `top: 80px`
- `max-height: calc(100vh - 100px); overflow-y: auto`
- Background: `--color-surface`, border `--border`, `border-radius: --radius`, `padding: 1.2rem 1.4rem`

**TOC title** (`.legal-toc__title`):
- Public Sans 700, `0.76rem`, uppercase, letter-spacing `0.1em`, `--text-muted`
- Margin-bottom: `0.75rem`

**TOC links** (`.legal-toc__link`):
- `--text-secondary`, `0.84rem`, `line-height 1.9`
- Hover: `--text-primary`, left `4px` translate
- Active (scrollspy): `--text-primary`, weight 600, left border `2px solid --color-accent` — ✅ active navigation indicator

**TOC scrollspy**: Simple JS — track scroll position against each `<h2 id>` anchor. When a section enters viewport, mark its TOC link active. This is already achievable with IntersectionObserver. Code Agent: add scrollspy to `main.js` for legal pages.

**Tablet/mobile collapse**: At ≤ 900px, TOC moves to above the content. Render as a compact collapsed accordion: "Contents ▾" toggle that expands the full list. Default collapsed on mobile.

---

### Legal Content Column (`.legal-content`)

**Typography**:
- H2 (section headers): Public Sans 700, `clamp(1.3rem, 2.5vw, 1.6rem)`, `--text-primary`, `margin-top: 2.5rem`, `margin-bottom: 1rem`
- H3 (subsection headers): Public Sans 600, `1.05rem`, `--text-primary`, `margin-top: 1.75rem`, `margin-bottom: 0.6rem`
- p: Public Sans 400, `1rem`, `--text-secondary`, `line-height: 1.80`, `margin-bottom: 1rem`
- `strong` inline: `--text-primary`, weight 600
- `ul/ol` lists: `padding-left: 1.6rem`, `li` margin-bottom `0.5rem`, `--text-secondary`, `0.98rem`
- Anchor links (`<a>` in content): `--text-primary`, underline `--color-accent` on hover — ✅ interactive link
- `<abbr>`: dotted underline `--text-muted`, cursor help — existing behavior fine

**Legal note callout** (`.legal-note`):
- Background: `rgba(33,33,33,0.04)`, border-left `3px solid rgba(33,33,33,0.20)`, `border-radius: 0 8px 8px 0`
- Padding: `1rem 1.2rem`
- p: `--text-secondary`, `0.95rem`, `line-height: 1.78`
- Links inside: `--text-primary`, underline on hover

**Contact box** (`.legal-contact-box`):
- Background: `--color-card`, border `--border`, `--radius`, `padding: 1.4rem`
- H3: Public Sans 600, `1rem`, `--text-primary`, `margin-bottom: 0.5rem`
- p: `--text-secondary`, `0.9rem`
- Email links: `--text-primary`, underline `--color-accent` on hover

---

### Tables (`.legal-table`)

**Wrapper** (`.legal-table-wrap`): `overflow-x: auto`, `border-radius: --radius`, border `--border`

**Table**:
- Width: 100%
- `border-collapse: collapse`
- `thead tr`: bg `--color-surface`, border-bottom `2px solid --border-hover`
- `thead th`: Public Sans 600, `0.84rem`, `--text-primary`, uppercase, `0.08em` letter-spacing, `padding: 0.75rem 1rem`, text-align left
- `tbody tr`: alternating rows — odd: `--color-base`, even: `--color-surface`
- `tbody td`: `--text-secondary`, `0.9rem`, `padding: 0.7rem 1rem`, border-bottom `1px solid --border`
- `tbody td strong`: `--text-primary`, weight 600

---

### Footer (identical to index.html)

All 5 legal pages share the same footer. Apply the index.html footer spec exactly:
- `--color-structure` (#212121) background
- Same columns: Services | Company | Legal & Compliance
- Same bottom bar copy
- Brand wordmark in `--text-on-dark`

**Note**: Current legal page HTML does NOT include a footer. Code Agent must add the full footer HTML to each legal page from the footer block in `index.html`.

**Current footer on legal pages**: Inspection shows only a minimal footer exists on legal pages (just the nav header without a matching footer). Code Agent: copy the footer element from `index.html` into each legal page before `</body>`, adjusting internal anchor links to `index.html#section` format (e.g., `href="index.html#services"`).

---

### "Back to Top" Button (new — all legal pages)

**Element**: Fixed position button, bottom-right corner.
**Visibility**: Hidden until user scrolls > 300px; fade in via JS class toggle.
**Spec**:
- `position: fixed; bottom: 1.5rem; right: 1.5rem`
- Size: `44×44px` circle (minimum touch target)
- Background: `--color-structure`, icon: upward chevron SVG `--text-on-dark`
- Hover: bg lightens to `rgba(33,33,33,0.8)`, `translateY(-2px)`
- `aria-label="Back to top"`, `aria-hidden="true"` when not visible
- `z-index: 900`

---

## Component Specs (legal-specific)

### Border radius
- Tables: `--radius` (12px) on wrapper only
- Contact box: `--radius` (12px)
- Legal note: `0 8px 8px 0`
- TOC sidebar: `--radius` (12px)
- Back to top button: `50%`

### Spacing
- Section anchor padding (for sticky nav offset): each `<h2 id="...">` should have `scroll-margin-top: 88px`
- Content max-width: `720px` within the right column (prevents ultra-wide text lines)
- TOC aside width: `260px` on desktop

---

## CTA Hierarchy (Legal Pages)

Legal pages are compliance content — there is exactly one CTA goal: return the reader to the main site to engage.

| Priority | CTA Text | Destination | Style | Location |
|----------|----------|-------------|-------|----------|
| 1 | "Get Started" | `index.html#contact` | Nav primary button | Navigation (persistent) |
| 2 | "Return to Home" | `index.html` | Footer logo link + breadcrumb Home link | Throughout |
| 3 | Policy cross-links | e.g., `privacy-policy.html` | Inline text link with accent hover | Within content |

No additional CTAs should be added to legal pages beyond what is already in the content.

---

## Responsive Behavior

| Breakpoint | Layout change |
|------------|--------------|
| > 900px | 2-column: sticky TOC (260px) + content |
| ≤ 900px | Single column: TOC above content, collapsed accordion |
| ≤ 640px | Single column, TOC as collapsed accordion, table horizontal scroll |
| All | Back to top button visible after 300px scroll |
| All | Tables get `overflow-x: auto` wrapper |

---

## Animation / Interaction Notes

Legal pages intentionally have minimal animation — this builds trust by not feeling like a marketing page.

| Element | Behavior |
|---------|----------|
| TOC links | Smooth scroll to section anchor |
| TOC active state | Scrollspy updates active class as user reads |
| Back to top | Fade in (`opacity: 0 → 1`, `0.25s`) at 300px scroll |
| TOC accordion (mobile) | Toggle with `max-height` transition |
| Tables | No animation — static |
| Content | No scroll-reveal (`.reveal` class) — legal content should load immediately |

---

## Accessibility Notes

| Concern | Specification |
|---------|--------------|
| Skip to content | Same skip link as index.html |
| Breadcrumb | `<nav aria-label="Breadcrumb">` ✅ already present |
| `aria-current="page"` on breadcrumb | ✅ already present |
| TOC landmark | `<aside aria-label="Table of contents">` ✅ already present |
| Heading hierarchy | `h1` → page title; `h2` → sections; `h3` → subsections ✅ |
| Table captions | No `<caption>` currently. Code Agent: add `<caption class="sr-only">` to each table describing its purpose |
| Table header scope | `<th scope="col">` on all column headers |
| Focus ring | Same `--color-accent` focus ring as index.html |
| Contrast (same as index) | All ratios verified against light mode tokens ✅ |
| `lang` attribute | `<html lang="en">` ✅ all pages |
| Legal contact email links | `<a href="mailto:...">` — already present ✅ |
| Accordion (mobile TOC) | `aria-expanded`, `aria-controls` required |

---

## Implementation Notes for Code Agent

1. **Font update**: In all 5 legal page `<head>` blocks, replace the current Google Fonts link with the Public Sans link.

2. **Logo update**: In all 5 legal page navs, replace the current laptop SVG + text with the brand icon mark. Use a single shared SVG definition (or inline it consistently). Remove the page-specific gradient IDs (`lg-cp-nav`, `lg-gdpr-nav`, etc.) — all five navs should use one identical icon.

3. **Footer addition**: Current legal pages lack the full footer. Copy the `<footer>` block from `index.html` verbatim into each legal page, replacing all `href="#section"` with `href="index.html#section"` where applicable.

4. **TOC sticky**: Add to `.legal-toc` in `styles.css`:
   ```css
   position: sticky;
   top: 80px;
   max-height: calc(100vh - 100px);
   overflow-y: auto;
   ```

5. **Scroll margin for heading anchors**: In `styles.css`, add:
   ```css
   .legal-content h2[id],
   .legal-content h3[id] {
     scroll-margin-top: 88px;
   }
   ```

6. **Scrollspy for TOC**: Add a `scrollspy()` function to `main.js` that:
   - Runs on legal pages only (detect by body class or URL)
   - Observes all `h2[id]` within `.legal-content`
   - Toggles `is-active` class on the matching `.legal-toc__link`
   - Falls back gracefully if TOC is not present

7. **Back to top button**: Add a `<button class="back-to-top" aria-label="Back to top" aria-hidden="true">` just before `</body>` in each legal page. Wire up via `main.js`.

8. **Table scope attributes**: Add `scope="col"` to all `<th>` elements in legal tables and a `<caption class="sr-only">` to each table.

9. **Legal pages do NOT have** `.reveal` scroll animations. Do not add them. Legal content should be immediately visible for accessibility and usability.

10. **Color updates in `styles.css`**: The legal-specific CSS classes below need reskinning per the new tokens:
    - `.legal-hero` → background `--color-surface`
    - `.legal-hero__title` → color `--text-primary`
    - `.legal-hero__meta span` → color `--text-muted`
    - `.legal-body` → background `--color-base`
    - `.legal-toc` → background `--color-surface`, border `--border`
    - `.legal-toc__link` → color `--text-secondary`; active → `--text-primary`
    - `.legal-toc__link.is-active` → border-left `2px solid --color-accent`, color `--text-primary`
    - `.legal-content h2, h3` → color `--text-primary`
    - `.legal-content p, li` → color `--text-secondary`
    - `.legal-note` → bg `rgba(33,33,33,0.04)`, border-left `3px solid rgba(33,33,33,0.20)`
    - `.legal-contact-box` → bg `--color-card`, border `--border`
    - `.legal-table thead tr` → bg `--color-surface`
    - `.legal-table thead th` → color `--text-primary`
    - `.legal-table tbody td` → color `--text-secondary`
    - `.legal-breadcrumb a` → color `--text-secondary`; hover underline `--color-accent`
    - `.legal-breadcrumb__sep` → color `--text-muted`
