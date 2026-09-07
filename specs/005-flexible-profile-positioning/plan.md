# Implementation Plan: Flexible Profile Positioning & Gemini AI Simplification

**Branch**: `005-flexible-profile-positioning` | **Date**: 2026-09-06 | **Spec**: [spec.md](file:///D:/Carrosseis-Generator/specs/005-flexible-profile-positioning/spec.md)

**Input**: Feature specification from `specs/005-flexible-profile-positioning/spec.md`

## Summary

This plan addresses two user requirements:
1. **Flexible Creator Profile Positioning**: Enable repositioning the creator branding signature to 6 strategic anchors (`top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`) via visual selector in `BrandingTab.jsx` and dynamic CSS flex ordering in `SlideCard.jsx` and `workspace.css`.
2. **Gemini AI Simplification**: Remove the AI theme generator from `ThemesTab.jsx` while keeping Gemini API key management secure and masked (`type="password"` with eye toggle) for intelligent script generation in `ScriptInputView.jsx` and `RightSidebar.jsx`.

---

## Technical Context

**Language/Version**: JavaScript (ES2022+), React 18, Vite 5
**Primary Dependencies**: Tailwind CSS 3, Lucide React, idb-keyval
**Storage**: Client-side IndexedDB (`storageService.js`)
**Testing**: Scenario-driven E2E verification via [quickstart.md](file:///D:/Carrosseis-Generator/specs/005-flexible-profile-positioning/quickstart.md) and production build validation (`npm run build`)
**Target Platform**: Modern desktop and tablet browsers
**Project Type**: Single-page creative web application
**Performance Goals**: Profile repositioning latency < 16ms (60fps reactive updates); 0ms export overhead
**Constraints**: Fully offline-capable for manual mode, zero external backend dependency, Clean Architecture with pure components

---

## Constitution Check

| Principle | Requirement | Status | Evidence / Architectural Choice |
|---|---|---|---|
| **I. Clean Architecture & SRP** | Business logic in pure service functions; single responsibility per module. | **PASS** | Positioning styling isolated in CSS classes; profile schema extended cleanly. |
| **II. Pragmatism (KISS/YAGNI)** | Simplest direct solution; zero redundant dependencies. | **PASS** | CSS Flexbox `order` and `margin: auto` without heavy positioning libraries. |
| **III. Safe Concurrency & Resilience** | Atomic state updates; safe handling of user inputs. | **PASS** | Pure state updates in React, backward-compatible defaults in `storageService.js`. |
| **IV. Data Versioning & Integrity** | Schemas versioned with backward-compatible defaults. | **PASS** | `position: profile?.position || 'bottom-left'`. |
| **V. Standardized Contracts & Visual Modeling** | Clear interfaces and diagrams for state transitions. | **PASS** | Documented in `contracts/branding-position.contract.md` and `data-model.md`. |
| **VI. Git Feature Branch Isolation** | All work isolated on dedicated feature branch. | **PASS** | Isolated on branch `005-flexible-profile-positioning`. |

---

## Project Structure

### Documentation (this feature)

```text
specs/005-flexible-profile-positioning/
├── spec.md              # Feature specification
├── plan.md              # This implementation plan
├── research.md          # Technical research & decisions
├── data-model.md        # Entities & schemas
├── quickstart.md        # Validation scenarios
├── contracts/
│   └── branding-position.contract.md
└── checklists/
    └── requirements.md  # Quality checklist
```

### Source Code Touched

```text
src/
├── components/
│   ├── LeftSidebar/
│   │   ├── BrandingTab.jsx          # Visual 6-point anchor positioning selector
│   │   └── ThemesTab.jsx            # Cleaned: AI theme generator removed
│   ├── RightSidebar/
│   │   └── RightSidebar.jsx         # Masked Gemini API key for script regeneration
│   ├── SlideCard.jsx                # Render .slide-branding-bar with .branding-pos-* classes
│   └── ScriptInputView.jsx          # Preserved masked Gemini API key for initial generation
├── services/
│   ├── storageService.js            # Default position to 'bottom-left' in getProfile/getWorkspace
│   └── workspaceConstants.js        # BRANDING_POSITIONS constants
└── styles/
    └── workspace.css                # .branding-pos-* CSS flexbox positioning rules
```

---

## Complexity Tracking

> No constitution violations. Pure CSS flex positioning reduces code complexity while removing AI theme generation simplifies the codebase.
