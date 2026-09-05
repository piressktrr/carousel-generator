# Feature Specification: Carousel Studio Workspace & Advanced Slide Customizer

**Feature Branch**: `002-carousel-workspace-editor`

**Created**: 2026-09-05

**Status**: Draft

**Input**: User description: "A ideia é deixar os slides personalizáveis ao máximo utilizando essa barra do lado esquerdo. Então, novamente, vou colocar o roteiro, ele vai gerar os slides para mim, e aí eu vou podendo alterar tudo e eu também vou poder inserir ícones, outras imagens menores que não sejam só do fundo do slide. Para caso eu quiser fazer alterações." (Complementando a visão anterior de espaço de trabalho, roteirização, tipografia e identidade visual).

## Clarifications

### Session 2026-09-05
- Q: Como o roteiro inserido pelo usuário deve ser dividido e estruturado nos slides ao clicar no botão "Gerar Slides"? → A: Abordagem Híbrida Inteligente (IA analisa o roteiro, sugere títulos/ganchos de capa e distribui o conteúdo sintetizado nos slides, com fallback algorítmico local por parágrafos caso ocorra falha de rede/API).
- Q: Como deve funcionar o posicionamento e ajuste dos ícones e imagens menores adicionais sobre o slide? → A: Âncoras de Grade Pré-definidas (o usuário escolhe na barra esquerda a posição entre 9 regiões do slide — cantos, centros e bordas — e ajusta a escala via controle deslizante).
- Q: A alteração da família tipográfica (fonte) selecionada na barra lateral esquerda deve ser aplicada a todos os slides do carrossel ou configurável individualmente por slide? → A: Global com Override Opcional (a fonte selecionada aplica-se a todo o carrossel por padrão, com opção de customização individual em slides específicos, como na capa).
- Q: De onde virão os ícones disponibilizados no catálogo da barra esquerda para inserção nos slides? → A: Catálogo Curado Embutido + Upload Customizado (coleção nativa de ícones vetoriais frequentes para redes sociais combinada com suporte a upload de ícones e selos em PNG/SVG pelo usuário).
- Q: Como deve funcionar o salvamento e recuperação do carrossel em edição no estúdio caso a aba do navegador seja recarregada ou fechada? → A: Híbrido (autosave contínuo no armazenamento local do navegador para proteção do trabalho ativo, combinado com comandos na barra lateral para iniciar novo projeto do zero ou duplicar).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Roteirização Inicial e Geração Automática de Slides (Priority: P1)

Como criador de conteúdo, ao abrir a aplicação, quero dispor de um espaço dedicado para colar o meu roteiro bruto e um botão para "Gerar Slides", para que o texto seja estruturado e dividido instantaneamente em uma sequência ordenada de slides prontos para customização profunda.

**Why this priority**: É a porta de entrada indispensável. Sem a conversão do roteiro em slides, nenhuma personalização ou diagramação visual pode ocorrer.

**Independent Test**: Pode ser testado colando um roteiro de múltiplos parágrafos e acionando o botão de geração; o sistema deve sintetizar e distribuir os blocos de texto nos respectivos quadros ordenados em tempo real.

**Acceptance Scenarios**:

1. **Given** a tela inicial da aplicação carregada, **When** o usuário insere seu roteiro textual e aciona "Gerar Slides", **Then** o sistema gera a sequência de slides correspondente exibindo os blocos de texto no palco de trabalho com assistência de IA para gancho de abertura e síntese.
2. **Given** uma tentativa de submissão com campo de roteiro em branco, **When** o usuário clica em gerar, **Then** o sistema exibe um alerta orientador e mantém o usuário na tela de entrada.
3. **Given** indisponibilidade de rede ou falha no serviço de IA, **When** o usuário aciona a geração, **Then** o sistema ativa o fallback algorítmico local particionando o texto por parágrafos sem travar o fluxo.

---

### User Story 2 - Espaço de Trabalho com Barra Lateral à Esquerda e Palco de Slides (Priority: P1)

Como criador, quero que o espaço de trabalho apresente uma barra de ferramentas e configurações fixada no **lado esquerdo da tela** e o palco interativo com os slides ocupando o restante da área útil, para que eu tenha um fluxo ergonômico de edição onde seleciono controles à esquerda e vejo os reflexos imediatos nos slides à direita.

**Why this priority**: Estabelece o padrão de layout e navegação do estúdio. A barra esquerda ancora todos os comandos de personalização máxima mantendo o campo de visão dos slides limpo e desimpedido.

**Independent Test**: Pode ser testado navegando pela aplicação após a geração dos slides: verificar que o menu lateral está situado no quadrante esquerdo e que clicar em qualquer slide do palco ativa seus parâmetros específicos no menu esquerdo instantaneamente.

**Acceptance Scenarios**:

1. **Given** a transição para o ambiente de edição, **When** o estúdio é carregado, **Then** a barra de controles e personalização é fixada na lateral esquerda e o palco de slides ocupa o espaço principal adjacente.
2. **Given** múltiplos slides exibidos no palco, **When** o usuário clica em um slide específico, **Then** a barra esquerda foca e sincroniza imediatamente os atributos (texto, imagens, ícones, fontes) daquele slide ativo.
3. **Given** modificações efetuadas nos controles da barra esquerda, **When** qualquer parâmetro é ajustado, **Then** o slide correspondente atualiza sua exibição em tempo real sem recarregar a página.
4. **Given** um projeto com edições ativas em andamento, **When** o usuário recarrega a página ou fecha o navegador, **Then** o estado do carrossel é restaurado integralmente via salvamento automático contínuo, com a barra lateral disponibilizando botão para "Iniciar Novo Projeto" a qualquer momento.

---

### User Story 3 - Ancoragem Estruturada de Imagem de Destaque por Slide (Priority: P1)

Como usuário, quero poder vincular uma imagem principal em cada slide, controlar sua escala (tamanho) e escolher sua posição de ancoragem (em cima, embaixo, metade esquerda ou metade direita), para criar composições equilibradas de texto e imagem.

**Why this priority**: Atende diretamente à demanda por layouts dinâmicos, permitindo formatos de capa, layouts divididos (split) e ilustrações de topo/base.

**Independent Test**: Pode ser testado carregando uma imagem para o slide selecionado e alternando os 4 modos de ancoragem (topo, base, split esquerdo, split direito) e o controle de escala, verificando o reposicionamento responsivo do texto.

**Acceptance Scenarios**:

1. **Given** um slide ativo no menu esquerdo, **When** o usuário faz o upload de uma imagem principal, **Then** ela é renderizada no slide de acordo com a posição de ancoragem selecionada.
2. **Given** uma imagem vinculada ao slide, **When** o usuário altera a escala através do controle deslizante da barra esquerda, **Then** o tamanho da imagem aumenta ou diminui proporcionalmente.
3. **Given** a escolha da opção "Superior" ou "Inferior", **When** aplicada, **Then** a imagem se ancora verticalmente e o texto se reacomoda no espaço restante.
4. **Given** a escolha da opção "Metade Esquerda" ou "Metade Direita", **When** aplicada, **Then** o slide é dividido em duas colunas equivalentes (imagem de um lado, texto do outro).
5. **Given** um slide com imagem principal, **When** o usuário aciona a remoção, **Then** o slide retorna ao arranjo visual de texto pleno.

---

### User Story 4 - Inserção e Manipulação de Elementos Visuais Secundários (Ícones e Imagens Menores) (Priority: P1)

Como criador que busca personalização máxima, quero poder inserir ícones e imagens menores adicionais (selos, setas, logotipos, emojis ou ilustrações complementares) sobre o slide além da imagem de fundo/destaque, ajustando seu tamanho e posicionamento, para destacar pontos-chave e enriquecer a narrativa visual.

**Why this priority**: Requisito explícito do usuário para transformar a ferramenta em um editor rico, permitindo acentuar ideias com recursos gráficos pontuais além do layout básico de fundo.

**Independent Test**: Pode ser testado selecionando um slide, adicionando um ícone a partir do catálogo ou fazendo upload de uma imagem menor (PNG transparente/SVG), ajustando seu tamanho e reposicionando-o dentro do quadro.

**Acceptance Scenarios**:

1. **Given** a seção de elementos gráficos na barra esquerda, **When** o usuário escolhe um ícone da biblioteca vetorial nativa ou carrega uma imagem/selo pessoal (PNG transparente/SVG), **Then** o elemento gráfico é inserido no slide como uma camada visual manipulável.
2. **Given** um elemento secundário (ícone ou imagem menor) inserido no slide, **When** o usuário seleciona uma das 9 âncoras de grade no menu esquerdo e ajusta a escala, **Then** o elemento se ancora na região escolhida (ex: topo direito, centro, base esquerda) e redimensiona mantendo proporções seguras.
3. **Given** a necessidade de adicionar múltiplos elementos de apoio em um slide, **When** o usuário insere novos ícones ou imagens menores, **Then** o sistema permite gerenciá-los individualmente com opção de remoção pontual.

---

### User Story 5 - Customização Tipográfica Ampla (Priority: P2)

Como autor, quero selecionar diferentes famílias tipográficas para os textos dos slides a partir da barra esquerda, para que o estilo visual se adapte perfeitamente à personalidade da minha marca de forma consistente ou com destaques pontuais.

**Why this priority**: A tipografia é um pilar da identidade e da legibilidade em mídias sociais.

**Independent Test**: Pode ser testado alternando a fonte global no menu e verificando que todos os slides a adotam, e em seguida ativando uma fonte customizada em um slide individual (ex: capa) confirmando que apenas aquele slide sofre o override.

**Acceptance Scenarios**:

1. **Given** o seletor de fontes na barra esquerda, **When** o usuário escolhe uma família tipográfica, **Then** a nova fonte é aplicada por padrão a todos os slides do carrossel mantendo a consistência visual.
2. **Given** um slide ativo onde o usuário deseja uma tipografia diferenciada, **When** ativa o controle de fonte individual no painel esquerdo, **Then** apenas o slide selecionado adota a nova fonte sem alterar os demais slides do projeto.

---

### User Story 6 - Controle Granular de Identidade do Criador (Foto, @Handle e Visibilidade) (Priority: P2)

Como criador, quero configurar minha foto de perfil e meu @handle, com liberdade total para ligar ou desligar a visibilidade desses elementos (deixando-os visíveis ou ocultos) por slide, para que slides de impacto ou capas possam ter foco exclusivo no conteúdo quando desejado.

**Why this priority**: Permite flexibilidade de branding sem forçar a repetição da assinatura em slides onde ela seja indesejada.

**Independent Test**: Pode ser testado cadastrando foto e @handle na barra esquerda e desmarcando a chave de visibilidade no slide 1 (capa), confirmando que a assinatura desaparece do slide 1 mas permanece visível nos slides seguintes.

**Acceptance Scenarios**:

1. **Given** os campos de perfil na barra esquerda, **When** o usuário altera a foto ou o identificador (@handle), **Then** as credenciais de assinatura são atualizadas em todos os slides ativos.
2. **Given** o controle de visibilidade da assinatura, **When** o usuário desativa a exibição para o slide selecionado, **Then** a foto e o @handle são imediatamente ocultados naquele quadro sem afetar os demais.

---

### Edge Cases

- **Múltiplos ícones ou imagens menores sobrepostos:** O sistema fornece ordenação clara ou remoção independente para cada elemento gráfico inserido.
- **Inserção de imagens com proporções atípicas (muito largas ou muito estreitas):** As opções de ancoragem estruturada aplicam ajuste seguro sem distorcer as proporções (aspect ratio) originais do arquivo.
- **Textos extensos combinados com imagem na metade lateral (Split):** O sistema previne transbordamento ajustando a margem de segurança e a quebra de linha harmoniosa do texto.
- **Remoção de elementos secundários:** Excluir um ícone ou imagem menor não altera o posicionamento da imagem principal de ancoragem nem o texto do slide.
- **Alternância rápida de slides pelo palco:** A barra esquerda sincroniza o painel instantaneamente com o slide em foco, prevenindo discrepâncias entre os controles e a visualização.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE disponibilizar uma área inicial para inserção de roteiro em texto livre e um botão de ação para "Gerar Slides".
- **FR-002**: O sistema DEVE utilizar um motor híbrido de estruturação: acionar inteligência artificial para sugerir títulos de gancho e sintetizar o conteúdo em slides ordenados, ativando automaticamente fallback algorítmico local por parágrafos em caso de indisponibilidade de rede ou erro na chamada.
- **FR-003**: O sistema DEVE estruturar a interface em duas zonas principais: **barra lateral de personalização e ferramentas à esquerda** e **palco interativo de visualização de slides ocupando o espaço principal**.
- **FR-004**: O sistema DEVE permitir a seleção direta de qualquer slide do palco, sincronizando seus dados e propriedades imediatamente na barra lateral esquerda.
- **FR-005**: O sistema DEVE permitir o upload e a vinculação de uma imagem principal individual para cada slide.
- **FR-006**: O sistema DEVE fornecer um controle de ajuste de escala/tamanho para a imagem principal do slide.
- **FR-007**: O sistema DEVE fornecer 4 opções de posicionamento estruturado (docking) para a imagem principal:
  - Posição Superior (Topo do slide);
  - Posição Inferior (Base do slide);
  - Metade Esquerda (Layout dividido horizontal - split esquerdo);
  - Metade Direita (Layout dividido horizontal - split direito).
- **FR-008**: O sistema DEVE disponibilizar uma biblioteca curada de ícones vetoriais nativos na barra lateral esquerda e permitir o upload de imagens menores complementares (PNG/SVG transparentes) pelo usuário para inserção nos slides.
- **FR-009**: O sistema DEVE fornecer controles na barra lateral esquerda para ajustar tamanho (escala) e posicionamento estruturado baseado em âncoras de grade pré-definidas (9 regiões: cantos, bordas e centro) para cada elemento gráfico secundário adicionado ao slide.
- **FR-010**: O sistema DEVE disponibilizar seleção tipográfica global com suporte a override individual: aplicar a família tipográfica escolhida a todos os slides por padrão, permitindo que o criador defina opcionalmente uma fonte alternativa especificamente para o slide ativo.
- **FR-011**: O sistema DEVE permitir a configuração da identidade do criador (foto de perfil e @handle).
- **FR-012**: O sistema DEVE disponibilizar controle de visibilidade (exibir/ocultar) para a assinatura do criador, com atuação independente por slide.
- **FR-013**: O sistema DEVE refletir qualquer alteração realizada na barra esquerda no palco de slides em tempo real (latência imperceptível).
- **FR-014**: O sistema DEVE permitir a remoção da imagem principal de ancoragem, restaurando o layout textual do slide.
- **FR-015**: O sistema DEVE implementar persistência híbrida offline-first: salvar automaticamente o projeto ativo no armazenamento local do navegador a cada modificação, restaurando-o no recarregamento, e disponibilizar comandos na barra lateral para iniciar novo projeto e resetar o roteiro de trabalho.

### Key Entities *(include if feature involves data)*

- **Roteiro (Carousel Script)**: Texto bruto inicial fornecido pelo usuário contendo os argumentos que serão particionados em slides.
- **Slide do Carrossel (Carousel Slide)**: Unidade de exibição que reúne o texto particionado, imagem principal de ancoragem, lista de elementos gráficos secundários (ícones/imagens menores), tipografia ativa (herdada do projeto ou customizada via override) e estado de visibilidade da assinatura.
- **Imagem Principal de Ancoragem (Docked Image)**: Mídia gráfica principal com atributos de escala e modalidade de posicionamento estruturado (Topo, Base, Metade Esquerda, Metade Direita).
- **Elemento Gráfico Secundário (Graphic Overlay Item)**: Ícone ou imagem menor independente posicionada sobre o slide, contendo identificador, tipo (ícone/imagem), fator de escala e âncora de grade selecionada (uma das 9 regiões pré-definidas).
- **Perfil do Criador (Creator Profile)**: Foto de perfil e identificador @handle do autor.
- **Ambiente de Trabalho (Studio Workspace)**: Estado geral da aplicação composto pela barra lateral esquerda de ferramentas, slide ativo selecionado, tipografia padrão global e visualizador interativo de slides.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário consegue inserir seu roteiro e iniciar a personalização no estúdio de slides em menos de 5 segundos após clicar em "Gerar Slides".
- **SC-002**: 100% das personalizações acionadas na barra esquerda (posição/tamanho de imagens, adição de ícones, troca de fontes e alternância de visibilidade de assinatura) atualizam o slide correspondente no palco em menos de 100 milissegundos.
- **SC-003**: 95% dos usuários conseguem adicionar um ícone ou imagem menor adicional e posicioná-la no slide sem necessidade de tutoriais ou documentação externa.
- **SC-004**: A alternância de visibilidade da foto e @handle opera com 100% de precisão granular, sem alterar os slides vizinhos quando acionada em um slide específico.
- **SC-005**: O layout com barra esquerda fixa e palco à direita se adapta com clareza visual e ergonomia operacional em telas padrão de desktop e notebooks.

## Assumptions

- A aplicação é pensada primariamente para ambientes desktop/web com espaço horizontal adequado para o layout de duas colunas (barra esquerda e palco de slides).
- Os elementos gráficos secundários (ícones e imagens menores) suportam formatos gráficos com canal alfa (transparência) como PNG e SVG para integração visual limpa.
- O redimensionamento tanto da imagem principal quanto dos elementos secundários preserva as proporções originais (aspect ratio) para evitar deformações.
- A biblioteca de ícones fornece um conjunto inicial curado de símbolos populares para redes sociais e apresentações.
