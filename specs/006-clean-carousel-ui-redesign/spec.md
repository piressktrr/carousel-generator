# Feature Specification: Clean & Dynamic Carousel UI Redesign

**Feature Branch**: `006-clean-carousel-ui-redesign`

**Created**: 2026-09-06

**Status**: Draft

**Input**: User description: "com as duas últimas skills que eu que eu mandei sobre front-end e o UI UX, reformule a design da da página do carrossel, deixando ele com as mesmas cores de design, porém do jeito mais clean, mais dinâmico, conforme as bases que as skills oferecem."

## Clarifications

### Session 2026-09-06

- Q: Como o palco central de slides deve apresentar o carrossel para garantir uma navegação mais limpa e dinâmica? → A: Option B - Faixa Contínua Dinâmica (todos os slides em sequência horizontal fluida, com o slide selecionado em evidência com escala e glow suaves, rolagem suave automática e contador dinâmico).
- Q: Como as opções da barra lateral esquerda (atualmente divididas em 8 abas separadas) devem ser organizadas para evitar sobrecarga visual e garantir um fluxo de trabalho mais limpo? → A: Option A - 4 Categorias Semânticas (agrupamento coeso em 4 abas compactas e legíveis: Lâminas & Conteúdo, Design & Temas, Tipografia e Marca & Elementos, eliminando a rolagem horizontal de abas).
- Q: O carrossel deve incluir um seletor rápido no topo para alternar entre formato Retrato (4:5) e Quadrado (1:1), ou manter exclusivamente o formato vertical 4:5? → A: Option A - Seletor de Proporção (4:5 e 1:1) com alternância dinâmica no cabeçalho do canvas e readequação fluida das lâminas.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Clean & Focused Carousel Stage with Dynamic Slide Interaction (Priority: P1)

As a content creator, I want an uncluttered, high-focus canvas where the active slide stands out prominently with smooth navigation, pagination indicators, and responsive controls, so that I can preview and refine my carousel visually without visual noise or cognitive overload.

**Why this priority**: The slide canvas is the hero element of the entire product. Creators spend most of their time looking at the slide preview; making it clean, legible, and dynamically responsive directly elevates the perceived quality, usability, and speed of content creation.

**Independent Test**: Can be tested independently by loading any carousel project, verifying that the active slide is the clear visual focal point, navigating through slides via arrows and pagination, and verifying smooth transitions without layout shifts.

**Acceptance Scenarios**:

1. **Given** a loaded carousel with multiple slides, **When** viewing the central canvas, **Then** the active slide is visually prominent with clear elevation and focus, while neighboring slides recede gracefully with subtle hierarchy.
2. **Given** multiple slides on the canvas, **When** the user clicks directional navigation buttons, clicks a slide, or uses keyboard navigation, **Then** the view transitions smoothly to center the selected slide and immediately updates the slide position counter (e.g., "Slide 3 de 8").
3. **Given** the canvas viewport, **When** the user toggles between aspect ratios (e.g., 4:5 portrait and 1:1 square), **Then** all slides adapt fluidly and maintain balanced typographic proportions without content overflow.

---

### User Story 2 - Minimalist, Intuitive Workspace Chrome & Sidebars (Priority: P2)

As a creator, I want the sidebar panels (slide management, styling, branding, and script editor) to have a quiet, disciplined layout with clear information hierarchy, high-contrast readable controls, and fluid collapsible transitions, so that the editing experience feels effortless, modern, and distraction-free.

**Why this priority**: The editing toolbars contain many controls (content, typography, themes, branding, docking). If crowded with heavy borders and decorative badges, they distract from the content. A restrained, clean design following UI/UX intelligence keeps tools accessible without cluttering the screen.

**Independent Test**: Can be tested independently by toggling sidebars open/closed, navigating through all tool tabs, and modifying properties, verifying smooth transitions, intuitive grouping, and high readability.

**Acceptance Scenarios**:

1. **Given** the workspace with both toolbars open, **When** the user toggles the sidebar visibility, **Then** panels collapse or expand smoothly with responsive width adjustments and without horizontal scrollbars or jumping content.
2. **Given** the Left Sidebar, **When** switching between configuration tabs (Slides, Themes, Typography, Branding, Overlays), **Then** navigation transitions feel immediate with clear active state indicators and zero redundant chrome.
3. **Given** interactive controls (inputs, color pickers, select dropdowns, position matrices), **Then** each control has accessible touch/click boundaries (minimum 40px height for interactive targets), high-contrast labels, and subtle micro-interactions on hover and focus.

---

### User Story 3 - Streamlined & Inviting Script Intake Landing View (Priority: P3)

As a new or returning user, I want the initial script intake view to be clean, inviting, and dynamic while preserving the signature bioluminescent dark theme, offering a distraction-free text input area, quick-start sample loader, and clear feedback during slide generation, so that creating a carousel begins with zero friction.

**Why this priority**: The intake view is the first impression of the application. A clean, focused hero card with balanced typography and responsive action states sets the tone for the entire user experience.

**Independent Test**: Can be tested independently by opening the app with a cleared workspace, testing sample loading, text input, API key section toggle, and slide generation trigger.

**Acceptance Scenarios**:

1. **Given** the app is opened without an active project, **When** the landing view renders, **Then** the user sees a single, well-proportioned intake card centered on a subtle radial dark backdrop with clear typography and no decorative clutter.
2. **Given** the script input area, **When** text is typed or the sample script button is clicked, **Then** the action button dynamically reflects ready status with smooth hover states and glowing accent cues.
3. **Given** the generation form is submitted, **When** generation begins, **Then** clear progress feedback is shown with responsive loading indicators without jarring layout shifts.

---

### Edge Cases

- **Very long carousel (15+ slides)**: The canvas horizontal track and slide counter must remain performant, allowing quick jumping across slides without lag or overflow clipping.
- **Small laptop screens / compact viewports**: Sidebars must adapt gracefully or collapse automatically to ensure the central slide canvas always has adequate preview space (minimum 320px width).
- **Extreme text length on slides**: Long headlines or body paragraphs must maintain legible padding and not clip or overlap with profile signatures or headers.
- **Rapid switching between tabs**: Fast switching between sidebar tabs must render immediately without flickering or unmounting active inputs.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST maintain the project's signature color identity (abyssal dark teal backgrounds, bioluminescent cyan primary accents, lavender secondary accents, and platinum text) while eliminating heavy borders, arbitrary dark shadows, and redundant decorative badges.
- **FR-002**: The central canvas MUST present slides in a continuous dynamic horizontal track, with the active slide highlighted in clear focus (subtle elevation, soft glow, and scale accent) while supporting smooth directional navigation, slide position counters, and keyboard arrow controls.
- **FR-003**: The canvas MUST feature a clear, clean position indicator (e.g., current slide index and total slides) and smooth directional navigation buttons with touch/click areas of at least 40×40px.
- **FR-004**: Sidebars (Left Sidebar for tools/slides and Right Sidebar for raw script) MUST have fluid collapse/expand animations (under 300ms) that adjust the canvas area dynamically.
- **FR-005**: Sidebar tab navigation MUST organize editing capabilities into 4 distinct semantic categories (Lâminas & Conteúdo, Design & Temas, Tipografia, Marca & Elementos) using clean icon-and-label tabs with subtle active pills, eliminating horizontal overflow and cluttered button strips.
- **FR-006**: Form controls, inputs, and sliders MUST use consistent border tokens (`rgba(5, 255, 212, 0.15)` resting, `rgba(5, 255, 212, 0.6)` focus), subtle background tints, and visible focus rings that meet accessibility standards.
- **FR-007**: Typography across all workspace elements MUST follow a clear typographic scale with intentional weights (e.g., 600/700 for headings, 400/500 for body/labels) and eliminate arbitrary all-caps labels in favor of sentence-case clarity.
- **FR-008**: The top header bar MUST be streamlined to display essential workspace information (project title, slide count badge, sidebar toggle buttons, and export actions) with clean alignment and balanced spacing.
- **FR-009**: The initial script input view MUST feature an uncluttered, modern glassmorphic card with clear instructions, intuitive action buttons, and responsive feedback during slide generation.
- **FR-010**: All micro-interactions (button hovers, tab clicks, slide selections, toggle switches) MUST provide immediate, smooth visual feedback using cubic-bezier easing.
- **FR-011**: The system MUST provide an aspect ratio selector in the canvas header allowing users to toggle between Portrait (4:5) and Square (1:1) preview formats, updating slide geometry dynamically without clipping content.

### Key Entities

- **Workspace Layout**: The three-column responsive layout comprising Left Sidebar (tools/slides), Central Canvas (slide stage and navigation), and Right Sidebar (script drawer), governed by collapsible state flags and dynamic flex dimensions.
- **Slide Card Presentation**: The visual render entity of an individual slide in the canvas, featuring theme-driven gradients, typographic hierarchy, aspect ratio container (1:1 or 4:5), and anchor-positioned profile signature.
- **Design Tokens**: Standardized CSS variables for background tones, accent glows, border opacities, corner radii, and typographic sizing that enforce consistency across the application.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Slide navigation transitions between any adjacent slides complete smoothly in under 200ms with zero visible judder or layout shifting.
- **SC-002**: 100% of text elements and interactive controls meet or exceed WCAG 2.1 AA contrast ratio (minimum 4.5:1 for normal text and 3:1 for large text/icons) against their backgrounds.
- **SC-003**: All interactive buttons, tabs, and toggles have a minimum clickable hit target of 40×40px, preventing misclicks on touch and pointer devices.
- **SC-004**: Sidebar collapse and expand animations execute fluidly in under 300ms, seamlessly reallocating screen width to the canvas.
- **SC-005**: First-time users can locate key actions (add slide, change theme, export carousel, toggle script view) within 5 seconds of viewing the workspace.

## Assumptions

- The underlying functional logic (slide generation, theme resolution, IndexedDB storage, export to ZIP/PDF, Gemini script regeneration) remains intact; the redesign focuses on visual hierarchy, layout refinement, spacing, micro-interactions, and cleaner design execution.
- Existing custom themes and saved profiles will continue to render correctly with the refined tokens.
- Desktop and laptop screens (≥1024px) are the primary editing environment, with responsive graceful degradation down to tablet screens (≥768px).
