# Feature Specification: Per-Slide Signatures, Viewport Isolation & Canvas Design Themes

**Feature Branch**: `007-slide-signatures-canvas-themes`

**Created**: 2026-09-06

**Status**: Draft

**Input**: User description: "Permita que a pessoa escolha a posição da assinatura em cada slide individualmente. Também dê um jeito de arrumar essa questão de quando o roteiro ou as partes do carrossel estão escondidas ali na lateral e realmente fiquem escondidas, porque conforme você vai clicando nos slides, vai aparecendo uma ou outra e isso incomoda bastante no design. Também aplique as skills de Canva Design para a criação de temas personalizados."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Per-Slide Signature Positioning & Visibility Customization (Priority: P1)

As a content creator, I want to customize the author signature position (or hide it) on each slide individually, while retaining a global default, so that my signature never covers essential content, call-to-actions, or docked media on specific slides.

**Why this priority**: In multi-slide carousels, different slides have different visual structures (e.g., cover titles, large quotes, centered metrics, or bottom call-to-action buttons). A fixed global position often overlaps with content on particular slides. Per-slide control gives full creative freedom without sacrificing consistency across the rest of the carousel.

**Independent Test**: Can be tested independently by changing the signature position on Slide 2 to "Superior Direito", Slide 3 to "Ocultar", while leaving Slide 1 on the global default "Inferior Esquerdo", and verifying that each slide renders its signature strictly according to its setting.

**Acceptance Scenarios**:

1. **Given** a carousel with multiple slides, **When** the user selects a slide and changes its signature position in the editor (or chooses to hide it), **Then** only that active slide's signature updates its anchor position immediately, without altering other slides.
2. **Given** a slide without an individual position override, **When** the user changes the global profile position, **Then** that slide immediately follows the updated global default position.
3. **Given** a slide with an individual position override, **When** the user clicks "Redefinir para o padrão global", **Then** the slide clears its override and synchronizes with the global default position.

---

### User Story 2 - Complete Viewport Isolation for Collapsed Panels (Priority: P2)

As a creator, I want collapsed sidebars (the left tool panel and right script drawer) to remain 100% hidden and out of the viewport flow during slide selection, scrolling, and keyboard navigation, so that clicking or moving through slides never accidentally shifts the outer workspace or reveals hidden panels.

**Why this priority**: When navigating between slides in the canvas, browser layout shifts or uncontrolled scrollIntoView calls can accidentally reveal parts of collapsed sidebars, creating an unsettling visual glitch that degrades the user experience.

**Independent Test**: Can be tested independently by collapsing both sidebars, clicking rapidly on all slides across the canvas, and navigating via keyboard arrows, verifying that the central canvas scrolls cleanly without any horizontal bleed, jitter, or exposure of the hidden drawers.

**Acceptance Scenarios**:

1. **Given** the left or right sidebar is collapsed, **When** the user clicks any slide card in the canvas or presses arrow keys, **Then** the canvas scrolls internally without shifting the outer workspace viewport or revealing any portion of the collapsed panels.
2. **Given** collapsed sidebars, **When** the collapse animation finishes, **Then** the panels are completely isolated with strict layout containment (`visibility: hidden` and pointer events disabled) to prevent any ancestor container scroll leaks.

---

### User Story 3 - Canvas Design Philosophy for Custom Theme Creation (Priority: P3)

As a creator, I want the custom theme builder to incorporate design philosophy movements inspired by the Canvas Design skill (such as Chromatic Silence, Brutalist Joy, Kinetic Vapor, Minimalist Obsidian, and Ethereal Dawn), so that I can generate artistic, harmonious color palettes and background treatments with intentional aesthetic reasoning.

**Why this priority**: Rather than forcing creators to pick random raw hexadecimal colors, design philosophy movements provide curated artistic directions with proven spatial and chromatic balance, elevating the visual quality of carousels to professional design studio standards.

**Independent Test**: Can be tested independently by opening the custom theme builder, clicking on a design philosophy preset (e.g., "Brutalist Joy" or "Chromatic Silence"), verifying that coordinated colors, gradients, and font suggestions are generated instantly, and applying it to the carousel slides.

**Acceptance Scenarios**:

1. **Given** the Custom Theme Builder in the Design panel, **When** the user explores theme creation, **Then** a gallery of Canvas Design philosophy presets is available with artistic titles, descriptions, and color palettes.
2. **Given** a selected philosophy preset, **When** applied or adjusted, **Then** the theme generates harmonious slide backgrounds, primary glowing accents, and legible typography tokens that adhere to contrast guidelines.
3. **Given** a generated philosophy theme, **When** the user clicks save, **Then** the theme is saved to custom themes and instantly applied across the carousel.

---

### Edge Cases

- **Slide with hidden signature**: When a slide has its signature set to `'hidden'`, no signature DOM element or margin spacing should render on that slide.
- **Exporting with per-slide signatures**: When exporting to PNG (ZIP) or PDF, each slide must render its exact individual signature position as previewed in the workspace.
- **Resizing window while sidebars are collapsed**: The canvas viewport must stay centered on the active slide without horizontal overflow leaks.
- **Deleting a custom theme created via philosophy**: The system gracefully falls back to the default theme without breaking active slides.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Each slide entity MUST support an individual `profilePosition` property (`'top-left'`, `'top-center'`, `'top-right'`, `'bottom-left'`, `'bottom-center'`, `'bottom-right'`, `'hidden'`, or `null` for inheriting global default).
- **FR-002**: The Branding / Perfil tool panel MUST provide an individual position selector for the active slide, indicating whether the slide is currently inheriting the global default or has an override, with a quick "Redefinir para padrão" action.
- **FR-003**: The central slide card component MUST prioritize the slide's individual `profilePosition` over the global `profile.position`. If set to `'hidden'`, the signature must not render.
- **FR-004**: The canvas slide centering mechanism MUST calculate relative scroll offsets strictly on the canvas container (`stageRef.current.scrollTo({ left, behavior: 'smooth' })`), eliminating unbounded ancestor `scrollIntoView()` side-effects.
- **FR-005**: Both Left and Right sidebars MUST implement strict layout containment when collapsed (using `visibility: hidden` when inactive and CSS `contain: layout style`) to guarantee zero viewport leakage.
- **FR-006**: The Custom Theme Builder MUST provide curated Design Philosophy presets inspired by the `canvas-design` skill, including movements with defined chromatic palettes and aesthetic rationale:
  - *Chromatic Silence*: Deep muted slate, ethereal bioluminescent mist, high elegance.
  - *Brutalist Joy*: High-contrast dark charcoal with electric lime and ultraviolet accents.
  - *Kinetic Vapor*: Rich nocturnal indigo with radiant magenta and cyan glows.
  - *Ethereal Aura*: Soft abyssal deep teal with warm phosphor lavender and amber highlights.
  - *Minimalist Obsidian*: Pitch black with crisp ice blue and monochrome silver accents.
- **FR-007**: Users MUST be able to customize, preview, save, and delete themes generated from design philosophies.

### Key Entities

- **Slide Profile Position**: An attribute on the slide item (`profilePosition: string | null`) that specifies the 6-anchor positioning or hidden state for that specific slide.
- **Design Philosophy Preset**: An entity defining an art movement name, aesthetic rationale, background gradient/solid color, heading color, accent color, text color, and border styling.
- **Viewport Containment**: CSS and scrolling rules that prevent hidden drawer bleed into the visible canvas workspace.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of slide navigation events (clicking, keyboard arrows, next/prev buttons) execute with zero horizontal shift of the workspace frame or accidental exposure of collapsed drawers.
- **SC-002**: Creators can set, override, or hide the signature on any individual slide in 1 click, and revert to global default in 1 click.
- **SC-003**: All Canvas Design philosophy presets provide text and accent contrasts that meet or exceed WCAG 2.1 AA (≥4.5:1 for body text, ≥3:1 for headings/accents).
- **SC-004**: Custom themes created from philosophy presets save and persist across browser reloads via IndexedDB.

## Assumptions

- The global `profile.position` remains the default for all slides that do not have an explicit individual override.
- Existing projects without `profilePosition` on their slides will seamlessly inherit the global `profile.position` with zero migration overhead.
- Canvas Design themes integrate into the existing custom themes storage and selection architecture.
