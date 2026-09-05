# Tasks: Gerador de Carrosséis Multiplataforma

**Branch**: `001-social-carousel-generator`  
**Input Documents**: `spec.md`, `plan.md`, `data-model.md`, `contracts/`, `research.md`, `quickstart.md`, `DESIGN.md`  

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Inicialização do projeto web em JavaScript com Vite, React e dependências essenciais.

- [x] T001 Inicializar a estrutura do projeto web configurando `package.json` com scripts do Vite e dependências essenciais (`react`, `react-dom`, `html-to-image`, `jszip`, `file-saver`, `jspdf`, `idb-keyval`)
- [x] T002 [P] Configurar `vite.config.js` e o documento raiz `index.html` com metatags, título da aplicação e fontes recomendadas
- [x] T003 [P] Implementar os tokens visuais e variáveis CSS do `DESIGN.md` (paleta Abyssal, Kelp, Platinum, Silver Mist, Lavender e gradientes) em `src/styles/themes.css` e reset global em `src/styles/index.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestrutura básica de estado, constantes e persistência offline-first que bloqueia o desenvolvimento das histórias de usuário.

**⚠️ CRITICAL**: Todas as tarefas desta fase devem ser concluídas antes do início das histórias de usuário.

- [x] T004 Implementar o serviço de persistência local offline-first em `src/services/storageService.js` utilizando IndexedDB (`idb-keyval`) para rascunhos de carrossel e perfil do autor
- [x] T005 [P] Implementar a montagem principal da aplicação React em `src/main.jsx` e o layout base com container responsivo em `src/App.jsx`
- [x] T006 [P] Definir as constantes de plataformas (Instagram, LinkedIn, TikTok), resoluções nominais (1:1, 4:5, 9:16) e temas padrão em `src/services/carouselConstants.js`

**Checkpoint**: Fundação pronta — os serviços básicos e o container da aplicação estão ativos para a implementação das histórias.

---

## Phase 3: User Story 1 - Organização Automática e Híbrida de Texto em Slides (Priority: P1) 🎯 MVP

**Goal**: Permitir ao criador colar um texto bruto e fatiá-lo automaticamente em slides sequenciais coerentes (Capa/Gancho, Desenvolvimento e CTA) com auxílio de IA ou fallback local imediato.

**Independent Test**: Colar um texto de múltiplos parágrafos e confirmar a geração de slides legíveis e ordenados, com opção de edição direta do conteúdo textual.

- [x] T007 [P] [US1] Implementar o algoritmo determinístico de segmentação de texto local baseado em quebras de parágrafo e contagem de caracteres em `src/services/textSegmenter.js`
- [x] T008 [P] [US1] Implementar o cliente de integração com a API do Gemini com prompt estruturado para síntese de ganchos e fallback de timeout em `src/services/aiService.js`
- [x] T009 [US1] Criar o modal de entrada de texto bruto e acionamento de geração ("Gerar com IA" / "Divisão Local") em `src/components/TextInputModal.jsx`
- [x] T010 [US1] Implementar o componente de visualização interativa do carrossel com navegação horizontal em `src/components/CarouselPreview.jsx`
- [x] T011 [US1] Implementar a renderização do cartão de slide individual com tipografia Matter/Inter e hierarquia visual em `src/components/SlideCard.jsx`
- [x] T012 [US1] Integrar a criação de novos slides, exclusão de slides intermediários e reordenação com persistência no `src/App.jsx`

**Checkpoint**: MVP Funcional — O usuário já consegue colar textos, gerar slides de carrossel e editar o conteúdo em tempo real no navegador.

---

## Phase 4: User Story 2 - Identidade Visual do Criador / Branding Pessoal (Priority: P1)

**Goal**: Configurar foto de perfil, nome e @arroba do autor, exibindo-os com elegância e consistência em todos os slides com persistência no navegador.

**Independent Test**: Preencher o formulário de perfil com nome, arroba e foto, verificando a renderização imediata nos slides e a preservação dos dados ao recarregar a página.

- [x] T013 [P] [US2] Implementar o componente de perfil do criador em `src/components/BrandingForm.jsx` com upload de foto de avatar (Blob/Base64), campos para Nome Completo e @arroba e alternância de posição (topo/rodapé)
- [x] T014 [US2] Integrar o bloco de assinatura visual (avatar circular de 36px, nome em Platinum e @ em Silver Mist) no cabeçalho ou rodapé do `src/components/SlideCard.jsx`
- [x] T015 [US2] Conectar o salvamento automático das credenciais do criador no IndexedDB e recuperação automática ao abrir a aplicação no `src/App.jsx`

**Checkpoint**: Histórias 1 e 2 concluídas — O carrossel possui identidade visual de marca consistente e memorizada no dispositivo do criador.

---

## Phase 5: User Story 3 - Inserção, Personalização e Posicionamento Flexível de Imagens e Elementos (Priority: P2)

**Goal**: Permitir a escolha de temas visuais (paletas de cores) e a inserção e ajuste de imagens personalizadas por slide.

**Independent Test**: Selecionar um tema visual (ex: Abyssal Glow), alterar a cor de destaque, inserir uma imagem no slide 2 e ajustar seu enquadramento.

- [x] T016 [P] [US3] Implementar o seletor de temas visuais pré-definidos (Abyssal Glow, Light Clean, Minimalist, Editorial) e personalizador de cores em `src/components/ThemeSelector.jsx`
- [x] T017 [US3] Implementar o painel lateral de edição do slide selecionado com upload de imagem individual e controle de escala em `src/components/SlideEditor.jsx`
- [x] T018 [US3] Atualizar `src/components/SlideCard.jsx` para renderizar a imagem personalizada com recorte harmônico, controles de reposicionamento e botão de remoção

**Checkpoint**: Histórias 1, 2 e 3 funcionando juntas — O criador tem controle criativo total de cores, temas e imagens em cada quadro.

---

## Phase 6: User Story 4 - Efeitos de Navegação e Continuidade Visual Imersiva / Seamless (Priority: P2)

**Goal**: Fornecer pistas de navegação para o leitor (contadores de página, setas de swipe, barra de progresso, CTA) e suporte a elementos gráficos contínuos (seamless) entre slides adjacentes.

**Independent Test**: Ativar o modo seamless entre dois slides, posicionar uma imagem na borda divisória e conferir a divisão milimétrica e fluida entre os quadros.

- [x] T019 [P] [US4] Implementar os indicadores visuais de navegação (contador "2/7" em Lavender Phosphor, barra de progresso e setas estilizadas "Arraste →") no `src/components/SlideCard.jsx`
- [x] T020 [US4] Implementar os controles de ativação e ajuste de elementos contínuos (Seamless) no `src/components/SlideEditor.jsx`
- [x] T021 [US4] Implementar o cálculo de divisão de coordenadas e renderização do conector seamless entre slides adjacentes no `src/components/SlideCard.jsx` e `src/components/CarouselPreview.jsx`
- [x] T022 [US4] Implementar o layout dedicado para o slide final de fechamento contendo chamada de ação (Call to Action / CTA) configurável no `src/components/SlideCard.jsx`

**Checkpoint**: Histórias 1 a 4 ativas — O carrossel proporciona uma experiência de leitura imersiva com forte retenção visual.

---

## Phase 7: User Story 5 - Formatação Multiplataforma e Exportação Final para Download (Priority: P3)

**Goal**: Exportar o carrossel nas proporções de tela recomendadas para Instagram (1:1 e 4:5), TikTok (9:16) e LinkedIn (PDF multipágina oficial).

**Independent Test**: Selecionar Instagram e baixar o arquivo ZIP com PNGs em alta resolução (1080x1350px); selecionar LinkedIn e baixar o PDF multipágina.

- [x] T023 [P] [US5] Implementar a barra de ferramentas de exportação com seletor de plataforma/proporção (Instagram 1:1 e 4:5, LinkedIn, TikTok 9:16) e botões de download em `src/components/ExportToolbar.jsx`
- [x] T024 [US5] Implementar a renderização client-side em alta definição (1080px) e empacotamento em arquivo `.zip` com `html-to-image` e `jszip` em `src/services/exportService.js`
- [x] T025 [US5] Implementar a compilação do documento PDF multipágina com páginas sequenciais em alta qualidade com `jspdf` em `src/services/exportService.js`
- [x] T026 [US5] Integrar a renderização exata dos cortes de imagens seamless e margens de segurança (safe zones) do TikTok no motor do `src/services/exportService.js`

**Checkpoint**: Ciclo Completo — A aplicação gera, customiza e entrega os arquivos finais prontos para postagem nas redes sociais.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Refinamentos finais, validação de experiência do usuário e documentação de suporte.

- [x] T027 [P] Implementar notificações e avisos de interface para modo anônimo de navegação e limites de texto em `src/components/Notifications.jsx`
- [x] T028 Executar a validação completa de ponta a ponta seguindo o roteiro do `specs/001-social-carousel-generator/quickstart.md`
- [x] T029 Atualizar o `README.md` com guia visual do projeto, arquitetura resumida e instruções de execução local

---

## Dependencies & Execution Order

### Phase Dependencies
- **Phase 1 (Setup)**: Pode iniciar imediatamente — sem dependências.
- **Phase 2 (Foundational)**: Depende da conclusão da Phase 1 — BLOQUEIA todas as histórias de usuário.
- **Phase 3 (User Story 1 - MVP)**: Depende da conclusão da Phase 2.
- **Phase 4 (User Story 2)**: Depende da Phase 2 (integra-se suavemente ao SlideCard da US1).
- **Phase 5 (User Story 3)**: Depende da US1 e US2 para aplicação de temas e upload de fotos no editor.
- **Phase 6 (User Story 4)**: Depende da US1 e US3 para elementos gráficos e divisão seamless.
- **Phase 7 (User Story 5)**: Depende de US1–US4 para renderizar todos os elementos finais no export.
- **Phase 8 (Polish)**: Executada após a conclusão das histórias desejadas.

### Parallel Opportunities
- Tarefas marcadas com `[P]` (ex: T002 e T003 no Setup; T005 e T006 no Foundational; T007 e T008 na US1; T013 na US2; T016 na US3; T019 na US4; T023 na US5) operam em arquivos isolados e podem ser implementadas em paralelo.

---

## Implementation Strategy (MVP First)

1. **Etapa 1:** Concluir Setup (Phase 1) e Foundational (Phase 2).
2. **Etapa 2:** Concluir User Story 1 (Phase 3) → **MVP Pronto e Testável**. Já será possível colar textos e ver os slides montados.
3. **Etapa 3:** Concluir User Story 2 (Phase 4) → O autor assina os slides com seu branding e foto.
4. **Etapa 4:** Concluir User Story 3 e 4 (Phases 5 e 6) → Adicionar temas de cores, imagens e efeito seamless.
5. **Etapa 5:** Concluir User Story 5 (Phase 7) → Download dos arquivos ZIP e PDF.

## Phase 9: Convergence

- [ ] T030 Implementar SlideEditor.jsx para upload e controles de posi��o de imagens por slide per FR-007 (missing)
- [ ] T031 Adicionar barra de progresso, setas de swipe e l�gica de divis�o seamless no SlideCard.jsx per FR-008 (missing)
- [ ] T032 Implementar seletor de propor��o (1:1, 4:5, 9:16) e safe zones do TikTok no exportService e SlideCard per FR-009 (missing)
- [ ] T033 Integrar autosave dos rascunhos de slides no App.jsx usando storageService.saveDraft per FR-012 (partial)
- [ ] T034 Adicionar controles de reordena��o (mover para tr�s/frente) nos slides per FR-004 (missing)
- [ ] T035 Criar componente Notifications.jsx para avisos e atualizar README.md com documenta��o per T027, T029 (missing)

