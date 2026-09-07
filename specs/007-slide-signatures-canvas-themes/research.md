# Research & Architectural Decisions: Per-Slide Signatures, Viewport Isolation & Canvas Design Themes

**Feature**: `007-slide-signatures-canvas-themes`
**Date**: 2026-09-06
**Status**: Completed

## 1. Per-Slide Signature Positioning Architecture

### Context
Currently, the author signature (`profile`) is configured globally with a single `position` (e.g., `'bottom-left'`). In diverse carousels, slide 1 (cover) might look best with signature top-right, slide 4 (large quote) might need the signature hidden to avoid cluttering the quote, and slide 7 (CTA) might need it bottom-center.

### Decision
- **Data Model**: Extend each `SlideItem` with optional `profilePosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'hidden' | null`.
- **Inheritance Fallback**:
  `const effectivePosition = slide?.profilePosition ?? profile?.position ?? 'bottom-left';`
  If `effectivePosition === 'hidden'`, the signature block is completely omitted from rendering on that slide.
- **UI in BrandingTab**:
  - Add an "Assinatura desta Lâmina Ativa" section in `BrandingTab.jsx`.
  - Include the 6-anchor grid selector + "Ocultar nesta lâmina" button + "Redefinir para padrão global" button.
  - Show a clear status indicator (e.g. `Usando padrão global: Inferior Esquerdo` vs `Personalizado para esta lâmina: Topo Direito`).

---

## 2. Viewport Isolation & Scroll Glitch Fix

### Root Cause Analysis
Why were collapsed sidebars or offscreen parts popping up when clicking slides?
In `SlidesCanvas.jsx`, slide centering was implemented using:
`activeElem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });`
In modern web browsers (Chrome, Edge, Firefox, Safari), `Element.scrollIntoView()` scrolls **all scrollable ancestor containers** up to the window!
When `.left-sidebar.collapsed` uses negative margin (`margin-left: -380px`), or when there is subtle flex overflow, `scrollIntoView()` causes the parent `.studio-workspace` or `window` to scroll horizontally, revealing the negative-margin area or off-screen sidebars.

### Decision
1. **Replace `scrollIntoView()` with Localized Container Scrolling**:
   Instead of calling `activeElem.scrollIntoView()`, calculate the exact relative offset within `stageRef.current`:
   ```javascript
   const stage = stageRef.current;
   const activeElem = stage.querySelector(`[data-slide-id="${activeSlideId}"]`);
   if (stage && activeElem) {
     const elemLeft = activeElem.offsetLeft;
     const elemWidth = activeElem.offsetWidth;
     const stageWidth = stage.clientWidth;
     const targetScroll = elemLeft - (stageWidth / 2) + (elemWidth / 2);
     stage.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' });
   }
   ```
   This ensures that ONLY `stageRef.current` scrolls horizontally, and parent containers never receive scroll triggers.
2. **Strict Layout Containment for Collapsed Panels**:
   In `src/styles/workspace.css`:
   When `.left-sidebar.collapsed` or `.right-sidebar.collapsed` are active:
   - Apply `width: 0 !important; min-width: 0 !important; max-width: 0 !important;`
   - Apply `margin: 0 !important; padding: 0 !important; border: none !important;`
   - Apply `visibility: hidden; opacity: 0; pointer-events: none; overflow: hidden;`
   - Apply `contain: strict;`
   This removes the panels completely from horizontal space calculations and prevents any browser peek bug.

---

## 3. Canvas Design Philosophy for Custom Themes

### Context
The user requested applying the `canvas-design` skill to custom theme generation. Rather than generic color wheels, `canvas-design` emphasizes visual philosophies and aesthetic movements expressed through chromatic balance, space, and minimal text accentuation.

### Decision
- Define 5 Curated **Artistic Design Movements** in `workspaceConstants.js`:
  1. **Chromatic Silence**: Deep obsidian midnight with electric cyan glow and silver mist.
     - *Philosophy*: Restraint, deep space, bioluminescent clarity.
     - *Colors*: `#05080f` to `#0c1424`, heading `#00f0ff`, accent `#00f0ff`, subtext `#94a3b8`.
  2. **Brutalist Joy**: Industrial dark asphalt with high-energy electric lime and ultraviolet accents.
     - *Philosophy*: Raw geometric power, visceral energy, stark modernism.
     - *Colors*: `#121214` to `#1e1e24`, heading `#d4ff00`, accent `#d4ff00`, subtext `#a1a1aa`.
  3. **Kinetic Vapor**: Atmospheric deep violet with glowing magenta and cyan pulse.
     - *Philosophy*: Motion, synthwave nocturnal depth, glowing retro-futurism.
     - *Colors*: `#09041a` to `#1f0c38`, heading `#ff2a85`, accent `#00f5d4`, subtext `#c4b5fd`.
  4. **Ethereal Aura**: Deep abyssal emerald teal with warm amber and mint luminescence.
     - *Philosophy*: Organic mystery, deep oceanic phosphorescence, warm organic harmony.
     - *Colors*: `#001413` to `#01332f`, heading `#05ffd4`, accent `#fbbf24`, subtext `#86efac`.
  5. **Metabolist Space**: Architectural graphite with blazing cadmium orange.
     - *Philosophy*: Structural form, bold tactile presence, modern modular architecture.
     - *Colors*: `#0e0e11` to `#1c1d22`, heading `#ff6b35`, accent `#ff6b35`, subtext `#d1d5db`.
- **Integration in `CustomThemeBuilder.jsx`**:
  - Add a dedicated "Movimentos de Design (Canvas)" preset bar at the top of the builder.
  - Clicking any movement instantaneously generates the complete theme schema with full preview, allowing immediate saving or fine-tuning.
