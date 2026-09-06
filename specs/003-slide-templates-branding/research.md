# Research: Slide Templates, Subtext, Branding & Studio Layout Refinement

**Feature**: `003-slide-templates-branding`
**Status**: Completed (Refined 2026-09-06)

---

## 1. Ergonomic Dual-Sidebar Architecture & Independent Toggles

### Decision
Implement a decoupled two-sided workspace layout:
- **Left Sidebar (`LeftSidebar.jsx`)**: Dedicated to visual customization and slide-level properties:
  - Slide Content & Subtext
  - Image Docking
  - 3x3 Overlay Icons
  - Typography (Fonts)
  - Color Palettes & Visual Themes
  - Creator Branding (Profile, Verified Badge & Squircle Avatar)
- **Right Sidebar (`RightSidebar.jsx`)**: Dedicated exclusively to raw script management:
  - Full script text editor
  - Word & character counter
  - "Atualizar Slides pelo Roteiro" bulk regeneration action with positional media preservation
- **Independent Visibility Toggles**:
  - `isLeftSidebarOpen: boolean` (default: `true`)
  - `isRightSidebarOpen: boolean` (default: `false` or toggleable with a dedicated button in the header toolbar)
  - Floating/edge toggle buttons allow expanding or collapsing either sidebar smoothly without layout jumps.

### Rationale
- Completely declutters the left sidebar.
- Placing the script on the right and slide tools on the left follows industry-standard pro creative tooling (e.g. Canva, Figma, Final Cut).
- Collapsing sidebars gives 100% horizontal viewport to the canvas on smaller screens or presentation reviews.

---

## 2. Streamlining Templates to 3 High-Fidelity Layouts

### Decision
Trim the curated slide template catalog to the 3 robust, highly effective layouts:
1. `classic`: Balanced layout for structured headlines and narrative body text.
2. `quote`: Editorial layout with prominent quote glyphs (`“`), italicized impact typography, and citation styling.
3. `minimalist`: Ultra-spacious layout with generous negative space and centered focal message.

Drop `bullets` and `stat` from the template selector:
- Avoids fragile auto-parsing of bullet points and numeric regex.
- Guarantees 100% visual predictability across all themes and export formats.

---

## 3. Removal of PDF Export

### Decision
Remove the PDF export button and dependency overhead from `ExportToolbar.jsx`. Retain only the PNGs ZIP archive export (`exportAsZip`).

### Rationale
- Directly requested by the user ("Tira ali a parte de PDF, que está ali de exportar para PDF, aquilo ali eu não vou usar, não precisa").
- Simplifies toolbar UI to a single, clear call to action.

---

## 4. Removal of "Tipo de Slide" Selector

### Decision
Remove the dropdown `<select>` containing "Capa / Conteúdo / CTA" from `SlideContentTab.jsx`.

### Rationale
- The template and subtext already provide superior visual distinction.
- Eliminates redundant configuration and keeps the content tab focused purely on text and subtext.

---

## 5. Dedicated Color Palette & Visual Style Tab

### Decision
Extract the color palette and theme selector out of `TypographyTab.jsx` into a dedicated `ThemesTab.jsx` in `src/components/LeftSidebar/ThemesTab.jsx`.
- **`TypographyTab.jsx`**: Focuses strictly on font families, sizes, and per-slide font overrides.
- **`ThemesTab.jsx`**: Dedicated to theme selection (*Azul Celestial*, *Clean Ivory*, *Scandinavian Slate*, *Light Clean*, etc.) with visual previews and categories.
