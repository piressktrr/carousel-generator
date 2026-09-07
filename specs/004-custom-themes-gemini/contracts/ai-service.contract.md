# Contract: AI Service (Gemini Integration)

**Module**: `src/services/aiService.js`

---

## 1. `generateThemeFromPrompt`

Generates a complete color theme palette and creative name from natural language description.

```typescript
async function generateThemeFromPrompt(
  prompt: string,
  apiKey: string
): Promise<{
  name: string;
  bg: string;
  heading: string;
  accent: string;
  text: string;
  subtext: string;
  preview: string;
}>;
```

### Invariants & Failure Modes
- If `apiKey` is missing or empty, throws `Error("Chave de API do Gemini não informada.")`.
- If Gemini API returns 400/403, throws sanitized descriptive error message in Portuguese.
- Uses Gemini 2.5 Flash endpoint with structured system prompt enforcing high contrast for readability.
