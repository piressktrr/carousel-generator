# Feature Specification: Clean Canvas, Custom Dynamic Themes & Secure Gemini AI Integration

**Feature Branch**: `004-custom-themes-gemini`

**Created**: 2026-09-06

**Status**: Draft

**Input**: User description: "Tira a nomenclatura dos slides ali, capa, slide dois, slide três, que está em cada slide, isso não precisa. Deixa as cores de uma forma mais dinâmica com uma forma de alguma forma que eu possa implementar meus próprios temas, porque eu quero usar a API do Gemini para isso. Inclusive, ela está aparecendo quando não tem nenhum roteiro, quando você vai criar o roteiro pela primeira vez, mas você expõe a chave assim e ela não está sendo usada para nada."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Remoção das Etiquetas de Nomenclatura Interna dos Slides (Clean Canvas) (Priority: P1)

Como criador de carrosséis, quero que os cards dos slides no palco e na exportação não exibam etiquetas internas de nomenclatura técnica (como "Capa", "Slide 2", "Slide 3", "Fechamento / CTA"), para que a visualização seja 100% limpa, fiel ao conteúdo final e livre de elementos ruidosos que não fazem parte do design.

**Why this priority**: Melhora imediata da experiência visual e limpeza estética do carrossel, eliminando um elemento artificial apontado diretamente pelo usuário.

**Independent Test**: Observar o palco de slides e confirmar visualmente que a tag com o nome do slide (ex: "Capa", "Slide 2") foi removida de dentro do card, mantendo apenas o conteúdo real (título, subtexto, mídias e assinatura).

**Acceptance Scenarios**:

1. **Given** um slide qualquer no palco de edição, **When** renderizado na tela, **Then** nenhuma etiqueta ou badge com texto "Capa", "Slide N" ou "Fechamento" é exibida dentro da área do card de conteúdo.
2. **Given** a exportação de imagens PNG, **When** os slides são empacotados, **Then** nenhuma nomenclatura interna de slide aparece sobreposta às imagens geradas.

---

### User Story 2 - Criação e Gestão Dinâmica de Temas Personalizados (Priority: P1)

Como usuário, quero criar, customizar e gerenciar meus próprios temas visuais na aba de Cores (definindo cor de fundo, cor do título, cor de destaque e cor do texto/subtexto), para que eu não dependa apenas dos temas pré-configurados e possa adaptar o visual com total liberdade criativa.

**Why this priority**: Dá autonomia para criar paletas alinhadas à identidade visual de qualquer marca ou projeto sem restrições a um catálogo fixo.

**Independent Test**: Na aba "Cores", clicar em "Criar Novo Tema", personalizar as cores de fundo, título e destaque, salvar o tema com um nome personalizado e constatar que ele é aplicado imediatamente ao carrossel e preservado para uso futuro.

**Acceptance Scenarios**:

1. **Given** a aba "Cores" na barra lateral esquerda, **When** o usuário acessa a seção de temas personalizados, **Then** é disponibilizado um botão para criar um novo tema customizado.
2. **Given** o formulário de criação de tema, **When** o usuário escolhe as cores (fundo, título, destaque, texto) e clica em salvar, **Then** o novo tema é adicionado à lista de temas disponíveis com pré-visualização da cor primária.
3. **Given** um tema personalizado ativo, **When** o usuário seleciona esse tema, **Then** todos os slides do carrossel adotam instantaneamente as novas cores configuradas.
4. **Given** um tema personalizado previamente salvo, **When** o usuário decide excluí-lo, **Then** o tema é removido da lista sem afetar os temas nativos do sistema.

---

### User Story 3 - Geração Inteligente de Temas via API do Gemini & Proteção Segura da Chave (Priority: P1)

Como criador, quero informar minha chave da API do Gemini com segurança (com campo protegido/mascarado e armazenamento seguro local) para que eu possa gerar automaticamente paletas de cores e temas completos a partir de uma descrição textual de estilo ou nicho (ex: "Finanças corporativo moderno", "Tecnologia neon minimalista"), integrando a IA de forma prática e útil.

**Why this priority**: Transforma a API do Gemini de um campo inerte e exposto em uma ferramenta poderosa de produtividade para geração instantânea de paletas cromáticas com contraste profissional, resolvendo a vulnerabilidade de segurança e a falta de utilidade relatadas pelo usuário.

**Independent Test**: Inserir uma chave de API do Gemini em campo mascarado com alternância de visibilidade, digitar uma descrição de tema como "Café acolhedor tons terrosos", clicar em "Gerar Tema com IA" e verificar que uma paleta harmônica é gerada e disponibilizada para aplicação imediata.

**Acceptance Scenarios**:

1. **Given** o campo de inserção da chave de API do Gemini, **When** visualizado pelo usuário, **Then** os caracteres são ocultos por padrão (estilo senha com botão para revelar/ocultar) e a chave não é exibida publicamente.
2. **Given** uma chave de API válida configurada, **When** o usuário digita uma descrição de estilo (prompt) e solicita a geração de tema, **Then** o sistema gera uma paleta completa (fundo, título, destaque, texto) com cores contrastantes e harmônicas.
3. **Given** um tema gerado por IA, **When** aprovado pelo usuário, **Then** ele é adicionado aos temas personalizados disponíveis com nome sugestivo e aplicado aos slides.
4. **Given** a ausência de chave de API ou falha de conectividade, **When** o usuário cria temas, **Then** o sistema mantém funcionalidade completa manual sem bloquear o fluxo criativo do usuário.

---

### Edge Cases

- **Contraste insuficiente no tema personalizado**: Se o usuário escolher cores com baixo contraste (ex: texto claro em fundo claro), o sistema deve alertar visualmente sobre legibilidade recomendando tons contrastantes.
- **Exclusão de tema em uso**: Se o usuário excluir um tema personalizado que está atualmente aplicado aos slides, o sistema deve reverter suavemente para o tema padrão seguro (*Abyssal Glow* ou *Clean Ivory*) sem crash.
- **Chave de API inválida ou sem saldo**: Se a chamada à API do Gemini retornar erro de autenticação ou cota, o sistema deve exibir mensagem clara em português sem travar o estúdio.
- **Tema personalizado com gradiente complexo**: O sistema deve aceitar tanto cores sólidas hexadecimais quanto gradientes lineares/radiais para o plano de fundo.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE remover a etiqueta visual interna de nomenclatura ("Capa", "Slide N", "Fechamento / CTA") de dentro de todos os cards de slide no palco de edição e na renderização de exportação.
- **FR-002**: O sistema DEVE fornecer um criador/editor de temas personalizados na aba "Cores", permitindo especificar: Nome do Tema, Cor de Fundo (sólida ou gradiente), Cor do Título/Heading, Cor de Destaque/Accent, e Cor do Texto/Subtexto.
- **FR-003**: O sistema DEVE persistir os temas personalizados criados no armazenamento local do navegador (IndexedDB), garantindo disponibilidade contínua entre sessões.
- **FR-004**: O sistema DEVE permitir a exclusão de temas personalizados criados pelo usuário, preservando intactos os temas do catálogo nativo.
- **FR-005**: O sistema DEVE proteger visualmente o campo de entrada da chave de API do Gemini, utilizando mascaramento por padrão com controle de exibição/ocultação (ícone de olho).
- **FR-006**: O sistema DEVE persistir a chave de API do Gemini no armazenamento local do usuário sob consentimento, evitando a necessidade de redigitação a cada carregamento da página.
- **FR-007**: O sistema DEVE permitir a geração de novas paletas de temas completos via IA Gemini a partir de prompts descritivos (ex: nicho, emoção, paleta de cores ou conceito de marca).
- **FR-008**: O sistema DEVE salvar as paletas geradas pela IA diretamente no catálogo de temas personalizados do usuário para aplicação imediata com um clique.
- **FR-009**: O sistema DEVE manter o funcionamento 100% offline e manual para usuários que optarem por não utilizar a API do Gemini.
- **FR-010**: O sistema DEVE aplicar o tema ativo de forma reativa a todos os slides do carrossel, recalculando as variáveis de estilo sem latência perceptível.

---

### Key Entities

- **CustomTheme**: Representa uma paleta visual criada pelo usuário ou pela IA.
  - `id`: Identificador único (ex: `theme-custom-1234`).
  - `name`: Nome legível do tema (ex: "Cyberpunk Neon", "Minimalista Café").
  - `bg`: Cor ou gradiente de fundo do slide.
  - `heading`: Cor do título principal.
  - `accent`: Cor dos elementos de destaque, botões e selo.
  - `text`: Cor do corpo do texto.
  - `subtext`: Cor do subtexto subordinado.
  - `isCustom`: Indicador booleano diferenciando temas customizados dos nativos.
  - `createdAt`: Timestamp de criação.

- **AiConfig**: Configuração local de integração com IA.
  - `apiKey`: Chave de API mascarada/armazenada localmente.
  - `isConfigured`: Status de validação da chave.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% dos cards de slides são exibidos sem etiquetas técnicas ou tags artificiais no palco e nas imagens finais exportadas.
- **SC-002**: Usuários conseguem criar e aplicar um tema personalizado manual em menos de 30 segundos com visualização instantânea.
- **SC-003**: A geração de uma paleta de tema completa a partir de um prompt via Gemini é concluída em menos de 4 segundos quando a chave de API está conectada.
- **SC-004**: A chave de API nunca é exposta em texto puro na interface por padrão, reduzindo a zero o risco de visualização acidental por terceiros.
- **SC-005**: Temas personalizados permanecem salvos e utilizáveis com 100% de integridade após recarregar a página (F5) ou reiniciar o navegador.

---

## Assumptions

- A chave da API Gemini é fornecida diretamente pelo usuário (BYOK - Bring Your Own Key) e trafega diretamente entre o navegador do usuário e o endpoint oficial do Google AI, sem necessidade de servidores intermediários.
- A remoção das tags internas nos slides não afeta a numeração externa do carrossel (ex: "1 de 5" visível na barra de contexto acima do card), que permanece como auxílio de navegação do editor.
- O formato de exportação de imagens PNG continua sendo o padrão exclusivo, renderizando as cores exatas do tema ativo escolhido.
