# Quickstart Validation Guide: Flexible Profile Positioning & Gemini Script Focus

**Feature**: `005-flexible-profile-positioning`
**Status**: Ready for Validation

---

## 1. Setup & Environment

1. Dev server running: `cmd /c "npm run dev"`
2. Access `http://localhost:3000/`

---

## 2. Validation Scenarios

### Scenario 1: Profile Repositioning to Top Corners
1. In the studio left sidebar, navigate to the **"Perfil"** tab.
2. Fill in Name ("Alex Silva") and Handle ("@alexsilva").
3. In the "Posição da Assinatura no Slide" section, click **"Superior Direito"** (`top-right`).
4. **Verification**:
   - The signature bar moves immediately to the top right of the slides.
   - The headline and body text remain centered/legible without overlapping.
   - Click **"Superior Esquerdo"** (`top-left`) and verify immediate update to top left.

### Scenario 2: Profile Repositioning to Bottom Corners
1. In the **"Perfil"** tab, click **"Inferior Direito"** (`bottom-right`).
2. **Verification**:
   - The signature bar aligns cleanly to the bottom right of the slides.
   - Click **"Inferior Esquerdo"** (`bottom-left` - default) and verify it returns to bottom left.

### Scenario 3: Removal of AI Theme Generator in "Cores" Tab
1. In the left sidebar, click the **"Cores"** tab.
2. **Verification**:
   - The "Gerador de Temas por IA" input and button are completely removed.
   - The "Criar Novo Tema" button, manual gradient/solid builder, and theme catalogs remain fully functional.

### Scenario 4: Gemini API Key for Script Generation
1. In the initial landing view (`ScriptInputView`) or in the studio Roteiro editor, verify that the Gemini API Key input is present, masked (`type="password"`), and has an eye toggle.
2. Enter a key (or leave empty for deterministic partition) and generate slides from a sample script.
3. **Verification**:
   - The slides generate without errors.
   - The key remains safely masked and stored in IndexedDB.

### Scenario 5: High-Res Export Verification
1. With the profile positioned in **"Superior Esquerdo"** (`top-left`), click **"Baixar PNGs (ZIP)"**.
2. Open any exported PNG image.
3. **Verification**:
   - The profile is rendered at the top-left position in high resolution with zero misalignment.
