---
description: "Task list for clean and dynamic carousel UI redesign implementation"
---

# Tasks: Clean & Dynamic Carousel UI Redesign

**Input**: Design documents from `specs/006-clean-carousel-ui-redesign/`
**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/ui-contracts.md](contracts/ui-contracts.md), [quickstart.md](quickstart.md)

## Phase 1: Setup & Design Tokens

**Purpose**: Update root CSS variables, design tokens, and state defaults

- [x] T001 [P] Refine root design tokens, borders, and transitions in `src/styles/index.css`
- [x] T002 [P] Update color themes and surface opacities in `src/styles/themes.css`
- [x] T003 [P] Add default aspect ratio (`4:5`) to workspace constants in `src/services/workspaceConstants.js`
- [x] T004 Ensure `aspectRatio` is persisted and retrieved in `src/services/storageService.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core workspace state and layout foundation for aspect ratio and dynamic navigation

- [x] T005 Add `aspectRatio` state management and handler in `src/components/StudioWorkspace.jsx`
- [x] T006 [P] Update `src/styles/workspace.css` base layout variables for 4:5 and 1:1 aspect ratios and glassmorphic surfaces

**Checkpoint**: Foundation ready - User Story implementation can proceed

---

## Phase 3: User Story 1 - Clean & Focused Carousel Stage with Dynamic Slide Interaction (Priority: P1) 🎯 MVP

**Goal**: Deliver an uncluttered, high-focus canvas with a continuous dynamic horizontal track, active slide elevation, smooth centering, aspect ratio toggle (4:5 / 1:1), and keyboard navigation.

**Independent Test**: Load a carousel, verify active slide has scale `1.02` and subtle glow, toggle between 4:5 and 1:1 aspect ratios smoothly, and navigate through slides using next/prev buttons and arrow keys.

### Implementation for User Story 1

- [x] T007 [P] [US1] Update `src/components/SlideCard.jsx` to support dynamic aspect ratio (`4:5` vs `1:1`) and active focal styling
- [x] T008 [US1] Update `src/components/SlidesCanvas.jsx` to add aspect ratio selector, slide position counter, and keyboard arrow navigation
- [x] T009 [US1] Update `src/components/ExportToolbar.jsx` to support exporting high-resolution images according to active aspect ratio (1080×1350 for 4:5, 1080×1080 for 1:1)
- [x] T010 [US1] Wire aspect ratio state and navigation handlers from `src/components/StudioWorkspace.jsx` to `src/components/SlidesCanvas.jsx`
- [x] T011 [US1] Refactor canvas, slide stage, and navigation arrow styles in `src/styles/workspace.css` for smooth horizontal tracking and active slide elevation

**Checkpoint**: User Story 1 is fully functional and independently testable as the core MVP.

---

## Phase 4: User Story 2 - Minimalist, Intuitive Workspace Chrome & Sidebars (Priority: P2)

**Goal**: Reorganize the Left Sidebar into 4 semantic categories, polish form controls for accessibility (≥40px hit targets), and smooth out sidebar collapse/expand animations.

**Independent Test**: Toggle Left and Right sidebars open/closed verifying fluid transitions without layout glitching; navigate through all 4 semantic categories in the Left Sidebar and adjust properties with high readability.

### Implementation for User Story 2

- [x] T012 [US2] Refactor `src/components/LeftSidebar/LeftSidebar.jsx` to organize tools into 4 semantic tabs (Lâminas & Conteúdo, Design & Temas, Tipografia, Marca & Elementos)
- [x] T013 [P] [US2] Refine slide sequencing and content editor controls in `src/components/LeftSidebar/SlideContentTab.jsx`
- [x] T014 [P] [US2] Refine theme selector and custom builder integration in `src/components/LeftSidebar/ThemesTab.jsx`
- [x] T015 [P] [US2] Polish typography controls and font family selector in `src/components/LeftSidebar/TypographyTab.jsx`
- [x] T016 [P] [US2] Polish profile signature, 6-anchor selector, image docking, and overlays in `src/components/LeftSidebar/BrandingTab.jsx`
- [x] T017 [US2] Update `src/components/RightSidebar/RightSidebar.jsx` with clean glassmorphic drawer styling and accessible form controls
- [x] T018 [US2] Update sidebar layout, tab indicator, and collapse/expand transition styles in `src/styles/workspace.css`

**Checkpoint**: User Stories 1 and 2 are functional together with clean chrome and semantic tool grouping.

---

## Phase 5: User Story 3 - Streamlined & Inviting Script Intake Landing View (Priority: P3)

**Goal**: Transform the initial script intake view into an inviting, distraction-free glassmorphic card with clear typography, sample loader, and smooth loading feedback.

**Independent Test**: Start a new project to reach the landing view; verify clean card layout, test sample script loading, enter/view masked API key, and submit to observe responsive loading state.

### Implementation for User Story 3

- [x] T019 [US3] Refactor `src/components/ScriptInputView.jsx` with streamlined copy, clean glassmorphic card layout, and smooth loading indicator
- [x] T020 [US3] Update intake view styles, radial dark backdrop, and glowing primary action button in `src/styles/workspace.css`

**Checkpoint**: All three user stories are complete and integrated.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate visual quality, accessibility, transitions, and run the quickstart verification guide.

- [x] T021 [P] Verify WCAG AA contrast ratio (≥4.5:1) and touch targets (≥40px) across all interactive controls in `src/styles/workspace.css`
- [x] T022 Execute quickstart validation scenarios in `specs/006-clean-carousel-ui-redesign/quickstart.md`
- [x] T023 Run build verification (`npm run build`) to ensure zero compile warnings or errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup & Tokens (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 - Blocks User Stories.
- **User Story 1 (Phase 3 - MVP)**: Depends on Phase 2 - Can be tested independently.
- **User Story 2 (Phase 4)**: Depends on Phase 2 - Can proceed in parallel or after US1.
- **User Story 3 (Phase 5)**: Depends on Phase 1/2 - Can proceed independently.
- **Polish (Phase 6)**: Depends on all user stories completed.

### Parallel Opportunities

- T001, T002, T003 can execute in parallel.
- Within US2, tab components T013, T014, T015, T016 can be refined in parallel.
- US3 (T019, T020) can be implemented independently of US1 and US2.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Tokens & Setup)
2. Complete Phase 2 (Foundational)
3. Complete Phase 3 (User Story 1: Canvas, SlideCard, Aspect Ratio 4:5 / 1:1, Dynamic Track)
4. Validate MVP independently on `http://localhost:3000/`.

### Incremental Delivery

1. Foundation + US1 → Test dynamic carousel track & aspect ratio switcher.
2. Add US2 → Test 4 semantic categories in Left Sidebar + smooth drawer collapse.
3. Add US3 → Test streamlined script intake view.
4. Final Polish & Quickstart validation.
