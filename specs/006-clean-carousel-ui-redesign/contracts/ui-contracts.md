# UI Component Contracts & State Interfaces

**Feature**: `006-clean-carousel-ui-redesign`
**Date**: 2026-09-06

## 1. SlidesCanvas Contract

```typescript
interface SlidesCanvasProps {
  slides: SlideItem[];
  activeSlideId: string | null;
  globalFont: string;
  profile: ProfileSignature;
  currentTheme: string;
  themeInlineStyles: React.CSSProperties;
  aspectRatio: '4:5' | '1:1';
  onSelectSlide: (slideId: string) => void;
  onToggleAspectRatio: (ratio: '4:5' | '1:1') => void;
  renderTopRight: React.ReactNode;
  isLeftSidebarOpen: boolean;
  onToggleLeftSidebar: () => void;
  isRightSidebarOpen: boolean;
  onToggleRightSidebar: () => void;
}
```

## 2. SlideCard Contract

```typescript
interface SlideCardProps {
  slide: SlideItem;
  index: number;
  total: number;
  globalFont: string;
  profile: ProfileSignature;
  themeInlineStyles: React.CSSProperties;
  isActive: boolean;
  aspectRatio: '4:5' | '1:1';
  onSelect: () => void;
}
```

## 3. LeftSidebar Contract (Consolidated into 4 Categories)

```typescript
interface LeftSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSlide: SlideItem | null;
  slides: SlideItem[];
  globalFont: string;
  profile: ProfileSignature;
  currentTheme: string;
  customThemes: CustomTheme[];
  apiKey: string;
  activeCategory?: 'slides-content' | 'design-themes' | 'typography' | 'brand-elements';
  onSelectCategory?: (cat: string) => void;
  onSaveCustomTheme: (theme: CustomTheme) => void;
  onDeleteCustomTheme: (themeId: string) => void;
  onUpdateApiKey: (key: string) => void;
  onUpdateSlide: (slideId: string, updatedSlide: SlideItem) => void;
  onAddSlide: () => void;
  onRemoveSlide: (slideId: string) => void;
  onReorderSlide: (fromIndex: number, toIndex: number) => void;
  onSetDockedImage: (slideId: string, src: string, position: string, scale: number) => void;
  onRemoveDockedImage: (slideId: string) => void;
  onAddOverlay: (slideId: string, type: string, asset: string, anchor: string, size: number, color: string) => void;
  onUpdateOverlay: (slideId: string, overlayId: string, changes: Partial<OverlayItem>) => void;
  onRemoveOverlay: (slideId: string, overlayId: string) => void;
  onUpdateGlobalFont: (font: string) => void;
  onUpdateProfile: (profile: ProfileSignature) => void;
  onSelectTheme: (themeId: string) => void;
  onApplyTemplateToAll: (templateId: string) => void;
  onNewProject: () => void;
}
```

## 4. Export Dimensions Contract

```typescript
interface ExportDimensions {
  aspectRatio: '4:5' | '1:1';
  targetWidth: 1080;
  targetHeight: 1350 | 1080;
  pixelRatio: 2; // High-resolution retina capture
}
```
