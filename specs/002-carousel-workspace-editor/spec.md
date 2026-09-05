# Feature Specification: Carousel Studio Workspace & Slide Editor

**Feature Branch**: `002-carousel-workspace-editor`

**Created**: 2026-09-05

**Status**: Draft

**Input**: User description: "Vou me informar um pouco como que esse roteiro, como que esse projeto vai funcionar. Bem, minha ideia é, assim que eu abrir a aplicação no site, ter um local para colocar o roteiro que eu criei para ser posto nos carrosséis. E aí, quando eu fizer isso, eu clico para gerar slides e aí os slides vão ser gerados com aquele roteiro. Em cada slide, eu quero ter a opção de poder colocar uma imagem, eu poder mudar o tamanho dessa imagem dentro daquele daquele daquele slide, e eu poder colocar ela tanto embaixo, tanto em cima, tanto só a metade de um lado, só a metade de outro. Eu poder mudar a fonte do texto e poder também alterar o meu arroba, minha fotinha ali, eu poder deixar eles aparecendo ou não. E, basicamente, por enquanto é isso. Eu quero que essas alterações fiquem no lado direito da tela. Então vai ter um menu onde eu posso ir alterando essas coisas e do lado, depois desse lado direito em diante, ser só os slides e aí eu poder ir interagindo com eles."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Roteirização Inicial e Geração Instantânea de Slides (Priority: P1)

Como criador de conteúdo, ao acessar a aplicação, quero visualizar de imediato uma área clara e intuitiva para colar o meu roteiro e acionar a geração, para que o meu texto seja estruturado automaticamente em uma sequência de slides prontos para edição.

**Why this priority**: É o ponto de entrada primário da jornada do usuário. Sem a recepção do roteiro e a geração dos slides correspondentes, o fluxo de edição e customização não pode ser iniciado.

**Independent Test**: Pode ser testado colando um roteiro de múltiplos tópicos na tela inicial e acionando o botão de geração; o sistema deve criar e exibir imediatamente os slides ordenados com os textos distribuídos harmonicamente.

**Acceptance Scenarios**:

1. **Given** que o usuário acessa a tela principal da aplicação, **When** a interface é carregada, **Then** uma área proeminente para inserção do roteiro é exibida com um botão de ação claro para "Gerar Slides".
2. **Given** um roteiro válido preenchido na área de entrada, **When** o usuário aciona o botão de geração, **Then** o sistema processa o texto e gera a sequência correspondente de slides no espaço de trabalho interativo.
3. **Given** que o usuário tenta acionar a geração com o campo de roteiro em branco ou vazio, **When** clica em gerar, **Then** o sistema exibe um aviso orientador solicitando o preenchimento antes de prosseguir.

---

### User Story 2 - Espaço de Trabalho Dividido (Menu Lateral à Direita e Palco Interativo) (Priority: P1)

Como criador, quero um espaço de trabalho visualmente organizado onde um menu lateral à direita reúna todas as ferramentas de personalização e a área restante exiba os slides em tempo real, para que eu possa navegar, inspecionar e interagir diretamente com cada slide enquanto ajusto seus parâmetros.

**Why this priority**: A disposição espacial define a ergonomia do produto. O menu lateral à direita permite que os controles fiquem sempre acessíveis sem obstruir o palco visual de pré-visualização contínua dos slides.

**Independent Test**: Pode ser testado interagindo com a tela após a geração dos slides: verificar que o menu de ajustes está posicionado à direita e que clicar ou focar em um slide específico reflete suas configurações no painel correspondente em tempo real.

**Acceptance Scenarios**:

1. **Given** uma sequência de slides gerados, **When** o espaço de trabalho é exibido, **Then** o menu de edição lateral é fixado no quadrante direito da tela e a área de visualização dos slides ocupa o restante do espaço útil.
2. **Given** múltiplos slides no palco, **When** o usuário clica ou seleciona um slide específico, **Then** o menu da direita foca e reflete imediatamente as configurações e propriedades daquele slide selecionado.
3. **Given** modificações realizadas nos controles do menu da direita, **When** qualquer valor é alterado, **Then** o slide ativo atualiza sua renderização instantaneamente sem necessidade de recarregar a tela.

---

### User Story 3 - Inserção, Redimensionamento e Posicionamento Docking de Imagens por Slide (Priority: P1)

Como criador visual, quero ter a liberdade de inserir uma imagem individual em cada slide, controlar sua escala (tamanho) e definir seu posicionamento exato (acima, abaixo, metade esquerda ou metade direita), para enriquecer o apelo visual do carrossel com diagramações variadas e dinâmicas.

**Why this priority**: É um requisito central expresso pelo usuário, essencial para transformar carrosséis puramente textuais em peças gráficas atrativas de alto engajamento.

**Independent Test**: Pode ser testado selecionando um slide, carregando um arquivo de imagem, alterando o controle de escala e alternando entre os 4 modos de ancoragem (topo, base, split esquerdo, split direito), confirmando a reorganização fluida do texto ao redor da imagem.

**Acceptance Scenarios**:

1. **Given** um slide selecionado no menu da direita, **When** o usuário escolhe inserir uma imagem, **Then** a imagem é carregada e posicionada no slide com controles de ajuste disponíveis no painel.
2. **Given** uma imagem inserida no slide, **When** o usuário ajusta o controle de dimensão (tamanho/escala), **Then** a imagem amplia ou reduz proporcionalmente dentro dos limites seguros do slide.
3. **Given** uma imagem vinculada ao slide, **When** o usuário seleciona a posição "Superior" (em cima) ou "Inferior" (embaixo), **Then** a imagem se ancora verticalmente e o texto se acomoda no espaço complementar.
4. **Given** uma imagem vinculada ao slide, **When** o usuário seleciona a posição "Metade Esquerda" ou "Metade Direita", **Then** o slide adota layout dividido lado a lado (split screen), ocupando a imagem uma metade e o texto a outra metade.
5. **Given** um slide com imagem, **When** o usuário aciona a remoção da imagem, **Then** o slide volta a exibir o layout de texto integral com estética harmoniosa.

---

### User Story 4 - Customização Tipográfica (Seleção de Fontes) (Priority: P2)

Como usuário, quero poder alterar a família tipográfica (fonte) aplicada aos textos dos slides, para alinhar a estética do carrossel ao tom de voz e identidade visual da minha comunicação.

**Why this priority**: A escolha tipográfica confere personalidade e legibilidade editorial ao carrossel, permitindo adequar o estilo a nichos corporativos, informais ou educativos.

**Independent Test**: Pode ser testado escolhendo diferentes opções no catálogo de fontes do menu lateral e confirmando que os títulos e parágrafos dos slides assumem a nova fonte em tempo real.

**Acceptance Scenarios**:

1. **Given** o menu lateral da direita aberto, **When** o usuário visualiza o seletor de fontes, **Then** uma lista de famílias tipográficas curadas e de alta legibilidade é disponibilizada.
2. **Given** uma família tipográfica selecionada pelo usuário, **When** a opção é confirmada, **Then** os textos dos slides passam a ser renderizados com a nova tipografia preservando o espaçamento e hierarquia.

---

### User Story 5 - Controle Granular de Identidade do Criador (Foto, @Handle e Visibilidade) (Priority: P2)

Como profissional ou autor, quero poder cadastrar minha foto de perfil e meu identificador de rede social (@handle), com a opção de ativar ou desativar a exibição desses elementos (deixando-os visíveis ou ocultos) de forma global ou individual por slide.

**Why this priority**: Oferece controle total sobre a assinatura visual do autor, viabilizando designs limpos em slides que necessitam de foco absoluto na mensagem ou de encerramento sem redundâncias.

**Independent Test**: Pode ser testado configurando nome, @handle e foto no menu e alternando a chave de visibilidade (exibir/ocultar) no slide ativo, verificando o desaparecimento imediato do bloco de assinatura naquele slide específico enquanto permanece ativo nos demais.

**Acceptance Scenarios**:

1. **Given** o formulário de identidade no menu da direita, **When** o usuário altera a imagem de avatar ou digita um novo @handle, **Then** as informações de assinatura são atualizadas instantaneamente.
2. **Given** o controle de visibilidade da assinatura, **When** o usuário alterna a opção para "Ocultar", **Then** a foto e o @handle deixam de ser exibidos no slide selecionado.
3. **Given** um slide com assinatura oculta, **When** o usuário reativa a visibilidade, **Then** a foto e o @handle reaparecem na posição configurada com alinhamento refinado.

---

### Edge Cases

- **Roteiro com volume assimétrico de texto entre tópicos:** O gerador inicial equilibra a quebra de frases para evitar slides superlotados ou excessivamente vazios.
- **Imagem de alta resolução ou proporção extrema (panorâmica/vertical estreita):** Ao ancorar na metade lateral ou topo/base, o sistema aplica enquadramento inteligente com corte seguro (object-fit) sem distorcer as proporções originais do arquivo.
- **Combinação de imagem grande com texto longo no modo dividido (Split):** O sistema previne transbordamento ajustando a escala tipográfica proporcionalmente ou alertando sobre limite de caracteres.
- **Alternância rápida entre slides durante edição:** O menu lateral da direita deve sincronizar o estado imediatamente, sem manter valores residuais do slide anterior.
- **Ausência de foto ou @handle configurados:** Se o usuário optar por manter a visibilidade ativa sem ter feito upload de foto, o sistema exibe um marcador neutro ou apenas o texto do @handle sem quebrar o layout.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE disponibilizar uma área de entrada dedicada na tela inicial para inserção de roteiro de conteúdo em texto livre.
- **FR-002**: O sistema DEVE fornecer um mecanismo de acionamento ("Gerar Slides") que converte o roteiro em uma sequência estruturada e ordenada de slides de carrossel.
- **FR-003**: O sistema DEVE organizar o espaço de trabalho em um layout de duas zonas complementares: menu lateral de edição posicionado à direita da tela e palco interativo de slides ocupando a área adjacente.
- **FR-004**: O sistema DEVE permitir a seleção individual de qualquer slide no palco para edição direcionada de seus atributos no menu da direita.
- **FR-005**: O sistema DEVE permitir o upload e inserção de uma imagem personalizada independente para cada slide da sequência.
- **FR-006**: O sistema DEVE fornecer um controle de ajuste de escala/tamanho para a imagem vinculada ao slide.
- **FR-007**: O sistema DEVE fornecer opções de posicionamento e ancoragem estruturada da imagem no slide, suportando minimamente:
  - Posição Superior (Topo do slide);
  - Posição Inferior (Base do slide);
  - Metade Esquerda (Layout dividido lateral esquerdo);
  - Metade Direita (Layout dividido lateral direito).
- **FR-008**: O sistema DEVE permitir a personalização da família tipográfica dos slides através de um catálogo de fontes selecionável no menu lateral.
- **FR-009**: O sistema DEVE permitir a configuração da identidade do criador, incluindo foto de perfil (avatar) e identificador de rede social (@handle).
- **FR-010**: O sistema DEVE fornecer controle de visibilidade (exibir/ocultar) para a assinatura do criador (foto e @handle), operável de forma específica por slide.
- **FR-011**: O sistema DEVE atualizar a visualização dos slides no palco em tempo real conforme qualquer propriedade é modificada no menu lateral.
- **FR-012**: O sistema DEVE permitir a remoção da imagem de um slide, restaurando o arranjo visual padrão de texto.

### Key Entities *(include if feature involves data)*

- **Roteiro Bruto (Carousel Script)**: Conteúdo textual inserido inicialmente pelo usuário contendo ideias, frases ou tópicos que darão origem à sequência de slides.
- **Slide de Carrossel (Carousel Slide)**: Unidade visual que compõe o carrossel. Atributos: identificador único, ordem sequencial, conteúdo de texto, configuração da imagem vinculada (arquivo, tamanho, posição de ancoragem), família tipográfica ativa e indicador de visibilidade do branding.
- **Imagem de Slide (Slide Image Asset)**: Atributos de representação da mídia gráfica inserida no slide: referência de dados da imagem, fator de escala e modalidade de ancoragem (Topo, Base, Metade Esquerda, Metade Direita).
- **Identidade do Criador (Creator Profile)**: Credenciais de atribuição do autor contendo imagem de perfil e texto do @handle.
- **Espaço de Trabalho (Studio Workspace)**: Estado global da interface organizando o slide atualmente selecionado, o estado do menu lateral direito e a coleção de slides interativos.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário consegue colar seu roteiro e visualizar todos os slides gerados no espaço de trabalho em menos de 5 segundos após o clique em "Gerar Slides".
- **SC-002**: 100% das alterações realizadas no menu da direita (troca de fonte, ancoragem de imagem, ajuste de tamanho e visibilidade da assinatura) refletem visualmente no slide ativo em menos de 100 milissegundos (percepção de tempo real).
- **SC-003**: 95% dos usuários conseguem carregar uma imagem e alternar entre as 4 posições de ancoragem (topo, base, metade esquerda e metade direita) sem necessidade de treinamento ou instruções adicionais.
- **SC-004**: A alternância de visibilidade da assinatura (ocultar/exibir foto e @) em um slide não altera a visibilidade dos demais slides, garantindo autonomia granular com 100% de confiabilidade.
- **SC-005**: O layout do espaço de trabalho mantém a separação visual clara entre o menu lateral direito e a área dos slides em resoluções de desktop e telas amplas sem sobreposição de controles.

## Assumptions

- A aplicação é prioritariamente voltada para uso em telas de desktop / laptops, onde o espaço horizontal comporta confortavelmente o menu lateral à direita e a visualização dos slides lado a lado.
- As fontes tipográficas disponibilizadas no catálogo são fontes web de livre distribuição e renderização consistente em múltiplos sistemas operacionais.
- O redimensionamento de imagens opera respeitando a integridade das proporções originais (proporção aspecto preservada) para evitar distorções anamórficas.
- O texto do roteiro colado pode ser automaticamente segmentado por parágrafos ou marcadores de quebra lógica estabelecidos na entrada inicial.
- Toda a manipulação de imagens (redimensionamento e posicionamento) ocorre diretamente no cliente em memória durante a sessão de edição.
