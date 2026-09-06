# Quickstart Validation Guide: Refined Studio Layout, Templates & Branding

**Feature**: `003-slide-templates-branding`
**Status**: Ready for Validation

---

## 1. Prerequisites & Setup

1. Node.js (v18+) and npm.
2. Ensure you are on branch `003-slide-templates-branding`.
3. Start development server:
   ```bash
   cmd /c "npm run dev"
   ```
4. Access `http://localhost:3000/`.

---

## 2. End-to-End Validation Scenarios

### Scenario 1: Bulk Raw Script via Dedicated Right Sidebar
1. In the studio top bar, locate and click the **"Roteiro"** toggle button on the right.
2. The **Barra Lateral Direita** expands smoothly displaying the complete raw script.
3. Paste a new 4-paragraph script and click **"Atualizar Slides pelo Roteiro"**.
4. **Verification**:
   - The canvas recalculates to 4 slides.
   - Any docked images and 3x3 overlays from prior slides are preserved in matching ordinal positions.

### Scenario 2: Independent Sidebar Toggles (Collapsible Panels)
1. Click the toggle button for the **Barra Esquerda**.
2. **Verification**: The left sidebar collapses; the canvas re-centers and expands.
3. Click the toggle button for the **Barra Direita** (Roteiro).
4. **Verification**: Both sidebars are hidden; the canvas occupies full horizontal workspace for distraction-free preview.
5. Click both toggles again to restore sidebars.

### Scenario 3: Simplified Export (PNGs ZIP Only)
1. Examine the top right export toolbar in the canvas header.
2. **Verification**:
   - Only the **"Baixar PNGs (ZIP)"** button is present.
   - The PDF export button has been completely removed.
3. Click "Baixar PNGs (ZIP)" and verify the ZIP download containing high-resolution PNGs of all slides.

### Scenario 4: Clean Content Editing (No "Tipo de Slide")
1. Open the Left Sidebar and select the **"Slide"** tab.
2. **Verification**:
   - The dropdown for "Tipo de Slide" (Capa/Conteúdo/CTA) is gone.
   - The interface cleanly presents: Texto Principal, Subtexto (com contador 0/280), e ações de organização.
3. Type text into "Subtexto" and verify it renders subordinate to the main headline.

### Scenario 5: Curated 3 Templates
1. In the "Slide" tab, observe the **Template do Slide** selector.
2. **Verification**:
   - Exactly 3 templates are displayed: *Cartão Clássico*, *Citação Editorial*, and *Minimalista Foco*.
   - *Lista com Marcadores* and *Destaque Numérico* are excluded.
3. Switch slide 1 to *Citação Editorial* (displays stylized quotes `“`).
4. Switch slide 2 to *Minimalista Foco* (displays centered spacious focus).
5. Click "Aplicar este template a todos os slides" and verify uniform application.

### Scenario 6: Dedicated Color Palette & Themes Tab
1. Observe the Left Sidebar navigation tabs.
2. **Verification**:
   - There is a dedicated **"Cores"** tab with a Palette icon, separate from the **"Fonte"** tab.
3. Open the **"Cores"** tab:
   - Select **"Azul Celestial"** → vivid luminous blue `#00A3FF` / `#00D2FF` is applied.
   - Select **"Clean Ivory"** → warm editorial minimalist palette is applied.
   - Select **"Scandinavian Slate"** → dark Nordic minimalist palette is applied.
4. Open the **"Fonte"** tab:
   - Contains exclusively font selection and per-slide font overrides.

### Scenario 7: Verified Badge & Squircle Avatar
1. Open the **"Perfil"** tab in the Left Sidebar.
2. Toggle **Selo Verificado** to ON → glowing celestial badge appears next to author name.
3. Select **Foto Quadrada** → avatar adopts rounded squircle shape (`rounded-xl` / 8px).

### Scenario 8: Local Storage Persistence
1. Reload page with F5.
2. **Verification**: 100% of state (subtext, templates, theme, branding, squircle avatar, and raw script) rehydrates seamlessly.
