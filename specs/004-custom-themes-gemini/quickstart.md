# Quickstart Validation Guide: Clean Canvas, Custom Themes & Gemini AI

**Feature**: `004-custom-themes-gemini`
**Status**: Ready for Validation

---

## 1. Setup & Environment

1. Dev server running: `cmd /c "npm run dev"`.
2. Access `http://localhost:3000/`.

---

## 2. Validation Scenarios

### Scenario 1: Clean Canvas (No Slide Labels)
1. Open any project or generate slides from the default script.
2. Examine the slide cards on the central canvas.
3. **Verification**:
   - The internal tags ("Capa", "Slide 2", "Fechamento / CTA") are completely absent.
   - The headline, subtext, docked images, and branding bar render cleanly without artificial visual clutter.
   - External label on top ("1 de 5", "● Editando") remains for navigation.

### Scenario 2: Masked Gemini API Key Handling
1. In the initial landing screen (`ScriptInputView`), observe the Gemini API Key input field.
2. **Verification**:
   - The field is masked by default (`type="password"`).
   - Clicking the eye icon toggles plain text visibility.
   - The key is saved in IndexedDB and stays masked when navigating to the studio.

### Scenario 3: Manual Custom Theme Creation with Gradient
1. In the studio left sidebar, open the **"Cores"** tab.
2. Click **"Criar Novo Tema"**.
3. Set theme name to "Cyberpunk Neon".
4. Configure an angular gradient for the background (`#0d0221` to `#0f0c29` at 135°).
5. Set heading color to `#00f0ff`, accent to `#ff007f`, text to `#ffffff`.
6. Click **"Salvar e Aplicar Tema"**.
7. **Verification**:
   - The new theme appears in the custom themes catalog with preview.
   - All slides in the canvas instantly reflect the new gradient background and neon typography.
   - Refresh the page (F5) and verify the theme persists.

### Scenario 4: AI Theme Generation via Gemini API
1. In the **"Cores"** tab, locate the **"Gerador de Temas por IA"** section.
2. Provide a valid Gemini API key (if not already set).
3. Type prompt: "Estética cafeteria moderna minimalista em tons de cappuccino e caramelo".
4. Click **"Gerar Tema com IA"**.
5. **Verification**:
   - A complete palette is generated within 4 seconds with a creative title (e.g. "Minimalist Cappuccino").
   - Click "Salvar e Aplicar": the theme is added to custom themes and applied to all slides.

### Scenario 5: Deleting a Custom Theme
1. In the **"Cores"** tab, click the delete (trash) icon on a custom theme.
2. **Verification**:
   - The theme is cleanly removed from the catalog.
   - If it was active, the canvas gracefully rolls back to the default theme (*Abyssal Glow*) without errors.
