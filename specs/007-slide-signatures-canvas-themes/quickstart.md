# Quickstart & Verification Guide: Feature 007

**Feature**: `007-slide-signatures-canvas-themes`
**Date**: 2026-09-06

## Scenario 1: Per-Slide Signature Customization
1. Open the app (`http://localhost:3000/`) with a generated carousel.
2. In Left Sidebar, select the **Marca** category (Perfil tab).
3. Under "Assinatura desta Lâmina", pick **Superior Direito (TR)** for Slide 1.
4. Select Slide 2, and pick **Ocultar nesta lâmina**.
5. Select Slide 3, and observe it remains on the global default (e.g., Inferior Esquerdo).
6. Verify in the canvas: Slide 1 shows profile in top-right, Slide 2 has NO profile, Slide 3 shows profile in bottom-left.
7. Click "Redefinir para padrão" on Slide 1 and verify it returns to bottom-left.

## Scenario 2: Viewport Isolation (Zero Peek / Shift Glitch)
1. Collapse the Left Sidebar by clicking "Painel" in the top bar.
2. Ensure the Right Sidebar (Roteiro) is also collapsed.
3. Rapidly click through all slides in the canvas or use the keyboard Left/Right arrows.
4. Verify that the canvas scrolls strictly internally; neither the left nor right sidebar ever flashes, peeks, or shifts the window.

## Scenario 3: Canvas Design Philosophy Themes
1. In Left Sidebar, go to **Design** (Cores & Temas).
2. Click **Criar Novo Tema**.
3. Under "Filosofias de Design (Canvas)", click **Brutalist Joy**.
4. Verify that dark asphalt colors and electric lime accents are populated with high contrast.
5. Click **Salvar e Aplicar Tema**.
6. Verify the carousel adopts the theme immediately.
