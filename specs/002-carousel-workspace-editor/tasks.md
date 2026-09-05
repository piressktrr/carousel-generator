# Tasks: Carousel Studio Workspace & Advanced Slide Customizer

**Input**: Design documents from `specs/002-carousel-workspace-editor/` (`spec.md`, `plan.md`, `data-model.md`, `research.md`, `quickstart.md`, `contracts/workspace-service.contract.md`)

**Prerequisites**: `plan.md` (required), `spec.md` (required for user stories), `research.md`, `data-model.md`, `contracts/`

**Tests**: Cenários manuais de validação E2E documentados em `specs/002-carousel-workspace-editor/quickstart.md`.

**Organization**: Tarefas organizadas por user story para permitir implementação e validação independentes de cada história.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos distintos, sem dependência de tarefas incompletas)
- **[Story]**: Identificador da User Story correspondente (ex: `[US1]`, `[US2]`, `[US3]`)
- Todos os itens incluem caminhos de arquivo exatos nas descrições

## Path Conventions

- Aplicação web única (Single Page Application): `src/components/`, `src/services/`, `src/styles/` na raiz do repositório

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicialização do projeto, dependências, bundler Vite e tokens visuais fundamentais

- [X] T001 Initialize package.json with dependencies (`react`, `react-dom`, `vite`, `lucide-react`, `idb-keyval`, `html-to-image`, `jszip`, `jspdf`) in package.json
- [X] T002 Configure Vite development server and build options in vite.config.js
- [X] T003 [P] Configure HTML shell, viewport, and typography CDN imports (Inter, Plus Jakarta Sans, Playfair Display, Space Grotesk, Montserrat) in index.html
- [X] T004 [P] Setup global CSS variables and theme tokens (Liquid Abyss, Platinum, Silver Mist, Lavender Phosphor, Bioluminescent Glow) in src/styles/themes.css
- [X] T005 [P] Setup base CSS resets, responsive container layouts, and typography resets in src/styles/index.css
- [X] T006 [P] Configure workspace layout structure, translucent scrollbars, and split screen styles in src/styles/workspace.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestrutura central de domínio, persistência e utilitários que DEVE estar pronta antes da implementação das User Stories

**⚠️ CRITICAL**: Nenhuma tarefa de User Story pode ser iniciada até a conclusão desta fase

- [X] T007 Implement offline-first IndexedDB persistence service (`saveWorkspace`, `getWorkspace`, `clearWorkspace`, `saveProfile`, `getProfile`) using idb-keyval in src/services/storageService.js
- [X] T008 [P] Implement algorithmic local text segmentation fallback (paragraph & list item chunking) in src/services/textSegmenter.js
- [X] T009 [P] Implement Gemini API client with 10s timeout and automatic fallback to local segmenter in src/services/aiService.js
- [X] T010 [P] Define curated typography list and Lucide icon registry in src/services/workspaceConstants.js
- [X] T011 Implement core immutable workspace and slide data operations (`updateSlide`, `setDockedImage`, `removeDockedImage`, `addOverlay`, `updateOverlay`, `removeOverlay`) in src/services/workspaceService.js
- [X] T012 Initialize React root rendering and application mount in src/main.jsx

**Checkpoint**: Fundação pronta — implementação das User Stories desbloqueada para execução

---

## Phase 3: User Story 1 - Roteirização Inicial e Geração Automática de Slides (Priority: P1) 🎯 MVP

**Goal**: O criador insere seu roteiro bruto na tela inicial e aciona "Gerar Slides", convertendo instantaneamente o texto em uma quantidade adaptativa de slides que melhor acomode o conteúdo (sem quantidade fixa imposta) e transicionando para o estúdio.

**Independent Test**: Colar o roteiro de teste do `specs/002-carousel-workspace-editor/quickstart.md` no campo de texto, acionar "Gerar Slides" e verificar a transição para a tela do estúdio com a sequência de slides gerada dinamicamente e ajustada à densidade dos tópicos.

### Implementation for User Story 1

- [X] T013 [P] [US1] Create script input view component with textarea, example script loader, and submit button in src/components/ScriptInputView.jsx
- [X] T014 [US1] Implement slide generation pipeline with title hook synthesis and fallback handling in src/services/workspaceService.js
- [X] T015 [US1] Implement main application state coordinator managing script intake, generation lifecycle, and studio transition in src/App.jsx

**Checkpoint**: User Story 1 funcional — o usuário consegue transformar roteiros em slides e acessar o estúdio (MVP inicial).

---

## Phase 4: User Story 2 - Espaço de Trabalho com Barra Lateral à Esquerda e Palco de Slides (Priority: P1)

**Goal**: Exibir o estúdio com layout de duas zonas (barra lateral esquerda fixa de ferramentas e palco de slides à direita), sincronização de slide ativo e persistência contínua offline-first com IndexedDB.

**Independent Test**: Navegar pelos slides no palco direito, verificar sincronização de atributos no painel esquerdo, editar textos e recarregar a página com F5 para validar restauração automática dos dados.

### Implementation for User Story 2

- [X] T016 [P] [US2] Implement slide content editor tab (inline text modification, slide reordering, adding and deleting slides) in src/components/LeftSidebar/SlideContentTab.jsx
- [X] T017 [P] [US2] Implement base slide card presentation with active focus indicator and click-to-select in src/components/SlideCard.jsx
- [X] T018 [P] [US2] Implement horizontal scrollable canvas for previewing and selecting slides in src/components/SlidesCanvas.jsx
- [X] T019 [US2] Implement left sidebar navigation shell with tab switcher, project actions, and "Iniciar Novo Projeto" button in src/components/LeftSidebar/LeftSidebar.jsx
- [X] T020 [US2] Implement main studio workspace orchestrator connecting left sidebar and right canvas in src/components/StudioWorkspace.jsx
- [X] T021 [US2] Implement 400ms debounced auto-save hook to IndexedDB and project reset logic in src/components/StudioWorkspace.jsx

**Checkpoint**: User Story 2 funcional — o ambiente de estúdio opera com navegação fluida em duas zonas e autosave contínuo.

---

## Phase 5: User Story 3 - Ancoragem Estruturada de Imagem de Destaque por Slide (Priority: P1)

**Goal**: Permitir o upload de uma imagem principal por slide, controle de escala (0.5 a 2.0) e escolha entre 4 modos de ancoragem (superior, inferior, metade esquerda split, metade direita split).

**Independent Test**: No Slide 2, anexar uma imagem, testar os 4 modos de ancoragem e manipular o slider de zoom, verificando o redimensionamento sem distorção e o reposicionamento responsivo do texto.

### Implementation for User Story 3

- [X] T022 [P] [US3] Implement image docking sidebar tab with file uploader, 4 anchor mode toggles (top, bottom, left, right), and zoom slider in src/components/LeftSidebar/ImageDockingTab.jsx
- [X] T023 [US3] Implement responsive docking layout rendering (vertical stack & horizontal split) and aspect-ratio preservation in src/components/SlideCard.jsx
- [X] T024 [US3] Implement image removal action restoring full-text layout in src/components/LeftSidebar/ImageDockingTab.jsx

**Checkpoint**: User Story 3 funcional — cada slide suporta imagem principal ancorada em 4 orientações com zoom proporcional.

---

## Phase 6: User Story 4 - Inserção e Manipulação de Elementos Visuais Secundários (Ícones e Imagens Menores) (Priority: P1)

**Goal**: Inserir ícones do catálogo Lucide ou imagens/selos transparentes (PNG/SVG) adicionais, posicionando-os através de uma matriz de 9 âncoras de grade com escala ajustável (24px a 180px).

**Independent Test**: Selecionar o Slide 1, escolher o ícone de foguete no catálogo, posicioná-lo no canto superior direito na grade 3x3 e definir o tamanho para 64px, confirmando renderização precisa sobre o slide.

### Implementation for User Story 4

- [X] T025 [P] [US4] Implement 9-point anchor coordinate rules and absolute overlay positioning styles in src/styles/workspace.css
- [X] T026 [P] [US4] Implement overlays sidebar tab with curated Lucide icon picker, custom image uploader, 3x3 grid selector, and size slider in src/components/LeftSidebar/OverlaysTab.jsx
- [X] T027 [US4] Implement dynamic Lucide icon and secondary image layer rendering with 9-anchor positioning in src/components/SlideCard.jsx
- [X] T028 [US4] Implement individual overlay item list management (selection, update, and removal) in src/components/LeftSidebar/OverlaysTab.jsx

**Checkpoint**: User Story 4 funcional — overlays de ícones e selos gráficos customizáveis com precisão de grade 3x3.

---

## Phase 7: User Story 5 - Customização Tipográfica Ampla (Priority: P2)

**Goal**: Configurar tipografia globalmente para todos os slides com suporte a override individual na barra lateral para slides específicos (ex: capa).

**Independent Test**: Alterar a fonte global para "Space Grotesk" e verificar a aplicação em todos os slides; ativar override no Slide 1 para "Playfair Display" e confirmar que apenas o Slide 1 altera a tipografia.

### Implementation for User Story 5

- [X] T029 [P] [US5] Implement typography sidebar tab with global font dropdown and slide-specific override controls in src/components/LeftSidebar/TypographyTab.jsx
- [X] T030 [US5] Integrate dynamic font-family resolution (slide fontOverride fallback to workspace globalFont) in src/components/SlideCard.jsx

**Checkpoint**: User Story 5 funcional — consistência visual tipográfica garantida com flexibilidade de destaque pontual.

---

## Phase 8: User Story 6 - Controle Granular de Identidade do Criador (Foto, @Handle e Visibilidade) (Priority: P2)

**Goal**: Configurar nome, foto de perfil e @handle do criador com controle independente de visibilidade (exibir/ocultar) por slide.

**Independent Test**: Cadastrar nome e @handle, desmarcar a visibilidade da assinatura no Slide 1 (capa) e confirmar que o Slide 1 oculta a identificação enquanto os demais slides a mantêm.

### Implementation for User Story 6

- [X] T031 [P] [US6] Implement creator profile sidebar tab with avatar upload, @handle text input, and active slide visibility toggle in src/components/LeftSidebar/BrandingTab.jsx
- [X] T032 [US6] Implement creator branding footer rendering and slide-level visibility switch in src/components/SlideCard.jsx
- [X] T033 [US6] Connect creator profile persistence to IndexedDB storage in src/components/LeftSidebar/BrandingTab.jsx

**Checkpoint**: User Story 6 funcional — identidade de marca configurada e visibilidade controlada granularmente por slide.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Exportação em alta resolução, atalhos de teclado e refinamento visual final

- [X] T034 [P] Implement multi-format export toolbar (PNG pack in ZIP and multi-page PDF for LinkedIn) in src/components/ExportToolbar.jsx
- [X] T035 [P] Implement client-side high-resolution rendering and download packaging in src/services/exportService.js
- [X] T036 Add keyboard shortcuts (ArrowLeft/ArrowRight to cycle active slides, Esc to deselect) in src/components/StudioWorkspace.jsx
- [X] T037 Polish bioluminescent theme transitions, active slide glow borders, and hover microinteractions in src/styles/workspace.css
- [X] T038 Execute end-to-end acceptance validation across all 5 scenarios in specs/002-carousel-workspace-editor/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sem dependências — pode ser iniciada imediatamente.
- **Foundational (Phase 2)**: Depende da conclusão do Setup — **BLOQUEIA** todas as User Stories.
- **User Stories (Phase 3+)**: Todas dependem da conclusão da Fase Foundational:
  - US1 (Roteirização) inicializa o fluxo e desbloqueia a transição para o estúdio.
  - US2 (Espaço de Trabalho) cria o ambiente visual de duas zonas.
  - US3, US4, US5 e US6 podem ser desenvolvidas em paralelo ou sequencialmente após a base do estúdio (US2).
- **Polish (Phase 9)**: Depende da implementação das User Stories.

### User Story Dependencies

- **US1 (P1)**: Inicia após a Fase 2. Independente de outras histórias.
- **US2 (P1)**: Inicia após a Fase 2. Integra-se com a transição da US1.
- **US3 (P1)**: Opera no SlideCard e na barra lateral da US2.
- **US4 (P1)**: Opera no SlideCard e na barra lateral da US2.
- **US5 (P2)**: Opera no SlideCard e na barra lateral da US2.
- **US6 (P2)**: Opera no SlideCard e na barra lateral da US2.

### Within Each User Story

- Contratos e modelos antes de componentes visuais
- Abas da barra lateral antes da orquestração no container principal
- Testes manuais do checklist antes de avançar para a próxima história

### Parallel Opportunities

- Todas as tarefas de Setup com marcador `[P]` (T003, T004, T005, T006) rodam em paralelo.
- Na Fase 2, T008, T009 e T010 rodam em paralelo.
- Em US2, T016, T017 e T018 rodam em paralelo.
- Em US3, T022 pode ser desenvolvida em paralelo com a lógica pura de docking.
- Em US4, T025 e T026 rodam em paralelo.
- Em Polish, T034 e T035 rodam em paralelo.

---

## Parallel Example: User Story 2 (Workspace Layout)

```bash
# Desenvolver componentes de apresentação em paralelo:
Task: "Implement slide content editor tab in src/components/LeftSidebar/SlideContentTab.jsx"
Task: "Implement base slide card presentation in src/components/SlideCard.jsx"
Task: "Implement horizontal scrollable canvas in src/components/SlidesCanvas.jsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 + Base do Estúdio)

1. Concluir Fase 1 (Setup) e Fase 2 (Foundational)
2. Implementar Fase 3 (User Story 1 - Roteirização)
3. Implementar Fase 4 (User Story 2 - Estúdio com Barra Esquerda e Palco Direito)
4. **VALIDAR MVP**: Testar geração de slides e edição de texto básica com autosave

### Incremental Delivery

1. Adicionar US3 (Ancoragem de Imagens - Top, Bottom, Split Left, Split Right) → Validar Cenário 2 do quickstart
2. Adicionar US4 (Ícones e Overlays na Grade 3x3) → Validar Cenário 3 do quickstart
3. Adicionar US5 (Tipografia Global e Override) → Validar Cenário 4 do quickstart
4. Adicionar US6 (Identidade do Criador e Visibilidade Granular) → Validar Cenário 5 do quickstart
5. Executar Fase 9 (Exportação em ZIP/PDF e Polish Final)

---

## Format Validation Checklist

- [x] Toda tarefa começa com `- [ ] `
- [x] IDs sequenciais estritos (`T001` até `T038`)
- [x] Marcador `[P]` aplicado apenas a tarefas paralelizáveis em arquivos distintos
- [x] Marcador de história `[US1]` a `[US6]` aplicado estritamente nas fases de histórias
- [x] Todas as tarefas especificam caminhos de arquivos exatos
- [x] Sem marcadores de história nas fases Setup, Foundational e Polish
