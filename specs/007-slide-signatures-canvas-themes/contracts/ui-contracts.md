# UI Contracts: Feature 007

**Feature**: `007-slide-signatures-canvas-themes`
**Date**: 2026-09-06

## 1. BrandingTab Contract Extension

```typescript
interface BrandingTabProps {
  activeSlide: SlideItem | null;
  profile: ProfileSignature;
  onUpdateProfile: (profile: ProfileSignature) => void;
  onUpdateSlide: (slideId: string, changes: Partial<SlideItem>) => void;
}
```

## 2. SlideCard Effective Positioning Contract

```typescript
// Resolution logic inside SlideCard:
const effectivePosition = slide.profilePosition !== undefined && slide.profilePosition !== null
  ? slide.profilePosition
  : (profile?.position || 'bottom-left');

const isProfileVisible = effectivePosition !== 'hidden' && (Boolean(profile?.name) || Boolean(profile?.handle) || Boolean(profile?.avatar));
```

## 3. CustomThemeBuilder Contract Extension

```typescript
interface CustomThemeBuilderProps {
  onSaveTheme: (theme: CustomTheme) => void;
  onClose: () => void;
  designMovements?: CanvasDesignMovement[];
}
```
