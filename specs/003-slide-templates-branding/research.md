# Research: Slide Templates, Subtext, Enhanced Branding & Clean Themes

**Feature**: `003-slide-templates-branding`
**Status**: Completed

## 1. Raw Script Bulk Replacement with Positional Media Preservation

### Decision
Implement a pure functional bulk regeneration service (`regenerateSlidesFromRawScript`) in `src/services/workspaceService.js` that:
1. Receives `rawScript` (string) and existing `slides` (array).
2. Uses `textSegmenter.js` to parse and produce the new slide text structures (`title`, `body`, `subtext`).
3. Retains media customizations by ordinal position index:
   ```javascript
   const newSlides = parsedSegments.map((segment, index) => {
     const previousSlide = existingSlides[index];
     return {
       id: previousSlide?.id || `slide-${Date.now()}-${index}`,
       title: segment.title,
       body: segment.body,
       subtext: segment.subtext || previousSlide?.subtext || '',
       slideTemplate: previousSlide?.slideTemplate || 'classic',
       dockedImage: previousSlide?.dockedImage || null,
       imagePosition: previousSlide?.imagePosition || 'none',
       splitRatio: previousSlide?.splitRatio || 50,
       overlays: previousSlide?.overlays || Array(9).fill(null),
       order: index + 1
     };
   });
   ```

### Rationale
- Strictly aligns with Clarification Session 2026-09-05 (Option B).
- Prevents user frustration of losing uploaded images or carefully positioned overlays when fine-tuning script text.
- Fully adheres to Principle I (pure functions, zero side effects).

### Alternatives Considered
- *Content-similarity fuzzy matching*: Overly complex, non-deterministic, violates KISS (Principle II).
- *Discarding all media*: Violates user expectations and creates friction.

---

## 2. Creator Branding: Verified Badge & Squircle Avatar Shape

### Decision
1. **Verified Badge**:
   - Store `hasVerifiedBadge: boolean` in `CreatorProfile`.
   - Render a custom SVG / Lucide `BadgeCheck` icon with glowing celestial cyan/blue fill (`#00A3FF`) immediately adjacent to the creator name.
   - Enforce `white-space: nowrap` on the name + badge container to prevent wrapping issues on long author names.
2. **Avatar Shape**:
   - Store `avatarShape: 'circle' | 'square'` in `CreatorProfile`.
   - In CSS / Tailwind:
     - `'circle'` → `rounded-full` (border-radius 9999px)
     - `'square'` → `rounded-xl` (squircle radius 10px-12px) with `overflow-hidden` and `object-cover` to prevent rectangle distortion.

### Rationale
- Direct satisfaction of user request.
- Squircle border radius provides modern iOS/X/Instagram design language without sharp, unrefined corners.
- Persisted alongside name and handle in IndexedDB (`storageService.js`).

---

## 3. Subtext Architecture & Visual Hierarchy

### Decision
1. Extend `Slide` entity with `subtext?: string`.
2. Dedicated UI in `LeftSidebar/SlideContentTab.jsx` with real-time editing.
3. In `SlideCard.jsx`:
   - Render subtext under the main heading/hook with semantic `<p className="slide-subtext">`.
   - Style with CSS variable `--slide-subtext`, slightly reduced font size (0.85rem - 1rem relative to body), softer contrast/opacity (80-85%), and optimal line height (1.5).
   - If `subtext` is empty, render nothing without residual margins or ghost spacing.

### Rationale
- Solves carousel content structuring: hooks need punchy titles while supporting details belong in secondary hierarchy.
- Completely non-destructive to existing slides without subtext.

---

## 4. Slide Templates Engine

### Decision
Support 5 curated layout templates:
1. `classic`: Standard balanced card with central focus.
2. `quote`: Editorial layout with decorative quotation glyphs, refined serif/italic emphasis, and citation styling.
3. `bullets`: Automated line-by-line parsing of bullet points or numbered lists with bioluminescent badge markers.
4. `stat`: Large metric/number display (e.g. "87%", "10x", "R$ 50k") with explanatory subtext underneath.
5. `minimalist`: Ultra-spacious layout with maximized breathing room and subtle micro-accents.

Implementation:
- Template selector in `LeftSidebar/SlideContentTab.jsx` or a dedicated template selector.
- Option to apply to "Slide Atual" or "Todos os Slides".
- Layout rendering driven by template classes in `SlideCard.jsx` without heavy layout frameworks.

### Rationale
- Pure component composition and CSS classes.
- Zero dependencies added (respecting Principle II).

---

## 5. Clean Themes & Celestial Blue Refactor

### Decision
1. **Refactor Blue to "Azul Celestial"**:
   - Current blue (`#0284c7`) is a dull corporate slate blue.
   - Refactor to authentic **Celestial Blue / Radiant Azure**:
     - Primary Accent: `#00A3FF` (vivid celestial electric sky blue).
     - Radiant Highlight: `#00D2FF` (bioluminescent celestial cyan glow).
     - Glow Shadow: `0 0 24px rgba(0, 163, 255, 0.45)`.
     - Deep Cosmic Base: `#051329` to `#0B1E3D` (rich celestial night sky rather than muddy black).
2. **Add Clean Design Themes**:
   - `clean-ivory`: Warm cream background (`#FAF8F5`), deep graphite typography (`#18181B`), warm subtle borders (`rgba(24, 24, 27, 0.08)`), refined editorial aesthetic.
   - `clean-slate`: High-end Scandinavian clean dark (`#0E1117`), crisp borders (`rgba(255, 255, 255, 0.08)`), vivid celestial blue accents (`#00A3FF`).
   - `celestial-azure`: Deep celestial night gradient with vivid electric blue typography and glowing accents.
3. **Preserve Existing Themes**:
   - Keep `abyssal-glow`, `minimalist-obsidian`, `sunset-nebula`, and updated `light-clean`.
4. **Reference Image Inspired Theme Architecture**:
   - Register a dedicated theme slot (`reference-aesthetic` / `clean-editorial`) configured to be directly matched or fine-tuned once the user supplies the reference image.

### Rationale
- Exactly addresses the user's prompt:
  > "me permita com que o design que eu possa escolher das cores que estão disponíveis seja mais clean. Tenha opções mais cleans. Então, mantenha as opções de agora, mas me permita ter opções mais cleans e também refatore um pouquinho da cor azul, porque ela não está um azul mesmo. Faça dar um azul celestial e deixe ela mais viva, assim, aparecendo mais."
