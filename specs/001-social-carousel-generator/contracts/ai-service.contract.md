# Contrato de Serviço: AI Service

**Módulo**: `src/services/aiService.js`  
**Objetivo**: Conectar à API de IA (Gemini) para transformar texto bruto em carrosséis estruturados e com títulos/ganchos chamativos.

---

## 1. Funções de IA

### `generateCarouselFromText(rawText, apiKey, options)`
Envia o texto bruto para a API e retorna uma lista estruturada de slides sintetizados.

- **Entrada**:
  ```javascript
  rawText: string, // Texto original do usuário
  apiKey?: string, // Chave de API configurada
  options?: {
    platform?: "instagram" | "linkedin" | "tiktok",
    tone?: "educational" | "provocative" | "storytelling",
    maxSlides?: number // default: 7
  }
  ```
- **Saída**:
  ```javascript
  Promise<{
    success: boolean,
    slides: Array<{
      title: string,
      body: string,
      type: "hook" | "content" | "cta"
    }>,
    error?: string
  }>
  ```
- **Formato do Prompt de Sistema**:
  - Instrução para agir como estrategista sênior de conteúdo.
  - Exigir resposta em formato JSON estrito:
    ```json
    [
      { "type": "hook", "title": "Gancho de alto impacto", "body": "Linha de introdução" },
      { "type": "content", "title": "Tópico 1", "body": "Explicação sintetizada" },
      { "type": "cta", "title": "Conclusão", "body": "Chamada para salvar/comentar" }
    ]
    ```
- **Tratamento de Falha / Timeout**:
  - Timeout máximo de 10 segundos.
  - Se a API falhar ou a chave for inválida, a função sinaliza `success: false`, permitindo que o `textSegmenter.js` aplique o fallback local automaticamente sem travar a interface.
