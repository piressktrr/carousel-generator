# Implementation Plan: Slide Templates, Subtext, Enhanced Creator Branding & Studio Layout Refinement

**Branch**: `003-slide-templates-branding` | **Date**: 2026-09-05 (Updated 2026-09-06) | **Spec**: [spec.md](file:///D:/Carrosseis-Generator/specs/003-slide-templates-branding/spec.md)

**Input**: Refined feature specification from `specs/003-slide-templates-branding/spec.md`

## Summary

This plan addresses layout ergonomics, visual clarity, and scope pruning across the studio workspace:
1. **Dedicated Right Sidebar (`RightSidebar.jsx`)**: The complete raw script editor is relocated from the left panel to an independent right-side drawer with bulk regeneration and positional media preservation.
2. **Collapsible Dual-Sidebar Architecture**: Independent toggle controls allow users to collapse or expand the Left Sidebar and Right Sidebar on demand to maximize canvas workspace.
3. **Streamlined Export Toolbar**: Removal of PDF export from `ExportToolbar.jsx`, retaining only high-resolution PNGs packaged in a ZIP archive.
4. **Focused Slide Content Editor**: Removal of the legacy "Tipo de Slide" (Capa/Conteúdo/CTA) dropdown from `SlideContentTab.jsx`, keeping the interface focused purely on Main Text and Subtext.
5. **Dedicated Color Palette & Themes Tab (`ThemesTab.jsx`)**: Decoupled from font settings in the Left Sidebar into its own tab with previews of *Azul Celestial*, *Clean Ivory*, *Scandinavian Slate*, and *Light Clean*.
6. **Curated 3 High-Fidelity Slide Templates**: Simplified from 5 to 3 rock-solid, production-ready layouts: *Cartão Clássico* (`classic`), *Citação Editorial* (`quote`), and *Minimalista Foco* (`minimalist`).

---

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 18, Vite 5
**Primary Dependencies**: Tailwind CSS 3, Lucide React (zero heavy layout/animation libraries)
**Storage**: Client-side IndexedDB via pure functional wrapper (`storageService.js`)
**Testing**: Scenario-driven E2E verification via [quickstart.md](file:///D:/Carrosseis-Generator/specs/003-slide-templates-branding/quickstart.md) and production build validation (`npm run build`)
**Target Platform**: Modern desktop and tablet browsers (Chrome, Edge, Firefox, Safari)
**Project Type**: Single-page interactive creative studio web application
**Performance Goals**: Sidebar collapse transition < 200ms; template switch latency < 50ms; bulk raw script regeneration < 3s; 60fps render
**Constraints**: Fully offline-capable, zero external backend dependency, adherence to Clean Architecture and pure functions in `src/services/`
**Scale/Scope**: Carousels with 1 to 20 slides, 3 curated layout templates, 8 curated design themes

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Evidence / Architectural Choice |
|---|---|---|---|
| **I. Clean Architecture & SRP** | Business logic in pure service functions; single responsibility per module. | **PASS** | `RightSidebar.jsx` and `LeftSidebar.jsx` have single distinct responsibilities; pure state transformations isolated in `workspaceService.js`. |
| **II. Pragmatism (KISS/YAGNI)** | Simplest direct solution; zero redundant dependencies. | **PASS** | Pruned unstable templates (`bullets`, `stat`) and unused PDF export; CSS flexbox transitions for collapsible drawers. |
| **III. Safe Concurrency & Resilience** | Atomic state updates; safe handling of user inputs and storage errors. | **PASS** | Immutable updates in `StudioWorkspace.jsx`; try/catch fallbacks on IndexedDB. |
| **IV. Data Versioning & Integrity** | Schemas versioned with backward-compatible defaults. | **PASS** | `isLeftSidebarOpen` and `isRightSidebarOpen` default gracefully without breaking persisted projects. |
| **V. Standardized Contracts & Visual Modeling** | Clear interfaces and diagrams for state transitions. | **PASS** | Updated contracts for `workspace-service`, `theme-registry`, and `template-renderer`; dual-sidebar state flow in `data-model.md`. |
| **VI. Git Feature Branch Isolation** | All work isolated on dedicated feature branch. | **PASS** | Development exclusively on active branch `003-slide-templates-branding`. |

---

## Project Structure

### Documentation (this feature)

```text
specs/003-slide-templates-branding/
├── spec.md              # Refined feature specification
├── plan.md              # This implementation plan
├── research.md          # Technical research & decisions
├── data-model.md        # Entities, schemas & lifecycle
├── quickstart.md        # Validation & verification scenarios
├── contracts/
│   ├── workspace-service.contract.md
│   ├── theme-registry.contract.md
│   └── template-renderer.contract.md
└── checklists/
    └── requirements.md  # Specification quality checklist
```

### Source Code (Concrete Repository Files)

```text
src/
├── components/
│   ├── LeftSidebar/
│   │   ├── LeftSidebar.jsx          # Left navigation: Slide, Image, Icons, Fonts, Colors, Profile
│   │   ├── SlideContentTab.jsx      # Refined: Subtext & 3 templates (Tipo de Slide removed)
│   │   ├── ThemesTab.jsx            # NEW: Dedicated Color Palette & Visual Style tab
│   │   ├── TypographyTab.jsx        # Refined: Pure typography & font overrides (colors decoupled)
│   │   ├── BrandingTab.jsx          # Unchanged: Verified badge & squircle avatar
│   │   ├── ImageDockingTab.jsx      # Unchanged: Media docking
│   │   └── OverlaysTab.jsx          # Unchanged: 3x3 anchor grid
│   ├── RightSidebar/
│   │   └── RightSidebar.jsx         # NEW: Dedicated right drawer for complete raw script editing
│   ├── SlideCard.jsx                # Refined: 3 curated templates (Classic, Quote, Minimalist)
│   ├── SlidesCanvas.jsx             # Canvas rendering with responsive centering
│   ├── StudioWorkspace.jsx          # Dual sidebar visibility state and toggle handlers
│   └── ExportToolbar.jsx            # Refined: Only PNGs ZIP export (PDF removed)
├── services/
│   ├── workspaceService.js          # regenerateSlidesFromRawScript, updateSlideTemplate (3 templates)
│   ├── workspaceConstants.js        # SLIDE_TEMPLATES (classic, quote, minimalist), AVAILABLE_THEMES
│   └── storageService.js            # Persistence rehydration defaults
└── styles/
    ├── themes.css                   # Celestial blue & clean theme CSS variables
    ├── workspace.css                # Dual sidebar drawers, toggles, and 3 template layouts
    └── index.css                    # Tailwind base
```

---

## Complexity Tracking

> No violations of Constitution principles. Simplification achieved by removing fragile templates and PDF export.

| Aspect | Decision | Rationale |
|---|---|---|
| Sidebar State | React state in `StudioWorkspace.jsx` | Simple boolean toggles (`isLeftSidebarOpen`, `isRightSidebarOpen`), zero external drawer libraries. |
| Template Pruning | Keep only `classic`, `quote`, `minimalist` | Directly eliminates user-reported bugs with lists and statistics, focusing on bulletproof layouts. |
| PDF Removal | Cleanly eliminate `exportAsPdf` from UI | Matches user requirement and streamlines export toolbar to a single, obvious action. |
