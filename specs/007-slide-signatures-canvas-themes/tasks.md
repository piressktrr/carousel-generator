---
description: "Task list for per-slide signatures, viewport isolation and canvas design themes"
---

# Tasks: Per-Slide Signatures, Viewport Isolation & Canvas Design Themes

**Input**: Design documents from `specs/007-slide-signatures-canvas-themes/`
**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/ui-contracts.md](contracts/ui-contracts.md), [quickstart.md](quickstart.md)

## Phase 1: Setup & Constants

**Purpose**: Add design philosophy presets and slide profilePosition schema support

- [x] T001 [P] Add Canvas Design philosophy presets to `src/services/workspaceConstants.js`
- [x] T002 [P] Ensure `profilePosition` is recognized and preserved in `src/services/storageService.js` and `src/services/workspaceService.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Fix the scrolling and containment root causes so collapsed sidebars never peek

- [x] T003 Refactor `src/styles/workspace.css` to add strict containment (`visibility: hidden`, `contain: strict`, zero width/margins) for `.left-sidebar.collapsed` and `.right-sidebar.collapsed`
- [x] T004 Refactor slide centering in `src/components/SlidesCanvas.jsx` to use localized container `stage.scrollTo` instead of browser `scrollIntoView()`

**Checkpoint**: Foundation ready - sidebars will never leak or shift during slide interactions

---

## Phase 3: User Story 1 - Per-Slide Signature Positioning & Visibility (Priority: P1) 🎯 MVP

**Goal**: Allow creators to choose signature position or hide it for each individual slide, with global fallback and quick reset.

**Independent Test**: Override signature position on Slide 1 and hide on Slide 2; verify in canvas that Slide 1 shows new position, Slide 2 hides signature, and other slides inherit global default.

### Implementation for User Story 1

- [x] T005 [P] [US1] Update `src/components/SlideCard.jsx` to render profile signature using `slide.profilePosition` with fallback to `profile.position` and support for `'hidden'`
- [x] T006 [US1] Update `src/components/LeftSidebar/BrandingTab.jsx` with per-slide signature anchor selector (6 anchors + hide + reset to global)
- [x] T007 [US1] Ensure `onUpdateSlide` correctly applies `profilePosition` changes in `src/components/LeftSidebar/LeftSidebar.jsx` and `src/components/StudioWorkspace.jsx`

**Checkpoint**: Per-slide signature positioning is fully functional and independently testable.

---

## Phase 4: User Story 2 - Complete Viewport Isolation for Collapsed Panels (Priority: P2)

**Goal**: Ensure collapsed panels are 100% hidden and out of the viewport flow during slide clicking and keyboard arrow navigation.

**Independent Test**: Collapse both toolbars, click through slides and use keyboard arrows, verifying zero horizontal shift or panel peeking.

### Implementation for User Story 2

- [x] T008 [US2] Update `.studio-workspace` layout rules in `src/styles/workspace.css` with `overflow: hidden; max-width: 100vw;` to ensure zero ancestor scroll bleed
- [x] T009 [US2] Verify keyboard and click navigation in `src/components/SlidesCanvas.jsx` operates without causing side drawer visibility blips

**Checkpoint**: User Stories 1 and 2 are functional together with zero layout leaks.

---

## Phase 5: User Story 3 - Canvas Design Philosophy for Custom Themes (Priority: P3)

**Goal**: Incorporate Canvas Design art movements (Chromatic Silence, Brutalist Joy, Kinetic Vapor, etc.) into the Custom Theme Builder.

**Independent Test**: Open the custom theme builder, click a design philosophy preset, and verify that harmonious palette and gradients populate instantly and can be saved.

### Implementation for User Story 3

- [x] T010 [US3] Update `src/components/LeftSidebar/CustomThemeBuilder.jsx` to display Canvas Design movement presets
- [x] T011 [US3] Add quick-apply handler in `src/components/LeftSidebar/CustomThemeBuilder.jsx` to pre-fill colors, gradient, and preview with one click
- [x] T012 [US3] Update theme preset and movement card styles in `src/styles/workspace.css`

**Checkpoint**: All user stories complete and integrated.

---

## Phase 6: Polish & Verification

**Purpose**: Validate end-to-end functionality and build stability

- [x] T013 [P] Run quickstart validation scenarios in `specs/007-slide-signatures-canvas-themes/quickstart.md`
- [x] T014 Run build verification (`npm run build`) to ensure zero compile warnings or errors
