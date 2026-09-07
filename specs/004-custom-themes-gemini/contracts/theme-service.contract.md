# Contract: Theme Service & Dynamic Injection

**Module**: `src/services/themeService.js` / `src/services/workspaceConstants.js`

---

## 1. `resolveThemeVariables`

Takes a theme ID and list of custom themes, returning the exact CSS variables to apply to the canvas.

```typescript
function resolveThemeVariables(
  themeId: string,
  customThemes: CustomTheme[]
): Record<string, string>;
```

### Output
```typescript
{
  '--slide-bg': string,
  '--slide-heading': string,
  '--slide-accent': string,
  '--slide-text': string,
  '--slide-subtext': string,
  '--slide-border'?: string
}
```

---

## 2. `createCustomTheme`

Constructs and validates a new `CustomTheme` entity.

```typescript
function createCustomTheme(
  input: {
    name: string;
    bg: string;
    heading: string;
    accent: string;
    text: string;
    subtext: string;
    gradientConfig?: GradientConfig;
  }
): CustomTheme;
```

---

## 3. `generateGradientCss`

Pure function transforming `GradientConfig` into a standard CSS gradient string.

```typescript
function generateGradientCss(config: GradientConfig): string;
```

Example output:
`linear-gradient(135deg, rgba(14, 165, 233, 1) 0%, rgba(15, 23, 42, 1) 100%)`
