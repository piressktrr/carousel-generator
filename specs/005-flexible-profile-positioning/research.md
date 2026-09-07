# Technical Research: Flexible Profile Positioning & Gemini Script Focus

**Feature**: `005-flexible-profile-positioning`
**Status**: Completed

---

## 1. Profile Positioning Architecture

### Decision
Implement 6-point flexbox anchoring for `.slide-branding-bar` controlled by `profile.position`:
- `top-left`: `order: -1`, `align-self: flex-start`, `margin-bottom: auto`, `margin-top: 0`
- `top-center`: `order: -1`, `align-self: center`, `margin-bottom: auto`, `margin-top: 0`
- `top-right`: `order: -1`, `align-self: flex-end`, `margin-bottom: auto`, `margin-top: 0`
- `bottom-left`: `order: 1`, `align-self: flex-start`, `margin-top: auto`, `margin-bottom: 0` (default)
- `bottom-center`: `order: 1`, `align-self: center`, `margin-top: auto`, `margin-bottom: 0`
- `bottom-right`: `order: 1`, `align-self: flex-end`, `margin-top: auto`, `margin-bottom: 0`

### Rationale
- Using CSS Flexbox `order` and standard `margin: auto` alignments within `.slide-content-box` avoids absolute positioning z-index overlapping and collision bugs with long headlines or body text.
- Export fidelity is 100% preserved because `html-to-image` renders native flex flow without clipping issues.
- Zero layout shift: updating `profile.position` triggers immediate re-render across all slide cards in < 16ms.

### Alternatives Considered
- *Absolute positioning (`position: absolute` with inset coordinates)*: Rejected because if the text body is very long, absolute elements will overlap directly over text content, ruining readability. Flex ordering ensures the text box expands or shrinks without collision.

---

## 2. Gemini AI Scope Simplification

### Decision
- Remove the "Gerador de Temas por IA" section from `ThemesTab.jsx`.
- Preserve custom theme creation (manual solid colors & multi-stop angular gradients) and built-in themes.
- Preserve Gemini API Key management in `ScriptInputView.jsx` and make it accessible in the studio for script restructuring (`RightSidebar.jsx` / `workspaceService.generateSlidesFromScript`).
- Ensure the API key remains strictly masked (`type="password"` with `Eye`/`EyeOff` toggle) and saved in IndexedDB (`storageService.saveGeminiApiKey`).

### Rationale
- Directly fulfills the user's explicit request: "retira a criação de temas com o Gemini, não precisa disso. Mas deixe a chave de API ali para a pessoa colocar às vezes criar um roteiro com o Gemini."
- Eliminates unused network calls, simplifies the "Cores" tab, and maintains security by keeping the API key masked.

---

## 3. Storage & Backward Compatibility

### Decision
- Default `profile.position` to `'bottom-left'` if undefined or null.
- Update `storageService.getProfile()` and `storageService.getWorkspace()` to guarantee `position: profile?.position || 'bottom-left'`.
- Fully backward-compatible with previously saved projects and profiles.
