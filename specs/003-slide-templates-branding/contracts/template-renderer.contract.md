# Contract: Slide Template Renderer (Feature 003 Updates)

**Module**: `src/components/SlideCard.jsx` & `src/styles/workspace.css`
**Scope**: Slide template layouts, subtext typography, verified badge, and avatar squircle styling.

---

## 1. Slide Layout Templates

The component `SlideCard` evaluates `slide.slideTemplate || 'classic'` to apply structural classes:

### Layout Behaviors
1. **`classic`**:
   - Layout: Balanced vertical flow with centered/left-aligned header, subtext, and content card.
   - Ideal for: General storytelling, introductory slides.
2. **`quote`**:
   - Layout: Distinctive open/close quotation marks glyph (`“`), italicized/accented text, attribution subtext.
   - Ideal for: Powerful statements, insights, client or philosopher quotes.
3. **`bullets`**:
   - Layout: Parses content lines into ordered or bulleted list blocks with glowing circular bullet pins.
   - Ideal for: Step-by-step guides, lists of tips, actionable takeaways.
4. **`stat`**:
   - Layout: Extracts or highlights prominent stat/number (e.g., `85%`, `10x`, `+120%`) with large font sizing, accompanied by supportive explanation subtext.
   - Ideal for: Data proof points, before/after metrics.
5. **`minimalist`**:
   - Layout: Generous negative space, large clean typography, centered focal message, absence of heavy decorative card borders.
   - Ideal for: High-impact punchy hooks and closing slide CTAs.

---

## 2. Verified Badge & Squircle Avatar Rendering

### Verified Badge
- Element: Rendered adjacent to author name in `SlideCard` header/footer autoria.
- Icon: Bioluminescent check badge (`BadgeCheck` / custom SVG).
- Color: Inherits `--slide-accent` or celestial sky blue (`#00A3FF`).
- Container: Flex row with `items-center gap-1.5 whitespace-nowrap`.

### Avatar Shape
- If `avatarShape === 'square'`:
  - Classes: `rounded-xl object-cover aspect-square` (squircle radius ~10px).
- If `avatarShape === 'circle'` (default):
  - Classes: `rounded-full object-cover aspect-square`.
