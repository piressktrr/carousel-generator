# Quickstart Validation Guide: Slide Templates, Subtext, Branding & Clean Themes

**Feature**: `003-slide-templates-branding`
**Status**: Ready for Implementation Validation

---

## 1. Prerequisites & Setup

1. Node.js (v18+) and npm installed.
2. Ensure you are on branch `003-slide-templates-branding`.
3. Install dependencies (if not already cached):
   ```bash
   cmd /c "npm install"
   ```
4. Start local development server:
   ```bash
   cmd /c "npm run dev"
   ```
5. Open browser at `http://localhost:5173` (or the port reported by Vite).

---

## 2. End-to-End Validation Scenarios

### Scenario 1: Bulk Raw Script Replacement with Media Preservation
1. Load a carousel with 4 slides in the studio.
2. In Slide 2, dock an image (Split Left, 40%).
3. In Slide 3, place an overlay icon at Center (C).
4. Navigate to the LeftSidebar and open the **Roteiro (Raw Script)** tab.
5. Paste a new 5-slide script into the textarea.
6. Click **"Atualizar Slides pelo Roteiro"**.
7. **Verification**:
   - The canvas now displays 5 new slides with the updated script texts.
   - Slide 2 still retains the docked image (Split Left, 40%).
   - Slide 3 still retains the center overlay icon.
   - No crash or page reload occurred.

### Scenario 2: Verified Badge & Avatar Shape Toggle
1. Open the LeftSidebar and switch to the **Identidade / Branding** tab.
2. Locate the **Selo Verificado** switch and toggle it to **ON**.
3. **Verification**: All slides with author metadata immediately render a glowing celestial blue verified badge right next to the creator's name without line wrapping.
4. Locate the **Formato da Foto** selector and choose **Quadrada (Squircle)**.
5. **Verification**: The avatar immediately transitions from circular to squircle rounded-square (`rounded-xl`).
6. Toggle back to **Redonda** → avatar returns to circular format (`rounded-full`).

### Scenario 3: Slide Subtext Hierarchy
1. Select Slide 1.
2. In the LeftSidebar **Conteúdo** tab, enter a subtext in the **Subtexto** input (e.g., *"Guia definitivo para acelerar seus resultados práticos"*).
3. **Verification**:
   - Slide 1 displays the main hook prominently, followed immediately by the subtext in secondary hierarchy.
   - Contrast is balanced and legible according to the active theme tokens.
   - Slides with empty subtext render cleanly without residual vertical gap.

### Scenario 4: Slide Layout Templates
1. Select Slide 2.
2. Under **Template do Slide**, click **Citação Editorial (Quote)**.
3. **Verification**: Slide 2 transforms into an editorial quote layout with decorative quote glyphs and refined typography.
4. Select Slide 3 and choose **Lista com Marcadores (Bullets)**.
5. **Verification**: Slide 3 formats items with bioluminescent bullet pins.
6. Click **"Aplicar template a todos os slides"** with Minimalist selected.
7. **Verification**: All slides adopt the minimalist layout while preserving all individual text and docked media.

### Scenario 5: Clean Themes & Celestial Blue
1. In the LeftSidebar, open the **Tema** selector.
2. Select **Azul Celestial**.
3. **Verification**: The slide background transitions to a rich cosmic night gradient, with headings and accents displaying a vivid, luminous celestial blue (`#00A3FF` / `#00D2FF`) instead of dull greyish blue.
4. Select **Clean Ivory**.
5. **Verification**: Slides switch to a clean editorial light cream background (`#FAF8F5`) with crisp graphite text and subtle borders.
6. Select **Scandinavian Slate**.
7. **Verification**: Slides switch to a minimal Nordic dark aesthetic with crisp subtle borders.

### Scenario 6: Persistence Across Page Reload
1. With custom subtexts, templates, verified badge ON, squircle avatar, and Celestial Blue theme applied, press **F5 (Reload)**.
2. **Verification**: 100% of the state (subtexts, template selections, branding badges, avatar shape, and theme) is rehydrated intact from IndexedDB.
