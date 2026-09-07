# Research & Technical Decisions: Clean & Dynamic Carousel UI Redesign

**Feature**: `006-clean-carousel-ui-redesign`
**Date**: 2026-09-06
**Status**: Completed

## 1. Design Token System & Aesthetic Direction

### Context
The user requested a cleaner, more dynamic design based on `frontend-design` and `ui-ux-pro-max` skills, keeping the exact signature bioluminescent dark palette while eliminating heavy borders, cluttered decorative badges, and visual noise.

### Decision
- **Core Palette**:
  - Background Base: `#001413` (canvas deepest void)
  - Surface Mid: `#012624` (sidebar panels, backdrop blur cards)
  - Surface Card: `#002a27` (card containers, input backings)
  - Primary Glow / Accent: `#05ffd4` (bioluminescent cyan, WCAG AA compliant on dark surfaces)
  - Secondary Glow: `#c084fc` (phosphor lavender for subtle highlights)
  - Text Hierarchy: `#f5f7fa` (Platinum, primary headings/text), `#94a3b8` (Silver, secondary/metadata), `#64748b` (Muted/helper)
- **Restraint & Clean Principles** (`frontend-design`):
  - Cut arbitrary all-caps badges and heavy solid borders.
  - Standardize subtle border lines to `rgba(5, 255, 212, 0.12)` in resting state and `rgba(5, 255, 212, 0.5)` on focus/active.
  - Replace opaque heavy card containers with refined glassmorphic surfaces (`backdrop-filter: blur(12px)`).
  - Spend boldness on the central slide preview (hero element), keeping the chrome quiet and disciplined.

### Alternatives Considered
- *Full Light Mode / Dual Theme*: Rejected. The user explicitly stated "deixando ele com as mesmas cores de design, porém do jeito mais clean, mais dinâmico".
- *Flat Solid Gray Minimal*: Rejected. Loses the unique bioluminescent personality that makes the application memorable.

---

## 2. Left Sidebar Navigation Architecture

### Context
Currently, the Left Sidebar has 8 separate tabs (`slides`, `content`, `themes`, `theme-builder`, `typography`, `branding`, `docking`, `overlays`) rendered in an overflow-x scrolling tab bar. This causes visual clutter, horizontal scrolling friction, and cognitive overload.

### Decision
- Consolidate the 8 tabs into **4 Semantic Categories**:
  1. **Lâminas & Conteúdo** (`slides-content`):
     - Slide sequencing (thumbnails, reorder, add, duplicate, delete)
     - Text and template editing for active slide (Classic, Quote, Minimalist, Step)
  2. **Design & Cores** (`design-themes`):
     - Curated preset themes
     - Custom Theme & Gradient Builder (expandable or modal drawer)
  3. **Tipografia** (`typography`):
     - Global and per-slide font family selection (Inter, Playfair, Montserrat, Space Grotesk, Plus Jakarta Sans, etc.)
     - Title and body size adjustment
  4. **Marca & Elementos** (`brand-elements`):
     - Author signature (handle, avatar, shape, 6-anchor positioning)
     - Docked images & decorative overlays
- Navigation UI: High-contrast, clean 4-tab segmented navigation bar at the top of the sidebar with responsive pill indicators and no horizontal scrolling.

### Alternatives Considered
- *Icon Dock Rail*: Requires extra screen width or multi-level drawer expansion. Semantic 4-tab segmented control is cleaner and fits within 380px effortlessly.

---

## 3. Central Canvas Presentation & Dynamic Interactions

### Context
Clarification Q1 established the **Faixa Contínua Dinâmica** (continuous horizontal track) with active slide emphasis. Clarification Q3 established a **Seletor de Proporção (4:5 / 1:1)**.

### Decision
- **Continuous Dynamic Track**:
  - Horizontal scroll container with auto-centering on slide selection.
  - Active Slide: Scale `1.02`, elevated shadow `0 12px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(5, 255, 212, 0.2)`, full opacity `1.0`, glowing accent border.
  - Inactive Slides: Scale `0.97`, opacity `0.80`, subtle border `rgba(5, 255, 212, 0.1)`, hover cursor with smooth scale transition on mouse-enter.
  - Directional navigation: Floated, accessible circular buttons (44×44px hit target) with Chevron icons.
  - Keyboard Navigation: Left/Right arrows cycle through slides when canvas or workspace is focused.
- **Aspect Ratio Switching**:
  - Support two industry-standard aspect ratios:
    - **4:5 Portrait**: 380px × 475px (social vertical carousel, 1080×1350 equivalent)
    - **1:1 Square**: 380px × 380px (social square carousel, 1080×1080 equivalent)
  - Controlled via clean segmented pill toggle in the workspace top bar: `[ 4:5 ] [ 1:1 ]`.
  - Persisted in workspace state and respected during HTML-to-image export.

### Alternatives Considered
- *Arbitrary Custom Dimensions*: Overcomplicates layout with little user benefit. Preserving standard 4:5 and 1:1 covers 99% of social media use cases.

---

## 4. Top Bar & Workspace Chrome Polish

### Context
The current top bar has mixed elements. It needs to feel professional, minimal, and informative.

### Decision
- Three-zone top bar layout:
  - **Left**: Sidebar collapse/expand toggle button + Project title / breadcrumb.
  - **Center**: Aspect ratio toggle (`4:5` vs `1:1`) + Slide Counter badge (`Slide 2 de 8`).
  - **Right**: Export action dropdown/group (PNG/ZIP, PDF) + Script drawer toggle button.
- Micro-interactions:
  - Button hover: subtle background tint `rgba(5, 255, 212, 0.1)` + crisp active borders.
  - Transitions: `all 0.2s cubic-bezier(0.16, 1, 0.3, 1)`.

---

## 5. Script Intake Landing View Refinement

### Context
First impression when entering the app with no loaded project.

### Decision
- Single centered glassmorphic card (`max-width: 760px`) with subtle glowing radial border.
- Streamlined headline, sample script loader link, clean textarea, masked Gemini API key accordion, and prominent glowing CTA "Gerar Carrossel".
- Responsive loading spinner during generation without UI locking or layout shifting.
