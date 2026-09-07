# Implementation Plan: Clean Canvas, Custom Dynamic Themes & Secure Gemini AI Integration

**Branch**: `004-custom-themes-gemini` | **Date**: 2026-09-06 | **Spec**: [spec.md](file:///D:/Carrosseis-Generator/specs/004-custom-themes-gemini/spec.md)

**Input**: Feature specification from `specs/004-custom-themes-gemini/spec.md`

## Summary

This plan addresses three primary areas of enhancement:
1. **Clean Canvas**: Elimination of internal slide label tags (`slide-tag`) from `SlideCard.jsx` to render uncluttered content matching professional output.
2. **Dynamic Custom Themes & Gradient Builder**: Implementation of a dedicated custom theme creator in `ThemesTab.jsx` with real-time CSS variable injection, support for solid colors and multi-stop angular gradients, and IndexedDB persistence.
3. **Secure Gemini AI Integration & Theme Generator**: Masked API key inputs with visibility toggles in both `ScriptInputView.jsx` and `ThemesTab.jsx`, local credential persistence, and an AI theme generator that produces complete palettes with creative titles and harmonious contrast from natural language prompts.

---

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 18, Vite 5
**Primary Dependencies**: Tailwind CSS 3, Lucide React, idb-keyval (offline IndexedDB)
**Storage**: Client-side IndexedDB (`storageService.js`)
**Testing**: Scenario-driven E2E verification via [quickstart.md](file:///D:/Carrosseis-Generator/specs/004-custom-themes-gemini/quickstart.md) and production build validation (`npm run build`)
**Target Platform**: Modern desktop and tablet browsers (Chrome, Edge, Firefox, Safari)
**Project Type**: Single-page creative web application
**Performance Goals**: Dynamic theme switch latency < 50ms; AI theme generation < 4s; 60fps canvas rendering
**Constraints**: Fully offline-capable for manual mode, zero external backend dependency (direct client-to-Gemini REST API), Clean Architecture with pure service functions
**Scale/Scope**: Unlimited custom themes, 8 built-in themes, responsive canvas

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Evidence / Architectural Choice |
|---|---|---|---|
| **I. Clean Architecture & SRP** | Business logic in pure service functions; single responsibility per module. | **PASS** | AI generation isolated in `aiService.js`, theme calculations in `themeService.js`, storage in `storageService.js`. |
| **II. Pragmatism (KISS/YAGNI)** | Simplest direct solution; zero redundant dependencies. | **PASS** | Runtime CSS custom properties injection; no heavy CSS-in-JS or color picker packages. |
| **III. Safe Concurrency & Resilience** | Atomic state updates; safe handling of user inputs and API failures. | **PASS** | Try/catch around Gemini REST API with user-friendly error handling; immutable updates in React state. |
| **IV. Data Versioning & Integrity** | Schemas versioned with backward-compatible defaults. | **PASS** | `customThemes: data.customThemes || []` gracefully defaults without breaking persisted workspaces. |
| **V. Standardized Contracts & Visual Modeling** | Clear interfaces and diagrams for state transitions. | **PASS** | Contracts in `contracts/theme-service.contract.md` and `contracts/ai-service.contract.md`; state lifecycle in `data-model.md`. |
| **VI. Git Feature Branch Isolation** | All work isolated on dedicated feature branch. | **PASS** | Development on active branch `004-custom-themes-gemini`. |

---

## Project Structure

### Documentation (this feature)

```text
specs/004-custom-themes-gemini/
├── spec.md              # Feature specification
├── plan.md              # This implementation plan
├── research.md          # Technical research & decisions
├── data-model.md        # Entities & schemas
├── quickstart.md        # Validation scenarios
├── contracts/
│   ├── theme-service.contract.md
│   └── ai-service.contract.md
└── checklists/
    └── requirements.md  # Quality checklist
```

### Source Code (Concrete Repository Files)

```text
src/
├── components/
│   ├── LeftSidebar/
│   │   ├── LeftSidebar.jsx          # Cores tab with ThemesTab
│   │   ├── ThemesTab.jsx            # Custom theme builder & AI theme generator
│   │   └── CustomThemeModal.jsx     # Or inline builder for custom themes
│   ├── SlideCard.jsx                # Clean canvas (removal of slide-tag)
│   ├── SlidesCanvas.jsx             # Dynamic CSS variable styling on container
│   ├── StudioWorkspace.jsx          # Synchronized theme & customThemes state
│   ├── ScriptInputView.jsx          # Masked API key input with toggle visibility
│   └── ExportToolbar.jsx            # High-resolution export with custom theme variables
├── services/
│   ├── aiService.js                 # Gemini 2.5 Flash API calls (generateThemeFromPrompt)
│   ├── themeService.js              # Theme resolution, gradient CSS generator, contrast check
│   ├── workspaceConstants.js        # Default AVAILABLE_THEMES
│   └── storageService.js            # Storage for customThemes and geminiApiKey
└── styles/
    ├── themes.css                   # Native theme definitions
    └── workspace.css                # Gradient builder & theme card styles
```

---

## Complexity Tracking

> No violations of Constitution principles. Simplification achieved through direct CSS variables injection and native fetch API for Gemini.
