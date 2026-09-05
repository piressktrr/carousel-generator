# Implementation Plan: Carousel Studio Workspace & Advanced Slide Customizer

**Branch**: `002-carousel-workspace-editor` | **Date**: 2026-09-05 | **Spec**: [spec.md](file:///D:/Carrosseis-Generator/specs/002-carousel-workspace-editor/spec.md)

**Input**: Feature specification from `specs/002-carousel-workspace-editor/spec.md`

---

## Summary

Implementação de um espaço de trabalho visual dinâmico, elegante e ergonômico (**Studio Workspace**) para criação e personalização máxima de carrosséis sociais. A aplicação adota uma estrutura em duas zonas: uma **barra lateral de ferramentas fixada no lado esquerdo da tela** e um **palco interativo de slides no quadrante direito**. Oferece ancoragem estruturada de imagens principais (topo, base, metade esquerda, metade direita), sobreposição de elementos visuais secundários e ícones através de uma matriz de 9 âncoras de grade, customização tipográfica com catálogo web de fontes (global com override por slide), controle granular de visibilidade da assinatura do autor e persistência híbrida contínua (autosave offline via IndexedDB), mantendo a arquitetura ultra leve em JavaScript puro com React e Vite.

---

## Technical Context

**Language/Version**: JavaScript (ES2022+ / JSX), HTML5, CSS3  
**Primary Dependencies**:
- `react` e `react-dom` (reatividade de estado e renderização do estúdio)
- `vite` (bundler e servidor de desenvolvimento leve)
- `lucide-react` (catálogo nativo de ícones vetoriais elegantes e modulares com tree-shaking)
- `idb-keyval` (persistência offline-first leve <1KB em IndexedDB)
- `html-to-image` (renderização client-side de alta resolução para download)
- `jszip` e `jspdf` (empacotamento de PNGs e PDF multipágina para LinkedIn)
- API Gemini (chamada REST via `fetch` com fallback algorítmico local de segmentação)  
**Storage**: `IndexedDB` local no navegador (`carousel-active-workspace` e `carousel-profile`)  
**Testing**: Cenários manuais de validação E2E documentados em `quickstart.md`  
**Target Platform**: Navegadores modernos em Desktop e Telas amplas (Chrome, Edge, Firefox, Safari)  
**Project Type**: Single Page Application (SPA Client-Side)  
**Performance Goals**:
- Latência de atualização na barra esquerda < 100ms (sensação de tempo real a 60 FPS)
- Transição de roteiro para slides no estúdio < 3 segundos no modo local (< 5s com IA)
- Autosave em background com debounce de 400ms sem travamentos de digitação  
**Constraints**:
- 100% client-side (sem dependência de banco de dados remoto ou servidores)
- Sem frameworks pesados de animação (transições fluidas via CSS transitions nativas)
- Manter fidelidade estrita à paleta e tokens do `DESIGN.md` (Abyssal Glow, Platinum, Silver Mist, Lavender Phosphor e gradiente bioluminescente)  
**Scale/Scope**: Carrosséis de 1 a 12 slides com até 5 elementos secundários por slide

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Princípio I (Clean Architecture & SOLID)**: Aprovado. As regras de ancoragem de imagem, manipulação de overlays e cálculos de estado residem em serviços JavaScript puros (`src/services/workspaceService.js`), totalmente desacoplados dos componentes de interface React.
- **Princípio II (Pragmatismo Técnico & KISS/YAGNI)**: Aprovado. A aplicação adiciona unicamente a biblioteca `lucide-react` para os ícones requisitados pelo usuário, sem introduzir frameworks pesados de animação (ex: Framer Motion) ou servidores desnecessários.
- **Princípio III (Concorrência Segura & Resiliência)**: Aprovado. Chamadas assíncronas à IA possuem timeout de 10s e acionam automaticamente o fallback determinístico local por parágrafos. A persistência em IndexedDB utiliza operações atômicas assíncronas com debounce.
- **Princípio IV (Dados & Infraestrutura)**: Aprovado. Persistência offline-first padronizada no IndexedDB com schema de objeto POJO estável e auditável.
- **Princípio V (Padronização & Modelagem Visual)**: Aprovado. Interfaces contratuais padronizadas em `contracts/workspace-service.contract.md` e fluxo visual documentado com diagramas Mermaid em `data-model.md`.
- **Princípio VI (Branching Workflow)**: Aprovado. Todo o ciclo está isolado na branch dedicada `002-carousel-workspace-editor`.

---

## Project Structure

### Documentation (this feature)

```text
specs/002-carousel-workspace-editor/
├── spec.md              # Especificação de requisitos funcionais e de UX
├── plan.md              # Este plano de arquitetura e implementação
├── research.md          # Pesquisa técnica e decisões de layout/ícones
├── data-model.md        # Modelagem de estado POJO e entidades
├── quickstart.md        # Roteiro de validação de ponta a ponta
├── contracts/           # Contratos dos serviços e componentes
│   └── workspace-service.contract.md
└── checklists/          # Quality gates de requisitos
    └── requirements.md
```

### Source Code (repository root)

```text
/
├── index.html                     # Shell HTML e importação de fontes
├── package.json                   # Dependências do projeto (com lucide-react)
├── vite.config.js                 # Configuração do Vite
└── src/
    ├── main.jsx                   # Ponto de entrada React
    ├── App.jsx                    # Orquestrador de fluxo (Entrada de Roteiro vs Estúdio)
    ├── components/
    │   ├── ScriptInputView.jsx    # Tela inicial para colar roteiro e gerar slides
    │   ├── StudioWorkspace.jsx    # Container principal com layout dividido (duas zonas)
    │   ├── LeftSidebar/           # Barra lateral esquerda de ferramentas e personalização
    │   │   ├── LeftSidebar.jsx    # Layout e navegação por abas da barra esquerda
    │   │   ├── SlideContentTab.jsx# Edição de texto e ordenação do slide ativo
    │   │   ├── ImageDockingTab.jsx# Upload, escala e 4 modos de ancoragem (Top, Bottom, Left, Right)
    │   │   ├── OverlaysTab.jsx    # Catálogo de ícones nativos, upload de selos e grade 3x3
    │   │   ├── TypographyTab.jsx  # Seletor de fontes web (global + override no slide ativo)
    │   │   └── BrandingTab.jsx    # Foto, @handle e toggle de visibilidade por slide
    │   ├── SlidesCanvas.jsx       # Palco direito interativo com rolagem de slides
    │   ├── SlideCard.jsx          # Renderização do slide (docking, 9 âncoras de overlay e branding)
    │   └── ExportToolbar.jsx      # Exportação em ZIP de PNGs e PDF para LinkedIn
    ├── services/
    │   ├── workspaceService.js    # Lógica de mutação de slides, docking e ancoragem de grade
    │   ├── textSegmenter.js       # Segmentação algorítmica local por quebras de texto
    │   ├── aiService.js           # Cliente Gemini API com fallback de timeout
    │   ├── storageService.js      # Persistência contínua offline-first com idb-keyval
    │   └── exportService.js       # Motor de exportação de imagens e PDF
    └── styles/
        ├── index.css              # Reset global e layout de tela cheia
        ├── themes.css             # Tokens do DESIGN.md (Abyssal Glow, Lavender, etc.)
        └── workspace.css          # Estilização elegante da barra esquerda, palco e grids
```

**Structure Decision**: Aplicação web única (Single Project) com separação limpa entre componentes de apresentação (`src/components/`), regras de negócio (`src/services/`) e tokens de design (`src/styles/`).

---

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| *Nenhuma violação* | O design cumpre 100% dos princípios constitucionais (KISS/YAGNI) | Frameworks pesados de animação ou roteamento complexo foram rejeitados em favor de React hooks puros e CSS transitions nativas a 60 FPS |
