# index.html — Design Spec
**Version**: 1.0 | **Date**: 2026-06-05 | **Status**: Ready for Code Implementation

---

## Page Goal
Convert qualified B2B buyers — from first scroll to form submission — by signaling trust, demonstrating expertise, and making the next step (a free consultation) feel effortless and low-risk.

---

## Current Issues (grounded in actual file review)

1. **Wrong mode**: Site is dark navy (`#030b18` base). Owner directive is light mode (`#FFFFFE` base). Full color system must be rebuilt.
2. **Wrong fonts**: Current fonts are Inter (body) + Syne (headings). Must switch entirely to Public Sans (all weights: 400, 500, 600, 700, 800).
3. **Wrong color palette**: Current uses Indigo `#6366f1`, Cyan `#06b6d4`, Gold `#f59e0b` as decorative multi-brand colors. Brand spec requires strict 60/30/10: base `#FFFFFE` / structure `#212121` / accent `#33E7FF` CTAs only.
4. **Wrong logo**: Current SVG is a laptop/monitor device icon with gradient. Must be replaced with the brand-spec logos: circle icon mark (small sizes) and wordmark (hero/footer).
5. **No trusted-by strip**: Hero lacks social proof immediately below CTAs. Owner's mockup references a logo strip — owner must provide logos (see HANDOFF.md).
6. **No client results / social proof section**: Mockup references a "Client Success Stories" block with metrics. No such section exists. Must be added as a placeholder awaiting owner-provided data. ⚠️ **Flag**: Owner must confirm or provide real metrics before this section goes live — no numbers may be invented.
7. **Hero CTA copy lacks friction reduction**: "Explore Services" doesn't tell the user what happens next. Secondary "Free Consultation →" is more specific — consider elevating it.
8. **Process section is vertical linear list**: Owner mockup shows horizontal 4-step flow. Current HTML has 5 steps (exact copy preserved). Spec calls for a horizontal card row on desktop.
9. **Section tag (`.section__tag`) uses indigo**: Must be restyled with structure-color text on subtle structure-tinted background (no accent use — tags are not CTAs).
10. **`gradient-text` spans use decorative color**: Must be replaced. On light backgrounds, use a simple `--color-structure` (#212121) or a subtle structure-shade — no multi-color decorative gradients. See Component Specs for replacement strategy.
11. **Contact form has no visible geo-trust signal**: Form section should display location + "1 business day response" prominently as a trust statement above the form.
12. **Google Fonts link**: Must be updated from `Inter` + `Syne` to `Public Sans` across all pages.

---

## Design System (Full Reference)

### CSS Custom Properties (new tokens — replace all current vars)

```css
:root {
  /* 60 / 30 / 10 Brand Tokens */
  --color-base:      #FFFFFE;   /* 60% — page canvas, cards, inputs */
  --color-structure: #212121;   /* 30% — nav, body text, dark sections */
  --color-accent:    #33E7FF;   /* 10% — CTAs only: buttons, focus rings, active links */

  /* Surface tones (derived from base) */
  --color-surface:   #F5F5F5;   /* subtle alternate section background */
  --color-card:      #FFFFFF;   /* card fill (pure white lifts from F5 base) */
  --color-card-hover:#FAFAFA;

  /* Text (always derive from structure, never accent) */
  --text-primary:    #212121;   /* same as --color-structure */
  --text-secondary:  #4B5563;   /* mid-dark — body copy, descriptions */
  --text-muted:      #9CA3AF;   /* metadata, fine print — NOT for body copy */
  --text-on-dark:    #FFFFFE;   /* text on --color-structure sections */
  --text-on-accent:  #212121;   /* text inside --color-accent buttons */

  /* Borders */
  --border:          rgba(33, 33, 33, 0.10);
  --border-hover:    rgba(33, 33, 33, 0.22);
  --border-subtle:   rgba(33, 33, 33, 0.06);

  /* Shadows (light-mode appropriate) */
  --shadow-card:     0 2px 16px rgba(33, 33, 33, 0.08);
  --shadow-elevated: 0 8px 32px rgba(33, 33, 33, 0.12);

  /* Layout */
  --container:   1200px;
  --section-gap: 6rem;
  --radius:      12px;
  --radius-lg:   20px;

  /* Typography */
  --font: 'Public Sans', system-ui, sans-serif;

  /* Transitions */
  --ease:       cubic-bezier(0.4, 0, 0.2, 1);
  --transition: 0.25s var(--ease);
}
```

### Typography Scale (Public Sans — all weights from Google Fonts)
Google Fonts link (replace current):
```
https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap
```

| Element         | Weight | Size (desktop)          | Size (mobile)         | Color              |
|-----------------|--------|-------------------------|-----------------------|--------------------|
| H1              | 800    | `clamp(2.8rem, 5vw, 4.2rem)` | `clamp(2.2rem, 9vw, 2.8rem)` | `--text-primary`  |
| H2              | 700    | `clamp(2rem, 3.5vw, 2.8rem)` | `clamp(1.7rem, 6vw, 2.2rem)` | `--text-primary`  |
| H3              | 600    | `clamp(1.1rem, 2vw, 1.35rem)` | `1.15rem`            | `--text-primary`  |
| H4              | 600    | `1rem`                  | `1rem`                | `--text-primary`  |
| Body / p        | 400    | `1.05rem` / LH 1.72     | `1rem`                | `--text-secondary`|
| Section tag     | 600    | `0.76rem` / uppercase / 0.12em LS | same          | `--text-primary`  |
| Meta / small    | 400    | `0.84rem`               | `0.82rem`             | `--text-muted`    |
| Button          | 600    | `0.95rem`               | `0.9rem`              | contextual         |
| Nav link        | 500    | `0.9rem`                | `1rem`                | `--text-on-dark` or `--text-secondary` |

**Heading spans that currently use `.gradient-text`:**
- Replace with a simple off-black. On the light canvas the heading is already high-contrast.
- Exception: if a visual contrast is needed, use `--color-structure` at 100% opacity on the entire H2, and italicize the span. Do NOT use `--color-accent` on text — it fails WCAG AA on `--color-base`.

### Button System
| Variant      | Background          | Text                  | Border               | Hover state                          |
|--------------|---------------------|-----------------------|----------------------|--------------------------------------|
| Primary      | `--color-accent` (#33E7FF) | `--text-on-accent` (#212121) | none        | `translateY(-2px)`, slight shadow `0 6px 20px rgba(51,231,255,0.35)` |
| Secondary    | transparent         | `--text-primary`      | 1.5px `--color-structure` | bg `--color-structure`, text `--text-on-dark` |
| Ghost (on dark section) | transparent | `--text-on-dark` | 1.5px rgba(255,255,255,0.4) | bg rgba(255,255,255,0.1), border rgba(255,255,255,0.7) |
| CTA nav link | `--color-accent`    | `--text-on-accent`    | none                 | slight shadow + `translateY(-1px)`   |

Dimensions: `padding: 0.85rem 2rem`, `border-radius: 8px`, `font-weight: 600`, `font-size: 0.95rem`.

### Section Tag (`.section__tag`)
- Background: `rgba(33, 33, 33, 0.06)` 
- Border: `1px solid rgba(33, 33, 33, 0.15)`
- Text: `--text-primary` (#212121)
- Padding: `0.35rem 0.9rem`, border-radius `100px`
- On dark sections (`--color-structure` bg): background `rgba(255,255,255,0.1)`, border `rgba(255,255,255,0.25)`, text `--text-on-dark`

### Card Style (light mode)
- Background: `--color-card` (#FFFFFF)
- Border: `1px solid --border` (rgba(33,33,33,0.10))
- Border-radius: `--radius-lg` (20px)
- Shadow: `--shadow-card`
- Hover: border-color `--border-hover`, `translateY(-4px)`, shadow `--shadow-elevated`

---

## Section-by-Section Layout

---

### Section 0: Navigation (`<header class="header">`)

**Layout**: Full-width sticky bar, max content width `--container` (1200px), flex row, space-between.

**Background**: `--color-structure` (#212121) always — even on scroll. Replace the current glass-morphism transparent-on-scroll approach. A persistent dark nav on a light page is the standard for premium B2B SaaS (Stripe, Linear, Vercel). This creates strong contrast anchoring.
- `padding-block: 1rem`

**Logo** (left): Replace current laptop SVG with the brand **icon mark**:
- Description for Code Agent: Render a circle filled with `--color-accent` (#33E7FF), inside it place "Jart" in Public Sans ExtraBold (#212121). At the top-right of the circle, a small white cursor/arrow SVG breaks the stroke, implying forward motion.
- Size: 32×32px circle icon
- Adjacent text: "JART" in Public Sans 800, `--text-on-dark` (#FFFFFE), no accent coloring on any letter
- "Software Solutions" omitted from nav (too long) — only show in footer wordmark

**Nav links** (center/right):
- About | Services | The AO AI | Why JART | Process
- Style: `--text-on-dark` at 70% opacity, hover 100% opacity + underline in `--color-accent`
- Active state: underline in `--color-accent`, full opacity

**"Get Started" CTA** (far right):
- Style: Primary button — background `--color-accent`, text `--text-on-accent` (#212121)
- Text: "Get Started"
- Hover: `translateY(-1px)`, accent shadow

**Mobile (≤ 640px)**:
- Hamburger icon (3 bars, `--text-on-dark`)
- Slide-in drawer from right: full-height, background `--color-structure`, links stacked vertically in Public Sans 600
- "Get Started" CTA button at bottom of drawer, full width

**Accessibility**: `role="navigation"`, `aria-label="Main navigation"`, skip-to-main link `#main-content` hidden above nav.

---

### Section 1: Hero (`#hero`)

**Layout**: Two-column grid on desktop (`1fr 1.1fr`), gap 4rem. Full-viewport-height (`min-height: 100svh`). Column 1: text/CTAs. Column 2: visual.
**Background**: `--color-base` (#FFFFFE)
**Subtle decoration**: A very light dot grid (rgba(33,33,33,0.035) dots at 40px pitch) masked to an ellipse — conveys technical precision without competing with copy.

**Column 1 — Content:**

1. **Location/service badge** (pill, existing HTML):
   - Tag: "Sacramento, CA · Website Development · The AO AI · AI Readiness · Automation"
   - Style: bg `rgba(33,33,33,0.06)`, border `rgba(33,33,33,0.15)`, text `--text-secondary`, `0.82rem`
   - Animated pulse dot: `--color-accent` — ⚠️ this is a visual indicator, treated as borderline interactive signal. Acceptable use.

2. **H1** (exact copy preserved):
   ```
   Engineering Tomorrow's
   Software Solutions,
   Today.
   ```
   - Font: Public Sans 800, `clamp(2.8rem, 5vw, 4.2rem)`, color `--text-primary`
   - "Software Solutions," on line 2: wrap in `<em>` styled as italic, no color change — creates visual rhythm without accent misuse
   - Letter-spacing: `-0.025em`

3. **Subtitle** (exact copy preserved):
   ```
   Based in Sacramento, CA — JART Software Solutions delivers custom website design & development, enterprise web platforms, CRM & API development, mobile app development, and AI readiness assessments with operations automation consulting. Boutique quality. Enterprise-grade results. Security-first. Built to scale.
   ```
   - Font: Public Sans 400, `1.05rem`, `--text-secondary`, `line-height: 1.78`, `max-width: 520px`
   - `strong` elements: `--text-primary`, weight 600

4. **CTA row**:
   - Primary: `<a href="#services">` — "Explore Services" — Primary button style (`--color-accent` bg)
   - Ghost: `<a href="#contact">` — "Free Consultation →" — Ghost button (outlined in `--color-structure`)
   - Gap: `0.75rem`, flex-wrap on mobile

5. **Stats strip** (existing content, restyled):
   - 4 stats: `5★ Rated` | `100% Senior-Led` | `7+ Core Services` | `🔐 Security-First`
   - Layout: horizontal flex row, `1px --border` dividers between items
   - Stat value: Public Sans 800, `1.4rem`, `--text-primary`
   - Stat label: Public Sans 500, `0.72rem`, uppercase, `--text-muted`
   - Background: none (transparent on hero canvas)
   - `margin-top: 2.5rem`

6. **⚠️ TRUSTED-BY STRIP** (new — placeholder until owner provides logos):
   - Position: Between stats and end of hero section, OR immediately below hero as its own band
   - If no logos yet: render a placeholder row `<p class="trusted-label">Trusted by teams across Sacramento & nationwide</p>` with 4–6 gray pill boxes labeled "Client Logo" in muted text
   - When logos are provided: replace with actual `<img>` elements, grayscale by default, full-color on hover
   - Background of strip: `--color-surface` (#F5F5F5), full-width, `padding-block: 1.5rem`
   - See HANDOFF.md — owner must supply logos

**Column 2 — Visual (terminal widget):**
- Retain the terminal code widget — dark terminal on a light page is idiomatic and trusted (used by Vercel, Supabase, Railway)
- Terminal frame: bg `#1a1a2e` (near-black, structure-adjacent but clearly a UI artifact), border-radius `16px`
- Terminal header dots: keep red/yellow/green
- Code syntax colors: keep existing (these are inside a dark frame — not subject to site color rules)
- Add subtle `box-shadow: 0 8px 40px rgba(33,33,33,0.15)` on the terminal card
- Three floating badges (🔐 Zero-Trust Security, 🤖 AI-Powered, ⚡ High Performance): restyle
  - bg: `--color-card` (#FFFFFF), border `--border`, shadow `--shadow-card`
  - text: `--text-primary`, weight 600, `0.78rem`
  - No accent color on these — they're informational, not CTAs

**Responsive (tablet ≤ 1024px)**: Column 2 hidden, column 1 centered, max-width 640px.
**Responsive (mobile ≤ 640px)**: Single column, text centered, CTAs centered.

**Scroll indicator**: Keep the animated vertical line at bottom center — replace gradient from `var(--indigo-light)` to `rgba(33,33,33,0.2) → --color-accent → transparent`.

---

### Section 2: About (`#about`)

**Layout**: Two-column grid (`1fr 1fr`), gap 4rem, align-items center.
**Background**: `--color-surface` (#F5F5F5)
**Tag**: "Who We Are"

**Left — content column:**
- H2 (exact copy): "The Boutique Difference in Enterprise-Grade Software"
  - "Enterprise-Grade Software" on second line: bold weight only, no color change
- 3 paragraphs (exact copy preserved): `--text-secondary`, `1.02rem`, `line-height: 1.80`
- `strong` inline: `--text-primary`, weight 600
- Compliance badges row:
  - Restyle: bg `rgba(33,33,33,0.06)`, border `rgba(33,33,33,0.14)`, text `--text-primary`, weight 600, `0.80rem`
  - Icon color: `--text-primary` (shield SVGs)
  - Badges: Security-First | Privacy-Aware | Encrypted by Default | Senior-Led Delivery

**Right — cards column (3 stacked cards):**
- Each card: `--color-card`, border `--border`, `border-radius: --radius`, `padding: 1.4rem`, hover: `translateX(4px)`, border-color `--border-hover`
- Left accent bar: 3px solid
  - Card 1 (Enterprise Security 🔐): `--color-structure` left bar
  - Card 2 (High Performance ⚡): `--color-structure` left bar
  - Card 3 (AI-First Approach 🤖): `--color-accent` left bar — ⚠️ this is decorative. Replace with `--color-structure`. No accent use on decorative bars.
  - All left bars: `--color-structure` (#212121)
- Icon: `1.5rem` emoji in `42×42px` bg `--color-surface`, `border-radius: 10px`
- Card H4: `--text-primary`, Public Sans 600
- Card p: `--text-secondary`, `0.88rem`

---

### Section 3: Services (`#services`)

**Layout**: `--color-base` (#FFFFFE) background.

**Header**:
- Tag: "What We Build"
- H2: "Comprehensive Software Services"
- Subtitle (exact copy): full width, centered, max-width 680px

**Services Grid (6 cards, 3×2 desktop)**:
- 3 columns desktop, 2 columns tablet (≤ 1024px), 1 column mobile (≤ 640px)
- Each card: `--color-card`, border `--border`, `border-radius: --radius-lg`, `padding: 1.8rem`, hover `translateY(-4px)` + `--shadow-elevated`

**Card icon square (52×52)**:
- Replace indigo/cyan/gold colored icon backgrounds with a unified style:
  - All service icons: bg `rgba(33,33,33,0.05)`, border `rgba(33,33,33,0.12)`, icon SVG color `--text-primary`
  - This keeps visual hierarchy without decorative color misuse
- ⚠️ Current cards use `--cyan` and `--gold` accented variants. These must be removed per brand spec.

**Card typography**:
- Title (H3): `--text-primary`, Public Sans 600, `1.1rem`
- Description: `--text-secondary`, `0.9rem`, `line-height: 1.72`
- Feature list items: `--text-secondary`, `0.83rem`, bullet = `3px` dot in `--text-muted`
- "Inquire →" link: `--text-primary`, Public Sans 600, `0.85rem`, underline `--color-accent` on hover

**Featured Service ("AI Improvement Implementation Consulting")**:
- Full-width card, horizontal layout: content left, CTA button right
- Background: `--color-surface` (#F5F5F5), border `1.5px solid --border-hover`
- Badge "Flagship Service": bg `--color-structure`, text `--text-on-dark`, `0.72rem` uppercase pill
- CTA button: Primary ("Start Your AI Journey →") — `--color-accent` bg, `--text-on-accent` text
- On mobile: stack to column, CTA full-width

---

### Section 4: The AO AI Platform (`#the-ao-ai`)

**Layout**: Full-width, background `--color-structure` (#212121) — a dark container section that draws attention and breaks visual rhythm. This is the 30% structure usage.

**Header (centered)**:
- Tag: "Our Platform" — on dark bg: bg `rgba(255,255,255,0.1)`, border `rgba(255,255,255,0.2)`, text `--text-on-dark`
- H2: "Built In-House. Deployed Worldwide." + line 2: "The AO AI Platform"
  - Color: `--text-on-dark` (#FFFFFE)
  - "The AO AI Platform" italic weight — no accent color (fails contrast on dark bg at `#33E7FF` text level)
  - ⚠️ `#33E7FF` on `#212121` has 11.5:1 contrast — it IS accessible as text here. Acceptable single use: the product name "The AO AI Platform" may use `--color-accent` as text color ONLY in this heading, since this is the product's primary call-out moment. This is a conversion element. Document this exception.
- Subtitle: `--text-on-dark` at 70% opacity

**Main Card** (The AO AI showcase):
- Background: `rgba(255,255,255,0.05)`, border `rgba(255,255,255,0.12)`, `--radius-lg`
- Glow effect: radial gradient overlays — acceptable as section chrome (bg decoration, not accent misuse)

**Left panel — headline + stats + CTAs**:
- H3 (exact copy): "Manage Every AI & Automation Project with Intelligent Precision" — `--text-on-dark`
- Body (exact copy): `--text-on-dark` at 70% opacity
- Stats strip (98% On-Time | 3× Faster | 500+ Teams | 40+ APIs):
  - Stat value: Public Sans 800, `2rem`, `--color-accent` — ✅ acceptable: numbers in a high-conversion stats strip on the dark section function as emphasis anchors
  - Stat label: `--text-on-dark` 60% opacity, `0.75rem`
- CTAs:
  - Primary: "Launch The AO AI →" (external link) — `--color-accent` bg, `--text-on-accent` text
  - Ghost: "Request a Demo →" — ghost style (white outline)

**Right panel — 6 feature list**:
- Each feature: icon + H4 + description
- Icon bg: `rgba(255,255,255,0.1)`, icon color `--color-accent` — ✅ acceptable: icons function as conversion-adjacent visual guides within the product showcase
- H4: `--text-on-dark`, `1rem`, weight 600
- p: `--text-on-dark` 65% opacity, `0.9rem`
- Hover: border-left `--color-accent` 2px on feature item

**How It Works (3 steps)**:
- Horizontal row of 3 numbered cards within the dark section
- Number: Public Sans 800, `2.5rem`, `rgba(255,255,255,0.08)` (ghost number)
- H4: `--text-on-dark`
- p: `--text-on-dark` 65% opacity
- Connector line between cards: `rgba(255,255,255,0.15)`, 1px dashed

**Integration chips**:
- Chip label: `rgba(255,255,255,0.6)`, `0.82rem`, italic
- Chips: bg `rgba(255,255,255,0.08)`, border `rgba(255,255,255,0.15)`, text `--text-on-dark`, `0.83rem`
- "+32 more" chip: same style, slightly muted

**Compliance badges** (Security-First, Privacy-Aware, Enterprise-Grade):
- bg `rgba(255,255,255,0.08)`, border `rgba(255,255,255,0.15)`, text `--text-on-dark`, `0.80rem`

---

### Section 5: Why JART (`#why-us`)

**Layout**: `--color-surface` (#F5F5F5) background.

**Header**:
- Tag: "Why JART"
- H2 (exact copy): "The Standard Others Aspire To"
- Subtitle (exact copy preserved)

**Grid**: 3×2 on desktop, 2×3 on tablet, 1×6 mobile.

**Card style**:
- `--color-card`, border `--border`, `--radius-lg`, `padding: 2rem`
- Ghost number (top-left): Public Sans 800, `3rem`, `rgba(33,33,33,0.06)` — atmospheric, not meant to be read
- Icon: SVG, `--text-primary` color, `28×28px`
- H3: `--text-primary`, `1.1rem`, weight 600
- p: `--text-secondary`, `0.9rem`, `line-height 1.75`
- Hover: `translateY(-4px)`, `--shadow-elevated`, border `--border-hover`

---

### ⚠️ NEW SECTION: Client Results / Social Proof (Owner Must Provide Data)

**Position**: Between Why JART and Process sections (high-gravity mid-page real estate).

**Layout**: Dark section (`--color-structure` bg) — creates visual contrast rhythm with the AO AI section above.
**Tag**: "Client Impact" (on dark, white-style tag)
**H2**: "Results That Speak for Themselves"
**Subtitle**: "From Sacramento startups to nationwide enterprises — real outcomes from real engagements."

**Content structure**: 3-column metrics grid
- Each column: a large metric value + label + brief description
- Example placeholder (Code Agent must render as placeholder, NOT as real claims):
  ```
  [METRIC PLACEHOLDER 1]
  Label: Efficiency Increase
  Description: Owner to provide
  
  [METRIC PLACEHOLDER 2]  
  Label: Average Annual Cost Savings
  Description: Owner to provide
  
  [METRIC PLACEHOLDER 3]
  Label: Faster Deployment
  Description: Owner to provide
  ```
- Metric value: Public Sans 800, `3rem`, `--color-accent` — ✅ these function as conversion anchors in a high-gravity section
- Label: `--text-on-dark`, `1rem`, weight 600
- Description: `--text-on-dark` 65% opacity, `0.9rem`

**Below metrics**: 2–3 testimonial cards in a row
- Each: dark card `rgba(255,255,255,0.05)`, border `rgba(255,255,255,0.1)`, `--radius-lg`
- Quote: italic, `--text-on-dark` 85%, `1rem`
- Attribution: name + role + company — `--text-on-dark` 60%, `0.84rem`
- Placeholder: render as 3 gray cards with "Client testimonial coming soon" text
- ⚠️ **HANDOFF NOTE**: Owner must supply 3 real testimonials + permission to publish. Section must remain as placeholder until provided.

---

### Section 6: Process (`#process`)

**Layout**: `--color-base` (#FFFFFE)

**Header**:
- Tag: "How We Work"
- H2: "Our Proven Process"
- Subtitle (exact copy): "A structured, transparent approach ensuring every project is delivered on time, on budget, and exceeds expectations."

**Step Layout change**: Horizontal card row on desktop (vs current vertical list).
- 5 cards in a row (`repeat(5, 1fr)` grid, gap `1rem`)
- On tablet (≤ 1024px): 3 columns, then 2 on wrap
- On mobile (≤ 640px): single column vertical

**Each step card**:
- Background: `--color-card`, border `--border`, `--radius`, `padding: 1.8rem 1.4rem`
- Number circle: `48×48px`, bg `--color-structure`, text `--text-on-dark`, Public Sans 800, `0.9rem`
- H3 (exact copy preserved): `--text-primary`, weight 600, `1rem`, margin-top `1rem`
- p (exact copy preserved): `--text-secondary`, `0.88rem`, `line-height 1.75`
- Connector between cards: horizontal dashed line `1px rgba(33,33,33,0.15)` at card midpoint, hidden on mobile

**Step content (exact copy — do not change)**:
1. Discovery & Strategy
2. Design & Architecture
3. Build & Test
4. Deploy & Launch
5. Support & Evolve

---

### Section 7: Service Area (`#service-area`)

**Layout**: `--color-surface` (#F5F5F5)

**Header**:
- Tag: "Where We Work"
- H2: "Proudly Serving Sacramento & Beyond"
- Subtitle (exact copy preserved)

**3-column grid**: Sacramento Metro | Northern California | Nationwide & Remote

**Region cards** (left two):
- `--color-card`, border `--border`, `--radius-lg`, `padding: 1.8rem`
- Header row: icon + H3 — icon bg `rgba(33,33,33,0.06)`, SVG `--text-primary`
- List items: `--text-secondary`, `0.9rem`, left dot marker `--text-muted`

**Nationwide CTA card** (third column):
- Background: `--color-structure` (#212121) — this is the right-rail dark panel referenced in owner mockup
- Title: "Nationwide & Remote" — `--text-on-dark`, weight 700
- p (exact copy preserved): `--text-on-dark` 70% opacity
- CTA: "Book a Free Consultation →" — Primary button (`--color-accent` bg)
- Globe icon: `--color-accent` — ✅ icon within a CTA-adjacent element on dark bg

**Owner mockup reference "Partner with Jart to Scale Your Vision" panel**:
- This dark panel in the mockup maps to the Nationwide CTA card + contact info items
- In the spec, this can be expanded: add contact detail (email: `hello@jartsoftwaresolutions.com`) + location line "Sacramento, CA · Serving Nationwide" + services bullet list as quick reference
- This is all content that already exists in the HTML — no new copy

---

### Section 8: FAQ (`#faq`)

**Layout**: `--color-base` (#FFFFFE)

**Header**:
- Tag: "Expert Answers"
- H2: "AI Readiness & Software Development — FAQ"
- Subtitle (exact copy preserved)

**FAQ Accordion** (10 items — all existing Q&A copy preserved):

**Question button**:
- bg `--color-card`, border `--border`, `--radius`, `padding: 1.2rem 1.4rem`
- text: `--text-primary`, Public Sans 600, `1rem`
- `+` / `×` icon: `--text-muted`, transitions to `--color-accent` when expanded — ✅ active/expanded interactive indicator, acceptable accent use
- Hover: border `--border-hover`, bg `--color-card-hover`
- `aria-expanded="false"` / `"true"`

**Answer panel**:
- bg `--color-surface`, border-left `2px solid --border`, `padding: 1.2rem 1.4rem 1.4rem`
- p: `--text-secondary`, `0.95rem`, `line-height 1.78`
- `strong`: `--text-primary`

---

### Section 9: Contact (`#contact`)

**Layout**: `--color-base` (#FFFFFE)

**Header**:
- Tag: "Get In Touch"
- H2: "Start Your Project"
- Subtitle: "Ready to build something exceptional? Tell us about your project — we respond within one business day."

**2-column grid**: Left info panel (`1fr`) | Right form (`1.6fr`)

**Left — Contact Info Panel**:
- No card background — sits on page canvas
- 4 info items with icon + heading + text (exact copy preserved):
  1. Email Us → `hello@jartsoftwaresolutions.com`
  2. Response Time → "Within 1 business day — from a real senior team member, not a bot."
  3. Confidentiality → "All inquiries are treated with complete confidentiality. NDAs available upon request."
  4. Sacramento, CA — & Nationwide → local + remote text
- Info icon squares: `42×42px`, bg `rgba(33,33,33,0.06)`, border `rgba(33,33,33,0.12)`, SVG `--text-primary`
- H4: `--text-primary`, `1rem`, weight 600
- p/link: `--text-secondary`, `0.9rem`
- Email link: `--color-structure`, underline in `--color-accent` on hover — ✅ interactive link

**Promise box**:
- bg `--color-surface`, border `--border`, `--radius`, `padding: 1.4rem`
- H4: "Our Promise" — `--text-primary`
- p: `--text-secondary`, `0.88rem`

**Right — Contact Form**:
- Container: `--color-card`, border `--border`, `--radius-lg`, `padding: 2.4rem`, `--shadow-card`
- Fields: bg `--color-surface`, border `--border`, focus: border `--color-accent`, ring `rgba(51,231,255,0.25)` — ✅ focus ring is an interactive signal
- Label: `--text-primary`, weight 600, `0.85rem`
- Placeholder: `--text-muted`
- Error state: border `#DC2626`, ring `rgba(220,38,38,0.15)`
- Submit button: Primary full-width ("Send Message") — `--color-accent` bg, `--text-on-accent`
- Disclaimer text: `--text-muted`, `0.78rem`, center-aligned
  - "Privacy Policy" link: `--text-secondary`, underline — ✅ interactive link

**Form success state**:
- bg `rgba(34, 197, 94, 0.08)`, border `rgba(34, 197, 94, 0.3)`, `--radius`
- Text: `#15803D`, success checkmark icon

---

### Section 10: Footer (`<footer>`)

**Layout**: `--color-structure` (#212121) background.

**Grid**: `1.8fr 1fr 1fr 1fr` on desktop, `1fr 1fr` on tablet, `1fr` on mobile.

**Brand column**:
- Logo: Use brand **wordmark** at this larger size
  - Description for Code Agent: "JART" in Public Sans 800, `--text-on-dark`, followed by `--color-accent` horizontal arrow line extending right beneath the word, then "Software Solutions" in Public Sans 600 below in `--text-on-dark` at 70% opacity
- Tagline (exact copy): "State-of-the-art boutique software & AI consulting firm. Building secure, compliant, and high-performance solutions for teams of every size."
  - `--text-on-dark` 55% opacity, `0.88rem`, `line-height 1.75`

**Link columns** (Services | Company | Legal & Compliance):
- Column title: `--text-on-dark`, uppercase, weight 700, `0.80rem`, letter-spacing `0.1em`, margin-bottom `1rem`
- Links: `--text-on-dark` 50% opacity, `0.88rem`, hover `--text-on-dark` 100% with underline `--color-accent` — ✅ interactive link hover
- "Launch The AO AI ↗": same link style + external arrow
- All existing footer links preserved exactly as in current HTML

**Footer bottom bar**:
- Top border: `rgba(255,255,255,0.08)`
- Left: "© 2026 JART Software Solutions. All rights reserved." — `--text-on-dark` 40% opacity, `0.84rem`
- Right: "Built with security. Engineered for scale." — same, italic

---

## Trust Signal Placement Summary

| Signal | Location | Proximity to CTA |
|--------|----------|-----------------|
| 5★ Rated | Hero stats strip | Within hero CTAs |
| 100% Senior-Led | Hero stats strip | Within hero CTAs |
| Security-First + Privacy-Aware badges | About + AO AI + Why JART | ≤ 2 sections from hero CTA |
| Platform stats (98%, 3×, 500+, 40+) | AO AI section | Product proof before midpage CTA |
| Client results metrics | Social proof section (new) | Mid-page before process |
| Testimonials | Social proof section (new) | Placeholder — pending owner |
| Location (Sacramento, CA) | Hero badge + Contact info | Both above-fold and in contact |
| "1 business day response" | Contact info column | Adjacent to form submit |
| Confidentiality + NDA offer | Contact info column | Adjacent to form submit |
| Trusted-by logo strip | Below hero | Immediately after primary CTAs |

---

## CTA Hierarchy

| Priority | CTA Text | Destination | Style | Location |
|----------|----------|-------------|-------|----------|
| 1 (Primary) | "Free Consultation →" | `#contact` | Primary button | Hero |
| 1 (Primary) | "Explore Services" | `#services` | Primary button | Hero |
| 2 (Section) | "Start Your AI Journey →" | `#contact` | Primary button | Services featured card |
| 2 (Section) | "Launch The AO AI →" | `https://theaoai.com/` | Primary button | AO AI section |
| 2 (Section) | "Request a Demo →" | `#contact` | Ghost button | AO AI section |
| 2 (Section) | "Book a Free Consultation →" | `#contact` | Primary button | Service Area |
| 3 (Page) | "Send Message" | form submit | Primary full-width | Contact form |
| 3 (Page) | "Get Started" | `#contact` | Accent nav link | Nav (always visible) |
| 4 (Inline) | "Inquire →" | `#contact` | Text link with underline | Service cards |

---

## Animation & Interaction Notes

All animations must respect `prefers-reduced-motion: reduce`.

| Element | Animation | Spec |
|---------|-----------|------|
| `.reveal` elements | Fade + translateY(24px → 0) | Duration `0.60s`, ease `cubic-bezier(0.4,0,0.2,1)`, triggered by IntersectionObserver at 12% threshold |
| Stagger in grids | Delay multiplied per card index | `index × 80ms` |
| Primary button hover | `translateY(-2px)` + accent shadow | Duration `0.20s` |
| Service cards hover | `translateY(-4px)` + shadow | Duration `0.25s` |
| Why cards hover | `translateY(-4px)` + shadow | Duration `0.25s` |
| Hero terminal widget | `float-up-down` (0 → -12px → 0) | Duration `6s`, infinite, ease-in-out |
| Floating badges | `badge-float` with rotation var | 4.8–5.5s offset each |
| FAQ icon | `rotate(45deg)` on expand | Duration `0.25s` |
| FAQ answer panel | `max-height` expand | `0 → auto`, use JS height transition |
| Nav "Get Started" | `translateY(-1px)` | Duration `0.20s` |
| Scroll progress line | Keep hero scroll indicator | `float-up-down` 2s |
| Hero badge dot | `pulse-orb` | 2s infinite |

---

## Accessibility Notes

| Concern | Specification |
|---------|--------------|
| Skip nav | `<a href="#main-content" class="skip-link">Skip to main content</a>` hidden above nav, visible on focus |
| Nav landmark | `<nav aria-label="Main navigation">` ✅ already present |
| ARIA landmark roles | `<main>`, `<header>`, `<footer>`, `<section aria-label="...">` for all sections |
| Focus order | Tab order: skip link → nav → hero CTA → section CTAs → form → footer |
| Focus ring | `outline: 2.5px solid --color-accent; outline-offset: 3px` — ✅ accent use on interactive elements |
| Contrast: body text on base | `--text-primary` (#212121) on `--color-base` (#FFFFFE) → 16.1:1 ✅ AAA |
| Contrast: secondary text on base | `--text-secondary` (#4B5563) on `--color-base` → 7.3:1 ✅ AAA |
| Contrast: muted text on base | `--text-muted` (#9CA3AF) on `--color-base` → 2.9:1 ❌ — use only for decorative/non-essential text |
| Contrast: text-on-dark on structure | `--text-on-dark` (#FFFFFE) on `--color-structure` (#212121) → 16.1:1 ✅ AAA |
| Contrast: text-on-accent on accent | `--text-on-accent` (#212121) on `--color-accent` (#33E7FF) → 11.5:1 ✅ AAA |
| Contrast: accent as text on base | `#33E7FF` on `#FFFFFE` → 1.4:1 ❌ — NEVER use accent as text on light background |
| Contrast: accent as text on structure | `#33E7FF` on `#212121` → 11.5:1 ✅ — acceptable as text in dark sections only |
| Form labels | All `<label for="...">` already associated ✅ |
| Required fields | `<abbr title="required">*</abbr>` ✅ already present |
| Form error messages | `role="alert"`, `aria-live="polite"` ✅ already present |
| FAQ accordion | `aria-expanded`, `aria-controls` already present ✅ |
| Images | All decorative SVGs have `aria-hidden="true"` ✅ |
| Stats section | `aria-label="Key statistics"` ✅ |
| Hero section | `aria-label="Hero"` ✅ |
| `prefers-reduced-motion` | Already present in CSS ✅ — retain |

---

## Implementation Notes for Code Agent

1. **Font swap**: Replace ALL instances of `'Inter'` and `'Syne'` throughout the CSS with `'Public Sans'`. Update the Google Fonts `<link>` in ALL 6 HTML files (index + 5 legal). New URL: `https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap`

2. **Color system rebuild**: Delete all current CSS custom properties in `:root`. Replace with the new token set in Component Specs above. Search for every hardcoded color (`#030b18`, `#6366f1`, `#06b6d4`, `#f59e0b`, `#818cf8`, `#22d3ee`, `#4338ca`) and replace with token references.

3. **Logo replacement**: The current nav SVG (laptop icon with gradient) must be replaced in ALL 6 HTML files. The icon mark SVG is a design artifact — see HANDOFF.md for what owner must provide. Code Agent: implement a temporary text-only logo "JART" in Public Sans 800 with a `--color-accent` box or border until the final SVG is delivered.

4. **New section — Social Proof**: Add a new `<section id="social-proof">` between `#why-us` and `#process`. Render with placeholder content (no real metrics). Structure: dark section, 3 metric placeholders, 3 testimonial card placeholders. Mark each placeholder with `<!-- PLACEHOLDER: Owner to provide -->` HTML comment.

5. **Process section layout**: Change `.process__steps` from a flex-column to a CSS grid (`grid-template-columns: repeat(5, 1fr)`) on desktop. Add horizontal connector lines via CSS `::before` pseudo-elements on each `.process__step-marker`. On tablet, collapse to 3 columns; on mobile, revert to single column.

6. **Trusted-by strip**: Add immediately below hero section (before or after `#about`). Use a `<div class="trusted-by">` with `aria-label="Trusted by"`. Render 4–6 placeholder logo boxes (`<div class="logo-placeholder">Client Logo</div>`). Mark with HTML comment.

7. **Remove decorative color usage**: All `.service-card--cyan`, `.service-card--gold` classes used only as color accents must have their tinted border/icon colors replaced with the unified structure-based palette. Keep the CSS class names for JS hook purposes but reset the color values.

8. **Dark section text**: On `--color-structure` section backgrounds, all `<p>` elements must have explicit `color: var(--text-on-dark)` with `opacity: 0.7`. Do not rely on `var(--text-secondary)` which will be mid-gray — illegible on dark.

9. **Nav active state**: Change `nav__link--active` underline from `var(--indigo-light)` to `var(--color-accent)`.

10. **FAQ expand icon**: Change icon color from `var(--indigo-light)` to `--text-primary` default; `--color-accent` on expanded state.

11. **Form focus ring**: Change from `rgba(99,102,241,0.18)` to `rgba(51,231,255,0.25)`.

12. **Gradient-text replacement**: Remove the `.gradient-text` class (indigo→cyan). Replace all instances with a CSS class `.text-emphasis` that applies: `color: var(--text-primary); font-style: italic;`

13. **`compliance__badge` colors**: Replace `color: var(--indigo-light)` and `background: var(--indigo-dim)` with structure-based values.

14. **Footer background**: Change from `var(--bg-primary)` (#030b18) to `var(--color-structure)` (#212121).
