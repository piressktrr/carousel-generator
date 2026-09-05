# Contrato de Serviço: Export Service

**Módulo**: `src/services/exportService.js`  
**Objetivo**: Renderização em alta definição e exportação em lote de imagens (ZIP) e documento (PDF).

---

## 1. Funções de Exportação

### `exportToZip(slideDOMElements, options)`
Renderiza os nós DOM dos slides na resolução nominal exata e empacota em um arquivo ZIP.

- **Entrada**:
  ```javascript
  slideDOMElements: HTMLElement[] // Referências aos nós DOM dos slides montados
  options: {
    format: "png" | "jpeg",
    aspectRatio: "1:1" | "4:5" | "9:16",
    quality?: number, // 0.8 a 1.0 (default: 0.95)
    fileNamePrefix?: string // default: "carrossel"
  }
  ```
- **Resoluções Aplicadas**:
  - `1:1`: 1080 x 1080 px
  - `4:5`: 1080 x 1350 px
  - `9:16`: 1080 x 1920 px
- **Saída**:
  - Disparo de download automático de arquivo `carrossel-nome-data.zip` contendo:
    - `slide-01.png`
    - `slide-02.png`
    - `...`
    - `slide-NN.png`

---

### `exportToPdf(slideDOMElements, options)`
Gera um documento PDF multipágina para carrosséis do LinkedIn.

- **Entrada**:
  ```javascript
  slideDOMElements: HTMLElement[]
  options: {
    aspectRatio: "1:1" | "4:5",
    pdfTitle?: string
  }
  ```
- **Saída**:
  - Disparo de download automático de arquivo `carrossel-documento.pdf`, onde cada página possui as dimensões exatas de cada slide em proporção vetorial/rasterizada de alta qualidade.
