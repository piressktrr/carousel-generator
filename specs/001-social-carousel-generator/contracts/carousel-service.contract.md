# Contrato de Serviço: Carousel Service

**Módulo**: `src/services/textSegmenter.js` / `src/services/carouselService.js`  
**Objetivo**: Gerenciar a manipulação de dados, segmentação algorítmica e estruturação de slides do carrossel.

---

## 1. Funções de Segmentação de Texto

### `segmentTextLocally(rawText, maxCharsPerSlide = 300)`
Segmenta um texto bruto usando heurísticas determinísticas locais (quebras de parágrafo e pontuação).

- **Entrada**:
  ```javascript
  rawText: string // Texto original colado pelo usuário
  maxCharsPerSlide?: number // Limite orientativo de caracteres por slide (default: 300)
  ```
- **Saída**:
  ```javascript
  Array<{
    id: string,
    orderIndex: number,
    type: "hook" | "content" | "cta",
    title: string,
    body: string
  }>
  ```
- **Comportamento**:
  - Primeiro parágrafo ou frase inicial vira o título da Capa (`type: 'hook'`).
  - Parágrafos intermediários são agrupados sem ultrapassar `maxCharsPerSlide` (`type: 'content'`).
  - Um slide final de encerramento com chamada de ação padrão é anexado automaticamente (`type: 'cta'`).

---

## 2. Funções de Manipulação de Slides

### `addSlide(slides, afterIndex = null)`
Cria e insere um slide em branco na posição desejada, reajustando os índices `orderIndex`.

### `removeSlide(slides, slideId)`
Remove o slide e reindexa a lista sequencialmente.

### `reorderSlides(slides, sourceIndex, destinationIndex)`
Move um slide de uma posição para outra, atualizando a ordem de renderização.

### `updateSlideContent(slides, slideId, updates)`
Atualiza pontualmente campos específicos (`title`, `body`, `image`, `seamless`) de um slide sem gerar efeitos colaterais nos demais.
