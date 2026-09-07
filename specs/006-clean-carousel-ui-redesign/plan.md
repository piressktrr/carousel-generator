# Implementation Plan: Clean & Dynamic Carousel UI Redesign

**Branch**: `006-clean-carousel-ui-redesign` | **Date**: 2026-09-06 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/006-clean-carousel-ui-redesign/spec.md`

## Summary

This feature modernizes and refines the Carrosseis-Generator Studio visual design and interaction dynamics based on the design intelligence of `frontend-design` and `ui-ux-pro-max`. It retains the project's signature abyssal teal and bioluminescent cyan palette while eliminating cluttered chrome, solid heavy borders, and noisy badges. The redesign introduces a continuous dynamic horizontal carousel track with elevated active focus, consolidates the Left Sidebar's 8 tabs into 4 semantic categories, adds an aspect ratio switcher (4:5 / 1:1), streamlines the top bar, and enhances the script intake landing view with fluid micro-interactions and WCAG AA accessibility.

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 19.x (JSX)

**Primary Dependencies**: React 19, Lucide React (vector icons), Tailwind CSS / PostCSS, html-to-image, jszip, file-saver, jspdf

**Storage**: Browser IndexedDB via existing `storageService.js` (offline-capable, zero backend dependency)

**Testing**: Browser manual testing with quickstart verification scenarios + node syntax/lint validation

**Target Platform**: Modern Web Browsers (Chrome, Edge, Firefox, Safari) on Desktop and Tablets (≥768px)

**Project Type**: Single-Page Web Application (Vite + React)

**Performance Goals**: Slide transition < 200ms, sidebar collapse/expand < 300ms, 60fps smooth horizontal scrolling, zero Cumulative Layout Shift (CLS < 0.1)

**Constraints**: Pure client-side execution, WCAG 2.1 AA contrast ratio (≥4.5:1), touch/pointer hit target ≥ 40×40px, non-blocking autosave (400ms debounce)

**Scale/Scope**: 1-30 slides per carousel project, instantaneous preview updates

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I (Clean Architecture, Functional Paradigm & SRP)**: PASS. Visual components (`SlidesCanvas`, `SlideCard`, `LeftSidebar`, `ScriptInputView`) remain pure presentational components consuming props. Layout mathematics and business rules remain in `src/services/`.
- **Principle II (KISS / YAGNI & Pragmatism)**: PASS. No heavy animation frameworks or extraneous CSS libraries introduced; pure CSS transitions using cubic-bezier easing and standard React state management.
- **Principle III (Concurrency & Resilience)**: PASS. Debounced IndexedDB autosave preserved; state updates are atomic and error-boundary safe.
- **Principle IV (Data Versioning & Parity)**: PASS. Schema extensions (`aspectRatio`) have default fallbacks (`4:5`), ensuring backwards compatibility with existing saved carousels.
- **Principle V (API Standardization & AI Isolation)**: PASS. Gemini AI script regeneration remains strictly encapsulated in `geminiService.js`.
- **Principle VI (Feature Branch Isolation)**: PASS. Work proceeds exclusively on dedicated branch `006-clean-carousel-ui-redesign`.

## Project Structure

### Documentation (this feature)

```text
specs/006-clean-carousel-ui-redesign/
├── spec.md              # Feature specification with clarifications
├── plan.md              # Implementation plan (this file)
├── research.md          # Phase 0 research and architectural decisions
├── data-model.md        # Phase 1 data entities and CSS tokens
├── quickstart.md        # Phase 1 verification and test guide
├── contracts/
│   └── ui-contracts.md  # Phase 1 component interfaces and contracts
└── checklists/
    └── requirements.md  # Quality validation checklist
```

### Source Code (repository root)

```text
src/
├── App.jsx                      # App root with IndexedDB initialization
├── main.jsx                     # Entry point
├── components/
│   ├── ScriptInputView.jsx       # Streamlined glassmorphic intake card
│   ├── StudioWorkspace.jsx       # Main container managing 3-zone layout & aspect ratio state
│   ├── SlidesCanvas.jsx          # Continuous dynamic track, top bar & navigation arrows
│   ├── SlideCard.jsx             # Active focus elevation, 4:5 vs 1:1 aspect ratio sizing
│   ├── ExportToolbar.jsx         # Clean export action group with aspect ratio dimension support
│   ├── LeftSidebar/
│   │   ├── LeftSidebar.jsx       # 4-tab semantic navigation header
│   │   ├── SlideContentTab.jsx   # Lâminas & Conteúdo category (sequence + slide editor)
│   │   ├── ThemesTab.jsx         # Design & Temas category
│   │   ├── CustomThemeBuilder.jsx# Expandable custom gradient designer
│   │   ├── TypographyTab.jsx     # Tipografia category
│   │   ├── BrandingTab.jsx       # Marca & Elementos category
│   │   ├── ImageDockingTab.jsx   # Integrated docking panel
│   │   └── OverlaysTab.jsx       # Integrated overlay panel
│   └── RightSidebar/
│       └── RightSidebar.jsx      # Slide-out raw script drawer
├── services/
│   ├── storageService.js         # IndexedDB persistence (adds aspectRatio)
│   ├── themeService.js           # Theme variable resolution
│   ├── workspaceConstants.js     # Default constants & sample script
│   └── workspaceService.js       # Pure domain transformations
└── styles/
    ├── index.css                 # Base resets & root tokens
    ├── themes.css                # Color themes (abyssal glow, etc.)
    └── workspace.css             # Refined CSS rules, 4:5/1:1 ratios, clean chrome
```

**Structure Decision**: The single-project Vite+React client architecture is preserved. Changes will be focused on CSS token refinements (`themes.css`, `workspace.css`), component reorganization in `LeftSidebar`, aspect ratio controls in `StudioWorkspace` / `SlidesCanvas` / `SlideCard`, and sleek visual polish in `ScriptInputView`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *None*    | N/A        | Adheres strictly to KISS, functional React, and vanilla CSS tokens |
