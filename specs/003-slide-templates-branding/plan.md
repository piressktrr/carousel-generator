# Implementation Plan: Slide Templates, Subtext, Enhanced Creator Branding & Clean Themes

**Branch**: `003-slide-templates-branding` | **Date**: 2026-09-05 | **Spec**: [spec.md](file:///D:/Carrosseis-Generator/specs/003-slide-templates-branding/spec.md)

**Input**: Feature specification from `specs/003-slide-templates-branding/spec.md`

## Summary

This feature expands the Carrosseis-Generator studio with five tightly integrated creative capabilities:
1. **Raw Script LeftSidebar Editor**: A dedicated sidebar tab displaying the complete raw script, enabling bulk editing or pasting a whole new script with an "Atualizar / Regenerar Slides" action that updates all slides in one shot while preserving docked images and 3x3 overlays by ordinal index.
2. **Enhanced Creator Branding**: Toggleable celestial blue verified profile badge (`hasVerifiedBadge`) displayed beside the author name, plus an avatar geometry selector (`avatarShape`: circular `rounded-full` vs modern squircle `rounded-xl`).
3. **Slide Subtext Hierarchy**: Dedicated per-slide subtext field (`subtext`) for clear headline + supporting copy visual hierarchy.
4. **Slide Layout Templates**: Curated library of 5 visual layouts (`classic`, `quote`, `bullets`, `stat`, `minimalist`) selectable per slide or applicable globally.
5. **Clean Design Themes & Celestial Blue Refactor**: Expanded palette featuring minimalist themes (*Clean Ivory*, *Scandinavian Slate*, *Light Clean*) and a refactored *Azul Celestial* theme (`#00A3FF` / `#00D2FF`) delivering vivid, radiant blue aesthetics, with extensible theme architecture for reference image matching.

---

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 18, Vite 5
**Primary Dependencies**: Tailwind CSS 3, Lucide React (zero heavy external animation or CSS-in-JS libraries)
**Storage**: Client-side IndexedDB via pure functional wrapper (`storageService.js`)
**Testing**: Scenario-driven E2E verification via [quickstart.md](file:///D:/Carrosseis-Generator/specs/003-slide-templates-branding/quickstart.md) and production build validation (`npm run build`)
**Target Platform**: Modern desktop and tablet browsers (Chrome, Edge, Firefox, Safari)
**Project Type**: Single-page interactive creative studio web application
**Performance Goals**: Slide template/branding switch latency < 50ms; bulk raw script regeneration < 3s; 60fps render
**Constraints**: Fully offline-capable, zero external backend dependency, adherence to Clean Architecture and pure functions in `src/services/`
**Scale/Scope**: Carousels with 1 to 20 slides, 5 layout templates, 8 curated design themes

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Evidence / Architectural Choice |
|---|---|---|---|
| **I. Clean Architecture & SRP** | Business logic in pure service functions; single responsibility per module. | **PASS** | `regenerateSlidesFromRawScript` and `updateCreatorBranding` isolated as pure functions in `workspaceService.js`; UI components in `src/components/LeftSidebar/` and `src/components/SlideCard.jsx` adhere strictly to presentation and event delegation. |
| **II. Pragmatism (KISS/YAGNI)** | Simplest direct solution; zero redundant dependencies. | **PASS** | Templates implemented with native CSS classes and React composition; no heavy layout libraries or external state management introduced. |
| **III. Safe Concurrency & Resilience** | Atomic state updates; safe handling of user inputs and storage errors. | **PASS** | State transitions in `StudioWorkspace.jsx` use immutable functional state updaters; IndexedDB read/write wrapped in try/catch fallbacks. |
| **IV. Data Versioning & Integrity** | Schemas versioned with backward-compatible defaults. | **PASS** | New fields (`subtext: ''`, `slideTemplate: 'classic'`, `hasVerifiedBadge: false`, `avatarShape: 'circle'`) use safe defaults when hydrating existing workspaces. |
| **V. Standardized Contracts & Visual Modeling** | Clear interfaces and diagrams for state transitions. | **PASS** | Comprehensive contracts created for `workspace-service`, `theme-registry`, and `template-renderer`; state lifecycle diagram documented in `data-model.md`. |
| **VI. Git Feature Branch Isolation** | All work isolated on dedicated feature branch. | **PASS** | Development exclusively on active branch `003-slide-templates-branding`. |

---

## Project Structure

### Documentation (this feature)

```text
specs/003-slide-templates-branding/
├── spec.md              # Feature specification
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
│   │   ├── LeftSidebar.jsx          # Tab navigation (adds 'script' tab alongside existing tabs)
│   │   ├── RawScriptTab.jsx         # NEW: Complete raw script editor with bulk regeneration action
│   │   ├── BrandingTab.jsx          # Enhanced: Verified badge toggle & avatar shape selector
│   │   ├── SlideContentTab.jsx      # Enhanced: Subtext textarea & Slide Template selector
│   │   ├── ImageDockingTab.jsx      # Unchanged: Media docking
│   │   ├── OverlaysTab.jsx          # Unchanged: 3x3 anchor grid
│   │   └── TypographyTab.jsx        # Enhanced: Expanded theme selector with Clean & Celestial Blue
│   ├── SlideCard.jsx                # Enhanced: Template layouts, subtext typography, verified badge, squircle avatar
│   ├── SlidesCanvas.jsx             # Unchanged: Canvas rendering container
│   ├── StudioWorkspace.jsx          # Enhanced: Workspace state coordinator & handler integrations
│   └── ExportToolbar.jsx            # Unchanged: PNG/PDF/ZIP export
├── services/
│   ├── workspaceService.js          # Enhanced: regenerateSlidesFromRawScript, updateCreatorBranding
│   ├── workspaceConstants.js        # Enhanced: Clean themes, refactored Celestial Blue, slide templates registry
│   ├── storageService.js            # Unchanged: IndexedDB persistence
│   └── textSegmenter.js             # Enhanced: Subtext extraction support
└── styles/
    ├── themes.css                   # Enhanced: Celestial blue tokens, clean-ivory, clean-slate, reference-aesthetic
    ├── workspace.css                # Enhanced: Template layout classes, verified badge & squircle styles
    └── index.css                    # Unchanged: Tailwind base
```

---

## Complexity Tracking

> No violations of the Constitution principles were made. Zero new external packages are required.

| Aspect | Decision | Rationale |
|---|---|---|
| State Management | React `useState` + functional reducers | Keeps architecture lightweight, eliminates Redux/Zustand overhead (Principle II). |
| Layout Engine | CSS Flex/Grid + semantic modifier classes | Maximizes performance and browser rendering speed without layout library overhead. |
| Media Retention | Positional index mapping | Deterministic, predictable, and fully aligned with user choice Option B. |
