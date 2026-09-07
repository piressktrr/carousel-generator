# Quickstart & Verification Guide: Clean & Dynamic Carousel UI Redesign

**Feature**: `006-clean-carousel-ui-redesign`
**Date**: 2026-09-06

This guide documents the end-to-end verification scenarios to validate that the clean, dynamic redesign meets all functional requirements and aesthetic standards.

## Prerequisites

- Node.js installed
- Dependencies installed (`npm install`)
- Dev server running on `http://localhost:3000/` (`npm run dev`)

---

## Scenario 1: Initial Script Intake View (Clean & Inviting)

1. Open the application in browser (`http://localhost:3000/`). If a project is loaded, click "Novo Projeto" in the header/sidebar.
2. **Verify Visuals**:
   - Single clean card with glassmorphism on radial dark background.
   - Distinctive typography, clear contrast, no cluttered decorative all-caps badges.
   - Gemini API Key accordion is neatly tucked with masked input and show/hide eye toggle.
3. Click "Carregar Exemplo de Roteiro" and click "Gerar Carrossel".
4. **Verify Dynamics**:
   - Button shows responsive loading state with spinner.
   - Smooth entrance to workspace without layout jumps.

---

## Scenario 2: Central Canvas Dynamic Presentation (Track & Focus)

1. With the carousel loaded, observe the central canvas.
2. **Verify Focus**:
   - The active slide is elevated with scale `1.02` and subtle glowing border.
   - Neighboring slides have slight dimming (`opacity: 0.82`) to establish clear hierarchy.
   - Slide counter badge reads `Slide 1 de X`.
3. **Verify Navigation**:
   - Click on Slide 3 or click next arrow button: the stage smoothly scrolls and centers Slide 3.
   - Counter immediately updates to `Slide 3 de X`.
   - Keyboard left/right arrows navigate slides smoothly.

---

## Scenario 3: Aspect Ratio Toggle (4:5 Portrait vs 1:1 Square)

1. In the top bar, locate the Aspect Ratio segmented control (`[ 4:5 ] [ 1:1 ]`).
2. Click `1:1`:
   - Slides transition smoothly to 380×380px square proportion.
   - Content adapts without overflow or clipping.
3. Click `4:5`:
   - Slides return to 380×475px vertical proportion smoothly.

---

## Scenario 4: Left Sidebar 4 Semantic Categories

1. Observe the Left Sidebar header:
   - Contains 4 clean icon-and-label tabs:
     1. **Lâminas & Conteúdo** (Slide cards sequence + text editor)
     2. **Design & Temas** (Preset themes + gradient custom builder)
     3. **Tipografia** (Font selector & size scale)
     4. **Marca & Elementos** (Profile signature, image docking, overlays)
2. Click each tab:
   - Transitions immediately with subtle active indicator.
   - No horizontal scrolling bar across the tabs.
   - Inputs, buttons, and switches have clear focus rings and meet minimum 40px hit area.

---

## Scenario 5: Sidebar Smooth Collapse & Expansion

1. Click the "Barra Esquerda" toggle button in the top bar:
   - Sidebar collapses fluidly to the left in < 300ms.
   - Canvas expands to occupy the available screen width with zero glitches.
2. Click the toggle again to re-expand.
3. Click the "Roteiro" toggle button to open the Right Sidebar drawer.
   - Transitions fluidly from right.
