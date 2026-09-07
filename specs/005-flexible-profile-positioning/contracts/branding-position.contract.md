# Contract: Creator Profile Positioning

**Module**: `src/components/LeftSidebar/BrandingTab.jsx` / `src/components/SlideCard.jsx` / `src/services/storageService.js`

---

## 1. Positioning Anchor Constants

```javascript
export const BRANDING_POSITIONS = [
  { id: 'top-left', label: 'Superior Esquerdo', icon: 'ArrowUpLeft' },
  { id: 'top-center', label: 'Topo Centro', icon: 'ArrowUp' },
  { id: 'top-right', label: 'Superior Direito', icon: 'ArrowUpRight' },
  { id: 'bottom-left', label: 'Inferior Esquerdo', icon: 'ArrowDownLeft' },
  { id: 'bottom-center', label: 'Base Centro', icon: 'ArrowDown' },
  { id: 'bottom-right', label: 'Inferior Direito', icon: 'ArrowDownRight' }
];
```

---

## 2. CSS Utility Classes Contract

Class applied to `.slide-branding-bar`:
```css
.branding-pos-top-left
.branding-pos-top-center
.branding-pos-top-right
.branding-pos-bottom-left
.branding-pos-bottom-center
.branding-pos-bottom-right
```

---

## 3. Storage Defaults Invariant

When reading profile from IndexedDB:
`position: profile?.position || 'bottom-left'`
Ensures 100% backward compatibility for existing users.
