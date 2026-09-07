# Feature Specification: Posicionamento Flexível de Perfil e Simplificação de IA do Gemini

**Feature Branch**: `005-flexible-profile-positioning`

**Created**: 2026-09-06

**Status**: Draft

**Input**: "Na verdade, retira a criação de temas com o Gemini, não precisa disso. Mas deixe a chave de API ali para a pessoa colocar às vezes criar um roteiro com o Gemini. Também permita com que eu mude o meu perfil para baixo, para cima, para o lado ou para o canto inferior esquerdo, para o canto inferior direito, para o canto superior esquerdo ou para o canto superior direito, para ele não ficar só em um lugar fixo ali embaixo."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Posicionamento Flexível da Assinatura do Criador (Priority: P1)

Como criador de conteúdo, desejo posicionar minha assinatura de perfil (avatar, nome, arroba e selo verificado) em diferentes cantos e bordas do slide (superior esquerdo, superior direito, topo centro, inferior esquerdo, inferior direito ou base centro), para que o branding não fique engessado na base do slide e se harmonize perfeitamente com a diagramação do texto e imagens.

**Why this priority**: É o cerne da flexibilidade visual solicitada pelo usuário, permitindo composições de design mais livres e profissionais sem que a assinatura colida com o conteúdo textual.

**Independent Test**: Na aba "Perfil", selecionar o posicionamento "Canto Superior Direito" (ou outro canto) e verificar visualmente que a assinatura do perfil é imediatamente renderizada no topo direito de todos os slides ativos no palco e nos arquivos exportados.

**Acceptance Scenarios**:

1. **Given** que o criador está editando um carrossel no estúdio com perfil configurado, **When** ele seleciona uma das opções de posicionamento na aba Perfil (ex: Canto Superior Esquerdo, Topo Direito, Canto Inferior Esquerdo, Canto Inferior Direito), **Then** a barra de assinatura do criador muda instantaneamente para o canto selecionado no slide.
2. **Given** que o perfil foi movido para o topo do slide (ex: `top-left` ou `top-right`), **When** o slide tem título e texto no corpo, **Then** o layout ajusta o espaçamento interno para que o texto e a assinatura não se sobreponham.
3. **Given** que o usuário exporta os slides em PNG (ZIP) ou PDF, **When** o processo de exportação é concluído, **Then** as imagens finais mantêm o perfil ancorado exatamente na posição configurada pelo usuário.

---

### User Story 2 - Simplificação da IA: Foco em Estruturação de Roteiros e Chave Mascarada (Priority: P1)

Como criador, desejo que a chave da API do Gemini fique disponível e protegida para criar/estruturar roteiros inteligentes a partir de texto bruto, removendo a ferramenta desnecessária de geração de temas por IA da aba de Cores.

**Why this priority**: Remove complexidade e poluição visual não desejadas na aba de cores (conforme pedido explícito do usuário), enquanto preserva a capacidade essencial da IA de particionar roteiros em slides com total segurança da credencial.

**Independent Test**: Acessar a aba "Cores" e verificar que a seção de "Gerador de Temas por IA" foi removida (mantendo o criador manual e temas do sistema). Acessar o campo de API Key (na tela inicial ou configurações) e validar que a chave permanece salva e mascarada (`type="password"` com toggle de olho) para uso na geração de roteiros.

**Acceptance Scenarios**:

1. **Given** que o usuário está na aba "Cores", **When** a interface é renderizada, **Then** a seção de geração de temas por IA não é exibida, exibindo apenas o criador de temas manuais/gradientes e a lista de temas.
2. **Given** que o usuário insere sua chave de API do Gemini no formulário inicial ou no painel de configurações, **When** a chave é digitada, **Then** ela permanece mascarada por padrão, permite alternância de visibilidade via ícone de olho, e é salva de forma persistente no armazenamento local seguro.
3. **Given** que uma chave de API válida está configurada, **When** o criador gera slides a partir de um roteiro bruto, **Then** a inteligência do Gemini particiona e sintetiza os slides organicamente. Se não houver chave, o particionamento algorítmico local continua funcionando sem falhas.

---

## Edge Cases

- **Slide com imagem ancorada no topo e perfil posicionado no topo**: A barra de assinatura do perfil deve possuir fundo translúcido (`backdrop-filter`) e contraste adequado sobre imagens ou cores de fundo do slide.
- **Transição de posicionamento em tempo de execução**: Alternar posições não deve causar saltos bruscos ou quebra de renderização dos cartões nos navegadores.
- **Perfil sem avatar ou sem arroba**: O contêiner de posicionamento deve renderizar apenas os elementos preenchidos (apenas nome ou apenas arroba) sem deixar espaços em branco estranhos.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE permitir a escolha do posicionamento da assinatura de perfil entre 6 âncoras no slide:
  - Canto Superior Esquerdo (`top-left`)
  - Topo Centro (`top-center`)
  - Canto Superior Direito (`top-right`)
  - Canto Inferior Esquerdo (`bottom-left`)
  - Base Centro (`bottom-center`)
  - Canto Inferior Direito (`bottom-right`)
- **FR-002**: O sistema DEVE disponibilizar na aba "Perfil" (BrandingTab) um seletor visual intuitivo com as âncoras disponíveis.
- **FR-003**: O sistema DEVE persistir a preferência de posicionamento do perfil no armazenamento local (IndexedDB) para que se mantenha ao recarregar a página (F5).
- **FR-004**: O sistema DEVE posicionar a barra de assinatura do criador de forma absoluta ou flexível nas bordas do cartão de slide, garantindo que o texto central flua sem colisões.
- **FR-005**: O sistema DEVE remover a funcionalidade de geração de temas por IA com prompt do Gemini da aba "Cores" (`ThemesTab.jsx`).
- **FR-006**: O sistema DEVE manter o gerenciamento seguro da chave da API do Gemini (campo mascarado com alternância `Eye`/`EyeOff` e persistência local) para uso na estruturação inteligente de roteiros.
- **FR-007**: O sistema DEVE assegurar que as exportações em alta resolução (ZIP/PNG) reflitam com 100% de fidelidade a posição selecionada do perfil.

---

### Key Entities

- **CreatorProfile (Estendido)**:
  - `name`: string (Nome do autor)
  - `handle`: string (Arroba / identificador)
  - `avatar`: string | null (Imagem do autor em base64 ou URL)
  - `avatarShape`: `'circle'` | `'square'`
  - `hasVerifiedBadge`: boolean
  - `position`: `'bottom-left'` | `'bottom-center'` | `'bottom-right'` | `'top-left'` | `'top-center'` | `'top-right'` (Padrão: `'bottom-left'`)
- **AiConfig**:
  - `apiKey`: string (Chave do Gemini armazenada com segurança localmente para estruturação de roteiros)

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O criador pode reposicionar o perfil para qualquer um dos 6 cantos/bordas em menos de 2 cliques na aba Perfil.
- **SC-002**: A atualização visual da posição do perfil ocorre em tempo real (< 16ms, 60fps) em todos os slides da tela.
- **SC-003**: A aba de cores fica limpa e focada exclusivamente no design de paletas, sem botões ou requisições desnecessárias para temas de IA.
- **SC-004**: 100% das imagens exportadas em ZIP contêm o perfil posicionado exatamente na âncora selecionada.

---

## Assumptions

- O posicionamento padrão para novos carrosséis continua sendo `'bottom-left'` para manter consistência com o padrão editorial consolidado.
- Os overlays secundários (ícones e stickers na grade 3x3) continuam funcionando de forma independente e não interferem na ancoragem do perfil do criador.
- A chave da API do Gemini pode ser inserida na tela inicial ao colar o roteiro ou em um modal/campo dedicado no estúdio, sem ficar exposta em texto plano.
