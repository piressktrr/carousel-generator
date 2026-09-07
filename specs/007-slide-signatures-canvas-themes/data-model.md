# Data Model & Schema Extensions: Feature 007

**Feature**: `007-slide-signatures-canvas-themes`
**Date**: 2026-09-06

## 1. Slide Item Schema Extension

Each slide object in `workspace.slides` now supports per-slide profile positioning:

```typescript
type ProfileAnchor = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right'
  | 'hidden';

interface SlideItem {
  id: string;
  type: 'cover' | 'slide' | 'cta';
  content: string;
  subtext?: string;
  slideTemplate?: 'classic' | 'quote' | 'minimalist';
  fontOverride?: string | null;
  profilePosition?: ProfileAnchor | null; // NULL inherits global profile.position
  dockedImage?: {
    src: string;
    position: 'top' | 'bottom' | 'left' | 'right';
    scale: number;
  } | null;
  overlays?: OverlayItem[];
}
```

## 2. Canvas Design Movement Entity

```typescript
interface CanvasDesignMovement {
  id: string;
  name: string;
  movementTitle: string;
  philosophy: string;
  gradientType: 'linear' | 'radial';
  gradientAngle?: number;
  colorStart: string;
  colorEnd: string;
  headingColor: string;
  accentColor: string;
  textColor: string;
  subtextColor: string;
  borderColor: string;
  tagBgColor: string;
}
```
