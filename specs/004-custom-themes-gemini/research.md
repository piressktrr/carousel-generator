# Research: Clean Canvas, Custom Dynamic Themes & Secure Gemini AI Integration

**Feature**: `004-custom-themes-gemini`
**Status**: Completed

---

## 1. Clean Canvas: Slide Tag Removal

### Decision
Remove the internal label badge (`<div className="slide-tag">{getBadgeLabel()}</div>`) from `src/components/SlideCard.jsx`.

### Rationale
- The user directly requested the removal of slide labels ("Capa", "Slide 2", "Slide 3") from within the slides.
- The external context header of the card already displays the slide ordinal index ("1 de 5", "● Editando"), rendering the internal badge redundant.
- Eliminating this element ensures that exported PNG images and live stage previews match real-world publishing designs.

### Alternatives Considered
- *Toggle to show/hide badge*: Unnecessary complexity since the user explicitly requested removal.
- *Move badge outside*: Redundant with the existing `slide-card-header-label`.

---

## 2. Dynamic Custom Themes & CSS Variable Injection

### Decision
Implement runtime CSS variable injection via inline styles on the workspace container (`.studio-workspace` and `.slides-canvas-container`), combined with an expanded Theme entity supporting both solid hex colors and multi-stop angular gradients:
```css
--slide-bg: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
--slide-heading: #38bdf8;
--slide-accent: #00a3ff;
--slide-text: #f8fafc;
--slide-subtext: #94a3b8;
```

### Rationale
- Pure CSS variables allow immediate, zero-latency reactive updates across all slide cards and templates without re-rendering canvas DOM or reloading stylesheets.
- Allows infinite custom themes without bloating `themes.css`.
- Preserves full compatibility with all existing native themes (`abyssal-glow`, `clean-ivory`, `celestial-azure`, etc.).

### Gradient Builder Architecture
- Supports linear and radial gradients.
- User controls angle (0° to 360°), stops (array of `{ color: string, position: number, opacity: number }`), and preview in real time.

---

## 3. Secure Gemini API Key Handling & AI Theme Generation

### Decision
1. **Masked Inputs**: Use `<input type="password">` with a toggle visibility button (`Eye` / `EyeOff` from `lucide-react`) in both `ScriptInputView.jsx` (landing) and `ThemesTab.jsx` (studio).
2. **Local Persistence**: Save the key in IndexedDB under `gemini_api_key` via `storageService.js` with clear indicator of connected status.
3. **AI Theme Generation Method**: Implement `aiService.generateTheme(prompt, apiKey)` that calls Gemini 2.5/Flash model via REST API requesting structured JSON output:
   ```json
   {
     "name": "Nome Criativo do Tema",
     "bg": "linear-gradient(135deg, #0f172a 0%, #020617 100%)",
     "heading": "#38bdf8",
     "accent": "#0ea5e9",
     "text": "#f8fafc",
     "subtext": "#94a3b8"
   }
   ```
4. **Resilient Fallback**: If no API key is provided or the network is offline, AI buttons gracefully prompt for the key without blocking any manual theme creation or editing.

---

## 4. Contrast & Legibility Validation

### Decision
Implement a pure utility function `calculateContrastRatio(foreground, background)` using the WCAG relative luminance formula.
- If contrast between `text`/`heading` and `bg` is less than 3:1, show an ergonomic warning indicator ("Atenção: contraste baixo para leitura") and suggest automatic tone inversion.
