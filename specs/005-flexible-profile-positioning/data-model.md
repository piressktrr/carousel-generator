# Data Model: Flexible Profile Positioning & Gemini AI Simplification

**Feature**: `005-flexible-profile-positioning`
**Status**: Ready for Planning

---

## 1. Entities

### 1.1 `BrandingPosition`
Type union representing the 6 valid anchor locations for the author's signature:
```typescript
type BrandingPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'   // Default
  | 'bottom-center'
  | 'bottom-right';
```

### 1.2 `CreatorProfile` (Extended Schema)
```typescript
interface CreatorProfile {
  name: string;
  handle: string;
  avatar: string | null;            // Base64 or image URL
  avatarShape: 'circle' | 'square'; // Default: 'circle'
  hasVerifiedBadge: boolean;        // Default: false
  position: BrandingPosition;       // Default: 'bottom-left'
}
```

### 1.3 `AiConfig`
```typescript
interface AiConfig {
  apiKey: string;      // Gemini API Key stored in IndexedDB ('gemini-api-key')
  isConfigured: boolean;
}
```

---

## 2. Positioning Matrix Definition

| Anchor ID | Label | Flex Order | Alignment | Border Divider |
|---|---|---|---|---|
| `top-left` | Superior Esquerdo | `-1` | `flex-start` | Bottom |
| `top-center` | Topo Centro | `-1` | `center` | Bottom |
| `top-right` | Superior Direito | `-1` | `flex-end` | Bottom |
| `bottom-left` | Inferior Esquerdo (Padrão) | `1` | `flex-start` | Top |
| `bottom-center` | Base Centro | `1` | `center` | Top |
| `bottom-right` | Inferior Direito | `1` | `flex-end` | Top |

---

## 3. Storage Persistence

IndexedDB keys via `storageService.js`:
- `carousel-profile`: `{ ...profile, position: profile.position || 'bottom-left' }`
- `gemini-api-key`: Stored string (used for script generation)
