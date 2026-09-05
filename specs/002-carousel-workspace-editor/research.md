# Technical Research: Carousel Studio Workspace & Advanced Slide Customizer

**Feature**: `002-carousel-workspace-editor`  
**Date**: 2026-09-05  
**Spec**: [spec.md](file:///D:/Carrosseis-Generator/specs/002-carousel-workspace-editor/spec.md)

---

## Research Question 1: Arquitetura de Layout do Espaço de Trabalho (Barra Esquerda + Palco de Slides)

### Contexto
O usuário orientou que a barra de ferramentas e personalização máxima deve ficar fixada no **lado esquerdo da tela**, com o palco interativo de slides ocupando todo o restante da tela à direita. A interface precisa ser dinâmica, elegante e visualmente agradável sem sobrecarregar o navegador.

### Decisão
- **Estrutura de Layout**: Duas colunas principais utilizando CSS Grid / Flexbox de viewport total (`100vh`):
  - **Sidebar Esquerda (Painel de Edição)**: Largura fixa de `360px` a `400px`, barra de rolagem independente (custom scrollbar translúcida), agrupada em seções com abas/acordeões intuitivos (*Roteiro*, *Slide Ativo*, *Imagens & Ícones*, *Tipografia*, *Branding*). Estilizada com base no `DESIGN.md` (fundo Liquid Abyss `#012624`, bordas sutis com brilho bioluminescente e cards de superfície em Liquid Kelp `#003734`).
  - **Palco Central/Direito (Canvas dos Slides)**: Área elástica com fundo neutro escurecido (`#001a18`), centralizando os slides com rolagem horizontal fluida e indicador visual de foco no slide ativo.
- **Microinterações Elegantes**: Transições CSS puras (`transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1)`) em estados de hover, foco e seleção de slides, garantindo resposta a 60 FPS sem dependências pesadas de animação.

### Alternativas Consideradas
- *Drawer deslizante/flutuante (Overlay)*: Rejeitado porque encobre os slides durante o ajuste dos controles, impedindo a visualização em tempo real exigida no SC-002.
- *Barra flutuante arrastável (Draggable Window)*: Rejeitada por adicionar complexidade desnecessária (violação do Princípio II - KISS) e criar atrito de posicionamento para o usuário.

---

## Research Question 2: Motor de Ancoragem Estruturada de Imagem (Docking)

### Contexto
A imagem principal de cada slide pode ser posicionada em 4 modos: **Superior (Topo)**, **Inferior (Base)**, **Metade Esquerda (Split)** e **Metade Direita (Split)**, com escala ajustável.

### Decisão
- **Layout Base por Slide**: O cartão de slide opera com CSS Flexbox ou Grid com orientação configurável:
  - `top`: `flex-direction: column`, imagem renderizada no bloco superior e bloco de texto no bloco inferior.
  - `bottom`: `flex-direction: column-reverse`, texto no topo e imagem ancorada na base.
  - `left`: `flex-direction: row`, layout dividido em duas colunas: coluna esquerda com a imagem e coluna direita com o texto.
  - `right`: `flex-direction: row-reverse`, texto na esquerda e imagem na coluna direita.
- **Tratamento de Escala & Recorte**: Uso de container com `overflow: hidden` e `object-fit: cover` na tag `<img>` com `transform: scale(var(--img-scale))`, garantindo enquadramento sem distorção das proporções originais do arquivo.

### Alternativas Consideradas
- *Posicionamento puramente absoluto com drag livre*: Rejeitado para a imagem principal porque frequentemente resulta em textos sobrepostos de forma ilegível. A ancoragem estruturada garante legibilidade imediata e padrão de design profissional.

---

## Research Question 3: Sistema de 9 Âncoras de Grade para Ícones e Overlays Secundários

### Contexto
O usuário quer inserir ícones e imagens menores além da imagem principal/fundo e controlar seu posicionamento e escala pela barra esquerda. A clarificação determinou o uso de 9 âncoras de grade pré-definidas.

### Decisão
- **Matriz de Coordenadas em 9 Regiões**:
  - `top-left`: `top: 60px; left: 60px; transform: translate(0, 0);`
  - `top-center`: `top: 60px; left: 50%; transform: translate(-50%, 0);`
  - `top-right`: `top: 60px; right: 60px; transform: translate(0, 0);`
  - `center-left`: `top: 50%; left: 60px; transform: translate(0, -50%);`
  - `center`: `top: 50%; left: 50%; transform: translate(-50%, -50%);`
  - `center-right`: `top: 50%; right: 60px; transform: translate(0, -50%);`
  - `bottom-left`: `bottom: 60px; left: 60px; transform: translate(0, 0);`
  - `bottom-center`: `bottom: 60px; left: 50%; transform: translate(-50%, 0);`
  - `bottom-right`: `bottom: 60px; right: 60px; transform: translate(0, 0);`
- **Controle Visual na Barra Esquerda**: Um mini-widget de 3x3 botões estilizados permite ao usuário clicar na região desejada, enquanto um controle deslizante (*slider*) ajusta a escala do elemento (`24px` a `180px`).

### Alternativas Consideradas
- *Arrastar e soltar (drag & drop livre)*: Mais propenso a erros de alinhamento e desalinhamentos em telas sensíveis ao toque. A grade garante perfeição geométrica com apenas um clique.

---

## Research Question 4: Biblioteca de Ícones Vetoriais Leve e Elegante

### Contexto
O usuário requisitou poder inserir ícones rapidamente. A aplicação deve permanecer leve, evitando sobrecarregar o bundle do navegador.

### Decisão
- **Biblioteca Selecionada**: `lucide-react` (~2KB por ícone importado via ESM tree-shaking do Vite).
- **Justificativa**: 
  - Oferece design consistente com traços limpos e modernos (espessura de linha padronizada de 2px), integrando-se perfeitamente com a estética bioluminescente e minimalista do `DESIGN.md`.
  - Mais leve e moderno que FontAwesome ou pacotes legados de ícones.
  - Conjunto curado para o catálogo: ícones de impacto (Lâmpada, Fogo, Foguete, Estrela, Coração, Check, Alerta, Setas de swipe, Aspas, Marcador).
  - Suporte a upload customizado em PNG/SVG para selos e ícones exclusivos do criador.

### Alternativas Consideradas
- *SVGs embutidos manualmente como strings*: Difícil de manter e escalar.
- *FontAwesome*: Excessivamente pesado (~2MB de webfonts completas).

---

## Research Question 5: Estratégia de Persistência Híbrida Offline-First (Autosave Debounced)

### Contexto
A aplicação precisa salvar todas as alterações automaticamente sem travar a interface e permitir o início de novos projetos.

### Decisão
- **Mecanismo**: IndexedDB através da biblioteca ultra-leve `idb-keyval` (<1KB).
- **Padrão de Execução**: Autosave com *Debounce* de 400ms nas alterações de texto e atualização imediata em cliques de layout (troca de âncora, inserção de imagem).
- **Estrutura de Armazenamento**: Chave `carousel-active-workspace` para o projeto atual e `carousel-profile` para a identidade do autor.
- **Ação de Reset / Novo Projeto**: Botão na barra lateral que confirma e limpa o workspace ativo, permitindo inserir um novo roteiro a qualquer instante.

### Alternativas Consideradas
- *LocalStorage*: Limitado a 5MB (insuficiente se o usuário carregar múltiplas imagens em Base64). O IndexedDB suporta centenas de megabytes sem estrangular a memória síncrona do navegador.

---

## Resumo das Escolhas Tecnológicas

| Componente | Tecnologia Escolhida | Justificativa de Eficiência |
|---|---|---|
| **Layout & Estilização** | CSS Grid + Flexbox nativo + Tokens do `DESIGN.md` | Zero overhead de runtime, renderização a 60 FPS |
| **Ícones do Catálogo** | `lucide-react` | Ícones vetoriais modernos com tree-shaking |
| **Persistência Local** | `idb-keyval` (IndexedDB) | < 1KB de footprint, seguro para imagens e rascunhos |
| **Segmentação & IA** | Gemini API REST com fallback algorítmico local | Resiliência total sem dependência obrigatória de rede |
| **Exportação** | `html-to-image` + `jszip` + `jspdf` | Renderização 100% client-side em alta definição |
