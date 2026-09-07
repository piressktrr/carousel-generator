# Feature Specification: Clean Canvas, Custom Dynamic Themes & Secure Gemini AI Integration

**Feature Branch**: `004-custom-themes-gemini`

**Created**: 2026-09-06 | **Updated**: 2026-09-06

**Status**: Ready for Planning

**Input**: User description: "Tira a nomenclatura dos slides ali, capa, slide dois, slide três, que está em cada slide, isso não precisa. Deixa as cores de uma forma mais dinâmica com uma forma de alguma forma que eu possa implementar meus próprios temas, porque eu quero usar a API do Gemini para isso. Inclusive, ela está aparecendo quando não tem nenhum roteiro, quando você vai criar o roteiro pela primeira vez, mas você expõe a chave assim e ela não está sendo usada para nada."

## Clarifications

### Session 2026-09-06
- Q: Onde o usuário deve gerenciar a chave da API do Gemini e acionar a geração de temas por IA? → A: Na própria aba "Cores" (com seção dedicada para inserir/salvar a chave mascarada e gerar temas por prompt com 1 clique), sincronizada com a tela inicial.
- Q: Qual o nível de flexibilidade cromática que o criador manual de temas deve oferecer? → A: Construtor avançado de gradientes com múltiplos stops de cor, ângulos angulares e controle de opacidade, além de suporte a cores sólidas.
- Q: Como a IA do Gemini deve estruturar as sugestões de temas ao receber o prompt do usuário? → A: Gerar a paleta completa (fundo, título, destaque, texto, subtexto) com cálculo de contraste harmonioso e um nome criativo temático gerado pela IA.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Remoção das Etiquetas de Nomenclatura Interna dos Slides (Clean Canvas) (Priority: P1)

Como criador de carrosséis, quero que os cards dos slides no palco e na exportação não exibam etiquetas internas de nomenclatura técnica (como "Capa", "Slide 2", "Slide 3", "Fechamento / CTA"), para que a visualização seja 100% limpa, fiel ao conteúdo final e livre de elementos ruidosos que não fazem parte do design.

**Why this priority**: Melhora imediata da experiência visual e limpeza estética do carrossel, eliminando um elemento artificial apontado diretamente pelo usuário.

**Independent Test**: Observar o palco de slides e confirmar visualmente que a tag com o nome do slide (ex: "Capa", "Slide 2") foi removida de dentro do card, mantendo apenas o conteúdo real (título, subtexto, mídias e assinatura).

**Acceptance Scenarios**:

1. **Given** um slide qualquer no palco de edição, **When** renderizado na tela, **Then** nenhuma etiqueta ou badge com texto "Capa", "Slide N" ou "Fechamento" é exibida dentro da área do card de conteúdo.
2. **Given** a exportação de imagens PNG, **When** os slides são empacotados, **Then** nenhuma nomenclatura interna de slide aparece sobreposta às imagens geradas.

---

### User Story 2 - Criação e Gestão Dinâmica de Temas Personalizados com Gradientes Avançados (Priority: P1)

Como usuário, quero criar, customizar e gerenciar meus próprios temas visuais na aba de Cores através de um construtor flexível com suporte a cores sólidas e gradientes avançados (múltiplos stops de cor, controle de ângulo angular e opacidade), além de definir as cores do título, destaque, texto e subtexto, para ter liberdade criativa total sem depender apenas do catálogo estático.

**Why this priority**: Dá autonomia profissional para reproduzir identidades visuais de marcas modernas com fundos sofisticados e contrastes ajustáveis.

**Independent Test**: Na aba "Cores", clicar em "Criar Novo Tema", configurar um fundo em gradiente angular com 2 ou mais stops de cor e opacidade, ajustar título e destaque, salvar o tema com nome personalizado e constatar aplicação imediata aos slides.

**Acceptance Scenarios**:

1. **Given** a aba "Cores" na barra lateral esquerda, **When** o usuário clica em "Criar Novo Tema", **Then** é exibido o construtor visual de temas com suporte a cores sólidas e gradientes avançados.
2. **Given** o construtor de gradiente, **When** o usuário ajusta ângulo, paradas de cor (stops) e opacidade, **Then** a pré-visualização em tempo real reflete o resultado visual imediatamente.
3. **Given** um tema personalizado salvo, **When** o usuário o seleciona, **Then** todos os slides do carrossel adotam o novo esquema de cores e o tema é mantido salvo no IndexedDB.
4. **Given** um tema personalizado previamente salvo, **When** o usuário decide excluí-lo, **Then** o tema é removido da lista sem afetar os temas nativos do sistema.

---

### User Story 3 - Geração Inteligente de Temas via API do Gemini & Proteção Segura da Chave (Priority: P1)

Como criador, quero gerenciar minha chave da API do Gemini diretamente na aba de Cores com proteção visual por mascaramento (e sincronizada com a tela inicial), e acionar um gerador inteligente por IA que, a partir de um prompt descritivo (ex: "Tecnologia cyberpunk neon", "Cafeteria minimalista outonal"), cria uma paleta completa com contraste harmônico e um nome criativo temático com 1 clique.

**Why this priority**: Transforma a API do Gemini de um campo inerte e exposto em uma ferramenta poderosa de produtividade para geração instantânea de paletas cromáticas com contraste profissional, resolvendo a vulnerabilidade de segurança e a falta de utilidade relatadas pelo usuário.

**Independent Test**: Na aba "Cores", inserir a chave de API em campo mascarado, digitar "Finanças premium elegante", clicar em "Gerar Tema com IA" e verificar que a IA gera uma paleta completa (fundo, título, destaque, texto, subtexto) e um título criativo sugerido pronto para salvar.

**Acceptance Scenarios**:

1. **Given** o campo de inserção da chave de API do Gemini na aba "Cores" e na tela inicial, **When** visualizado pelo usuário, **Then** os caracteres são mascarados por padrão com botão para alternar visibilidade (revelar/ocultar).
2. **Given** uma chave de API configurada, **When** o usuário digita um prompt descritivo de estilo e clica em "Gerar Tema com IA", **Then** a API do Gemini retorna a paleta completa harmoniosa juntamente com um nome temático criativo.
3. **Given** o tema gerado por IA exibido na pré-visualização, **When** o usuário clica em "Salvar e Aplicar", **Then** o tema é integrado à lista de temas personalizados e aplicado a todos os slides.
4. **Given** a ausência de chave de API ou falha de conectividade, **When** o usuário utiliza a aplicação, **Then** o sistema opera com 100% de funcionalidade manual sem bloqueios.

---

### Edge Cases

- **Contraste insuficiente no tema personalizado**: Se o usuário escolher cores com baixo contraste (ex: texto claro em fundo claro), o sistema deve alertar visualmente sobre legibilidade recomendando tons contrastantes.
- **Exclusão de tema em uso**: Se o usuário excluir um tema personalizado que está atualmente aplicado aos slides, o sistema deve reverter suavemente para o tema padrão seguro (*Abyssal Glow* ou *Clean Ivory*) sem crash.
- **Chave de API inválida ou sem saldo**: Se a chamada à API do Gemini retornar erro de autenticação ou cota, o sistema deve exibir mensagem clara em português sem travar o estúdio.
- **Tema personalizado com gradiente complexo**: O sistema deve aceitar tanto cores sólidas hexadecimais quanto gradientes lineares/radiais com múltiplos stops de cor para o plano de fundo.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE remover a etiqueta visual interna de nomenclatura ("Capa", "Slide N", "Fechamento / CTA") de dentro de todos os cards de slide no palco de edição e na renderização de exportação.
- **FR-002**: O sistema DEVE fornecer um construtor visual de temas personalizados na aba "Cores", permitindo configurar: Nome do Tema, Cor de Fundo (sólida ou gradiente avançado com ângulo, stops e opacidade), Cor do Título/Heading, Cor de Destaque/Accent, e Cor do Texto/Subtexto.
- **FR-003**: O sistema DEVE persistir os temas personalizados criados no armazenamento local do navegador (IndexedDB), garantindo disponibilidade contínua entre sessões.
- **FR-004**: O sistema DEVE permitir a exclusão de temas personalizados criados pelo usuário, preservando intactos os temas do catálogo nativo.
- **FR-005**: O sistema DEVE proteger visualmente o campo de entrada da chave de API do Gemini em todos os pontos da aplicação (aba Cores e tela inicial), utilizando mascaramento por padrão com controle de exibição/ocultação (ícone de olho).
- **FR-006**: O sistema DEVE persistir a chave de API do Gemini no armazenamento local do usuário sob consentimento, mantendo-a sincronizada entre as diferentes telas.
- **FR-007**: O sistema DEVE fornecer um gerador de temas por IA na aba "Cores" que, a partir de uma descrição textual (prompt), gera automaticamente uma paleta harmoniosa completa (fundo, título, destaque, texto, subtexto) e um nome temático criativo.
- **FR-008**: O sistema DEVE permitir a pré-visualização instantânea do tema gerado por IA antes de salvá-lo definitivamente no catálogo personalizado.
- **FR-009**: O sistema DEVE manter o funcionamento 100% offline e manual para usuários que optarem por não utilizar a API do Gemini.
- **FR-010**: O sistema DEVE aplicar o tema ativo de forma reativa a todos os slides do carrossel, recalculando as variáveis de estilo sem latência perceptível.

---

### Key Entities

- **CustomTheme**: Representa uma paleta visual criada pelo usuário ou pela IA.
  - `id`: Identificador único (ex: `theme-custom-1234`).
  - `name`: Nome legível do tema (ex: "Cyberpunk Neon", "Minimalista Café").
  - `bg`: Cor sólida ou expressão de gradiente CSS (`linear-gradient(...)` ou `radial-gradient(...)`).
  - `heading`: Cor do título principal.
  - `accent`: Cor dos elementos de destaque, botões e selo.
  - `text`: Cor do corpo do texto.
  - `subtext`: Cor do subtexto subordinado.
  - `isCustom`: Indicador booleano diferenciando temas customizados dos nativos (`true`).
  - `gradientConfig`: Objeto opcional com ângulo, stops e tipo de gradiente para reedição no construtor.
  - `createdAt`: Timestamp de criação.

- **AiConfig**: Configuração local de integração com IA.
  - `apiKey`: Chave de API mascarada/armazenada localmente.
  - `isConfigured`: Status booleano de validação da chave.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% dos cards de slides são exibidos sem etiquetas técnicas ou tags artificiais no palco e nas imagens finais exportadas.
- **SC-002**: Usuários conseguem criar e aplicar um tema personalizado manual com gradiente em menos de 30 segundos com pré-visualização instantânea.
- **SC-003**: A geração de uma paleta de tema completa com nome criativo a partir de um prompt via Gemini é concluída em menos de 4 segundos quando a chave de API está conectada.
- **SC-004**: A chave de API nunca é exposta em texto puro na interface por padrão, reduzindo a zero o risco de visualização acidental por terceiros.
- **SC-005**: Temas personalizados permanecem salvos e utilizáveis com 100% de integridade após recarregar a página (F5) ou reiniciar o navegador.

---

## Assumptions

- A chave da API Gemini é fornecida diretamente pelo usuário (BYOK - Bring Your Own Key) e trafega diretamente entre o navegador do usuário e o endpoint oficial do Google AI, sem necessidade de servidores intermediários.
- A remoção das tags internas nos slides não afeta a numeração externa do carrossel (ex: "1 de 5" visível na barra de contexto acima do card), que permanece como auxílio de navegação do editor.
- O formato de exportação de imagens PNG continua sendo o padrão exclusivo, renderizando as cores e gradientes exatos do tema ativo escolhido.
