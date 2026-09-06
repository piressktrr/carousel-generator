# Contract: Workspace Service (Feature 003 Updates)

**Module**: `src/services/workspaceService.js`
**Scope**: Pure functional contracts for feature 003.

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
- `rawScript` (`string`): The full raw script entered in the RightSidebar.
- `existingSlides` (`Slide[]`): The current array of slides in the workspace before regeneration.

### Returns
- `Slide[]`: A newly constructed array of slides conforming to the new text segmentation, where for each index `i`:
  - `slide.dockedImage = existingSlides[i]?.dockedImage || null`
  - `slide.overlays = existingSlides[i]?.overlays || []`
  - `slide.slideTemplate = existingSlides[i]?.slideTemplate || 'classic'`
  - `slide.subtext = existingSlides[i]?.subtext || ''`

---

## 2. `updateCreatorBranding`

Updates creator branding properties with validation.

```typescript
function updateCreatorBranding(
  currentBranding: CreatorProfile,
  updates: Partial<CreatorProfile>
): CreatorProfile;
```

---

## 3. `updateSlideTemplate` & `applyTemplateToAllSlides`

```typescript
function updateSlideTemplate(
  slides: Slide[],
  slideId: string,
  templateId: 'classic' | 'quote' | 'minimalist'
): Slide[];

function applyTemplateToAllSlides(
  slides: Slide[],
  templateId: 'classic' | 'quote' | 'minimalist'
): Slide[];
```

### Invariants
- Supported template IDs are strictly `'classic'`, `'quote'`, `'minimalist'`.
- Text content and docked media remain intact.
