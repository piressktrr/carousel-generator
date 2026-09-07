# Data Model & State Entities: Clean & Dynamic Carousel UI Redesign

**Feature**: `006-clean-carousel-ui-redesign`
**Date**: 2026-09-06
**Status**: Draft

## 1. Workspace UI State Extensions

The workspace state stored in memory and persisted to IndexedDB receives ergonomic additions to govern visual layout, aspect ratios, and active panel categories:

```typescript
interface WorkspaceState {
  id: string;                      // Unique project ID, e.g. "proj-1718000000000"
  title: string;                   // Project title
  aspectRatio: '4:5' | '1:1';     // NEW: Aspect ratio mode for canvas preview & export
  isLeftSidebarOpen: boolean;      // Visibility flag for Left Sidebar
  isRightSidebarOpen: boolean;     // Visibility flag for Right Sidebar
  leftSidebarActiveTab: 'slides-content' | 'design-themes' | 'typography' | 'brand-elements'; // Active category
  activeSlideId: string;           // ID of the slide currently selected for editing/centering
  rawScript: string;               // Original or regenerated raw text script
  globalFont: string;              // Global font family (e.g., 'Inter', 'Playfair Display')
  currentTheme: string;            // Theme ID (built-in or custom theme)
  customThemes: CustomTheme[];     // List of user-created themes
  apiKey: string;                  // Gemini API Key
  profile: ProfileSignature;       // Author signature object
  slides: SlideItem[];             // Array of slide objects
  lastModified: number;            // Timestamp
}
```

## 2. Aspect Ratio Specifications

```typescript
type AspectRatio = '4:5' | '1:1';

interface AspectRatioDimensions {
  id: AspectRatio;
  label: string;
  canvasWidth: number;   // Preview width in px (380px)
  canvasHeight: number;  // Preview height in px (475px for 4:5, 380px for 1:1)
  exportWidth: number;   // Export bitmap width (1080px)
  exportHeight: number;  // Export bitmap height (1350px for 4:5, 1080px for 1:1)
}
```

## 3. Sidebar Category Model

```typescript
type SidebarCategory = 
  | 'slides-content'   // Sequenciamento de Lâminas e Editor de Conteúdo/Template
  | 'design-themes'    // Temas Predefinidos e Criador de Gradientes Customizados
  | 'typography'       // Seleção de Fontes e Escala Tipográfica
  | 'brand-elements';  // Assinatura do Criador, Docking de Imagens e Overlays

interface SidebarTabDefinition {
  id: SidebarCategory;
  label: string;
  iconName: string;
}
```

## 4. Design Tokens Entity Model

Refined token schema applied across `:root` and theme overrides:

```css
:root {
  /* Surfaces */
  --bg-darkest: #001413;
  --bg-canvas: #001a18;
  --bg-sidebar: #012624;
  --bg-card: #002a27;
  --bg-translucent: rgba(1, 38, 36, 0.75);

  /* Typography */
  --text-platinum: #f5f7fa;
  --text-silver: #94a3b8;
  --text-muted: #64748b;

  /* Accents */
  --accent-biolum: #05ffd4;
  --accent-biolum-glow: rgba(5, 255, 212, 0.25);
  --accent-biolum-subtle: rgba(5, 255, 212, 0.08);
  --phosphor-lavender: #c084fc;
  --phosphor-lavender-glow: rgba(192, 132, 252, 0.25);

  /* Borders & Focus */
  --border-subtle: rgba(5, 255, 212, 0.12);
  --border-focus: rgba(5, 255, 212, 0.5);

  /* Geometry & Radius */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-xl: 24px;

  /* Timing & Transitions */
  --transition-fast: 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-smooth: 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
```
