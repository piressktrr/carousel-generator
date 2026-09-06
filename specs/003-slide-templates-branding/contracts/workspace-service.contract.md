# Contract: Workspace Service (Feature 003 Updates)

**Module**: `src/services/workspaceService.js`
**Scope**: New and modified pure functional contracts for feature 003.

---

## 1. `regenerateSlidesFromRawScript`

Regenerates a new set of slides from a complete raw script while preserving docked images and overlays positionally.

```typescript
function regenerateSlidesFromRawScript(
  rawScript: string,
  existingSlides: Slide[]
): Slide[];
```

### Parameters
- `rawScript` (`string`): The full raw markdown/text script entered in the LeftSidebar.
- `existingSlides` (`Slide[]`): The current array of slides in the workspace before regeneration.

### Returns
- `Slide[]`: A newly constructed array of slides conforming to the new text segmentation, where for each index `i`:
  - `slide.dockedImage = existingSlides[i]?.dockedImage || null`
  - `slide.imagePosition = existingSlides[i]?.imagePosition || 'none'`
  - `slide.splitRatio = existingSlides[i]?.splitRatio || 50`
  - `slide.overlays = existingSlides[i]?.overlays || Array(9).fill(null)`
  - `slide.slideTemplate = existingSlides[i]?.slideTemplate || 'classic'`
  - `slide.subtext = segment.subtext || existingSlides[i]?.subtext || ''`

### Invariants
- Pure function: does not mutate `existingSlides`.
- Safe against empty string: if `rawScript` is empty, returns at least 1 fallback slide.

---

## 2. `updateCreatorBranding`

Updates creator branding properties with validation.

```typescript
function updateCreatorBranding(
  currentBranding: CreatorProfile,
  updates: Partial<CreatorProfile>
): CreatorProfile;
```

### Parameters
- `currentBranding` (`CreatorProfile`): Existing profile.
- `updates` (`Partial<CreatorProfile>`): Fields to update (`name`, `handle`, `avatarUrl`, `hasVerifiedBadge`, `avatarShape`).

### Returns
- `CreatorProfile`: New frozen/sanitized profile object with updated attributes.

---

## 3. `updateSlideTemplate` & `applyTemplateToAllSlides`

```typescript
function updateSlideTemplate(
  slides: Slide[],
  slideIndex: number,
  templateId: 'classic' | 'quote' | 'bullets' | 'stat' | 'minimalist'
): Slide[];

function applyTemplateToAllSlides(
  slides: Slide[],
  templateId: 'classic' | 'quote' | 'bullets' | 'stat' | 'minimalist'
): Slide[];
```

### Invariants
- Non-destructive: text content (`title`, `body`, `subtext`) and media (`dockedImage`, `overlays`) remain strictly intact.
