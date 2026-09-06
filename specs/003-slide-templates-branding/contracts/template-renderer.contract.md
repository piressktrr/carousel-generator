# Contract: Slide Template Renderer (Refined)

**Module**: `src/components/SlideCard.jsx` & `src/styles/workspace.css`
**Scope**: Slide template layouts, subtext typography, verified badge, and avatar squircle styling.

---

## 1. Curated Slide Layout Templates

The component `SlideCard` evaluates `slide.slideTemplate || 'classic'` to apply structural classes:

### Layout Behaviors
1. **`classic`**:
   - Layout: Balanced vertical flow with centered/left-aligned header, subtext, and content card.
   - Ideal for: General storytelling, introductory slides.
2. **`quote`**:
   - Layout: Distinctive open quotation mark glyph (`“`), italicized/accented text, attribution subtext.
   - Ideal for: Powerful statements, insights, client or author quotes.
3. **`minimalist`**:
   - Layout: Generous negative space, large clean typography, centered focal message, absence of heavy decorative card borders.
   - Ideal for: High-impact punchy hooks and closing slide CTAs.

*(Note: `bullets` and `stat` were pruned to guarantee visual reliability).*

---

## 2. Verified Badge & Squircle Avatar Rendering

### Verified Badge
- Element: Rendered adjacent to author name in `SlideCard` header/footer autoria.
- Icon: Bioluminescent check badge SVG / Lucide.
- Color: Inherits celestial sky blue (`#00A3FF`).
- Container: Flex row with `items-center gap-1.5 whitespace-nowrap`.

### Avatar Shape
- If `avatarShape === 'square'`:
  - Classes: `.branding-avatar.avatar-square` (squircle radius ~8px).
- If `avatarShape === 'circle'` (default):
  - Classes: `.branding-avatar.avatar-circle` (border-radius: 50%).
