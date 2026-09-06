# Contract: Theme Registry & CSS Tokens (Feature 003 Updates)

**Module**: `src/services/workspaceConstants.js` & `src/styles/themes.css`
**Scope**: Theme definition constants, clean theme options, and celestial blue tokens.

---

## 1. Theme Constant Registry (`AVAILABLE_THEMES`)

```typescript
export interface ThemeOption {
  id: string;
  name: string;
  preview: string;
  category: 'clean' | 'bioluminescent' | 'vibrant' | 'dark';
}

export const AVAILABLE_THEMES: ThemeOption[] = [
  // Bioluminescent & Original Themes
  { id: 'abyssal-glow', name: 'Abyssal Glow', preview: '#05ffd4', category: 'bioluminescent' },
  { id: 'minimalist-obsidian', name: 'Obsidian Black', preview: '#38bdf8', category: 'dark' },
  { id: 'sunset-nebula', name: 'Sunset Nebula', preview: '#f43f5e', category: 'vibrant' },
  
  // Refactored Celestial Blue
  { id: 'celestial-azure', name: 'Azul Celestial', preview: '#00A3FF', category: 'vibrant' },

  // New Clean / Minimalist Themes
  { id: 'clean-ivory', name: 'Clean Ivory (Editorial)', preview: '#FAF8F5', category: 'clean' },
  { id: 'clean-slate', name: 'Scandinavian Slate', preview: '#0E1117', category: 'clean' },
  { id: 'light-clean', name: 'Light Clean (Vivid Sky)', preview: '#00A3FF', category: 'clean' },
  
  // Reference Image Palette Slot
  { id: 'reference-aesthetic', name: 'Reference Aesthetic', preview: '#38BDF8', category: 'clean' }
];
```

---

## 2. CSS Design Tokens in `src/styles/themes.css`

### Refactored Celestial Blue Theme (`[data-theme="celestial-azure"]`)
```css
[data-theme="celestial-azure"] {
  --slide-bg: radial-gradient(circle at top center, #0B2545 0%, #051329 60%, #020B18 100%);
  --slide-text: #F0F7FF;
  --slide-heading: #00D2FF;
  --slide-accent: #00A3FF;
  --slide-subtext: #8ECAE6;
  --slide-border: rgba(0, 163, 255, 0.35);
  --slide-tag-bg: rgba(0, 163, 255, 0.15);
  --shadow-glow: 0 0 25px rgba(0, 163, 255, 0.4);
}
```

### Clean Ivory Theme (`[data-theme="clean-ivory"]`)
```css
[data-theme="clean-ivory"] {
  --slide-bg: #FAF8F5;
  --slide-text: #18181B;
  --slide-heading: #09090B;
  --slide-accent: #00A3FF;
  --slide-subtext: #52525B;
  --slide-border: rgba(24, 24, 27, 0.1);
  --slide-tag-bg: rgba(24, 24, 27, 0.05);
  --shadow-glow: 0 4px 20px rgba(0, 0, 0, 0.06);
}
```

### Clean Slate Theme (`[data-theme="clean-slate"]`)
```css
[data-theme="clean-slate"] {
  --slide-bg: #0E1117;
  --slide-text: #F4F4F5;
  --slide-heading: #FFFFFF;
  --slide-accent: #00A3FF;
  --slide-subtext: #A1A1AA;
  --slide-border: rgba(255, 255, 255, 0.1);
  --slide-tag-bg: rgba(255, 255, 255, 0.06);
}
```
