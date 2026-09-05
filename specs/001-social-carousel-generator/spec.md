# Feature Specification: Gerador de Carrosséis Multiplataforma (Instagram, LinkedIn, TikTok)

**Feature Branch**: `001-social-carousel-generator`

**Created**: 2026-09-03

**Status**: Draft

**Input**: User description: "Crie uma aplicação que será um gerador de carrosséis para Instagram, LinkedIn e TikTok. Nesse gerador de carrosséis, eu vou colocar um texto e a própria aplicação cuidará de organizar esse texto em cada imagem ali do carrossel, cada post do carrossel. Dentro de cada post, eu quero poder inserir a imagem que eu quiser, quero poder colocar o meu nome, ter um espaço para a minha foto e do lado o meu arroba, meu nome, e também ter efeitos de navegação que se comuniquem com o leitor que está vendo aquele carrossel."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Organização Automática de Texto em Slides de Carrossel (Priority: P1)

Como criador de conteúdo, quero colar um texto bruto (ideias, artigos, listas ou roteiros) na aplicação para que ela divida e estruture o conteúdo automaticamente em uma sequência lógica de slides de carrossel, poupando meu tempo de formatação manual.

**Why this priority**: É o valor central da aplicação (Core Value Proposition). Sem a capacidade de receber texto livre e convertê-lo em blocos legíveis e organizados por imagem, o produto não cumpre sua função primária.

**Independent Test**: Pode ser testado inserindo um texto de exemplo com múltiplos parágrafos e verificando se o sistema gera uma sequência visual de slides contendo Capa (Gancho), Desenvolvimento e Conclusão, com quantidade equilibrada de texto por slide.

**Acceptance Scenarios**:

1. **Given** que o usuário cola um texto com título e vários parágrafos, **When** ele aciona a geração do carrossel, **Then** o sistema gera automaticamente uma sequência ordenada de slides onde o primeiro funciona como Capa/Gancho e os subsequentes contêm blocos legíveis de conteúdo.
2. **Given** uma sequência de slides gerados, **When** o usuário clica em qualquer slide para editar seu texto ou mover um trecho para outro slide, **Then** a visualização do slide é atualizada em tempo real sem afetar os slides não selecionados.
3. **Given** a necessidade de ajustar a extensão do carrossel, **When** o usuário decide adicionar um novo slide em branco ou excluir um slide intermediário, **Then** o sistema reorganiza a sequência numérica automaticamente.

---

### User Story 2 - Identidade Visual do Criador / Branding Pessoal (Priority: P1)

Como criador ou profissional, quero configurar minha foto de perfil, meu nome e meu arroba (@handle) para que apareçam de forma consistente e elegante em cada slide do carrossel, garantindo a atribuição e o reconhecimento da minha marca pessoal quando meu post for compartilhado.

**Why this priority**: A assinatura visual (foto + nome + arroba) é indispensável para criadores de conteúdo em redes sociais, sendo um requisito explícito e inegociável do usuário.

**Independent Test**: Pode ser testado fazendo o upload de uma foto de perfil e preenchendo o nome e arroba, confirmando se todos os slides do carrossel exibem instantaneamente esses dados no cabeçalho ou rodapé configurado.

**Acceptance Scenarios**:

1. **Given** que o usuário preencheu seu nome ("João Silva"), seu arroba ("@joaosilva") e selecionou uma foto de avatar, **When** o carrossel é visualizado, **Then** todos os slides exibem o avatar circular ao lado do nome e do arroba com alinhamento e proporções adequadas.
2. **Given** dados de branding já cadastrados, **When** o usuário altera seu nome ou substitui a foto, **Then** todos os slides do carrossel em edição refletem imediatamente a nova identidade.
3. **Given** um slide específico onde o autor prefira destaque total ao conteúdo (ex: slide de capa ou encerramento), **When** o usuário opta por ocultar a barra de branding naquele slide, **Then** apenas aquele slide oculta a identificação, mantendo-a nos demais.

---

### User Story 3 - Inserção e Personalização de Imagens por Slide (Priority: P2)

Como usuário, quero poder inserir uma imagem personalizada em qualquer slide do carrossel para ilustrar conceitos, enriquecer visualmente a mensagem e manter o público engajado com elementos visuais além do texto.

**Why this priority**: Aumenta dramaticamente o apelo visual e a taxa de retenção dos carrosséis nas redes sociais, permitindo combinar texto explicativo com gráficos, fotos ilustrativas ou memes.

**Independent Test**: Pode ser testado selecionando um slide intermediário, enviando um arquivo de imagem do computador, reposicionando o enquadramento e verificando a composição com o texto do slide.

**Acceptance Scenarios**:

1. **Given** um slide selecionado, **When** o usuário escolhe adicionar uma imagem e seleciona um arquivo gráfico, **Then** a imagem é exibida no slide em área harmonizada com o texto, preservando a legibilidade.
2. **Given** um slide com imagem inserida, **When** o usuário ajusta o enquadramento (zoom/corte/posição) ou decide substituí-la, **Then** o layout do slide é reajustado mantendo as proporções corretas da rede social.
3. **Given** um slide com imagem, **When** o usuário opta por remover a imagem, **Then** o slide volta a exibir o layout otimizado apenas para texto.

---

### User Story 4 - Elementos de Navegação e Comunicação com o Leitor (Priority: P2)

Como criador, quero que cada post do carrossel contenha pistas e efeitos de navegação visual (setas indicativas, chamadas "arraste para o lado", contador de páginas e barra de progresso) para incentivar o leitor a deslizar até o final do carrossel.

**Why this priority**: A navegação explícita aumenta a taxa de conclusão de leitura (swipe-through rate), métrica chave para os algoritmos de recomendação do Instagram, LinkedIn e TikTok.

**Independent Test**: Pode ser testado navegando pelos slides na interface e verificando se os indicadores exibem a contagem exata (ex: "1/8", "2/8"), setas direcionais nos slides intermediários e chamada conclusiva no último slide.

**Acceptance Scenarios**:

1. **Given** um carrossel de 7 slides, **When** os slides são renderizados, **Then** cada slide exibe um contador de posição preciso (ex: "Slide 2 de 7" ou "2/7") e uma barra de progresso visual.
2. **Given** slides que possuem um próximo slide na sequência, **When** renderizados, **Then** exibem um indicador direcional amigável (como uma seta estilizada ou texto "Deslize para o lado").
3. **Given** o último slide da sequência (Slide 7/7), **When** renderizado, **Then** o sistema oculta a seta de avanço e apresenta um elemento visual de fechamento / Call To Action (ex: "Gostou? Salve e compartilhe").

---

### User Story 5 - Formatação Multiplataforma e Exportação Final (Priority: P3)

Como usuário, quero exportar meu carrossel nas proporções e formatos recomendados para Instagram, LinkedIn e TikTok para poder publicá-lo diretamente nas respectivas redes sem distorção.

**Why this priority**: Fecha o ciclo de valor da aplicação, entregando o resultado final pronto para consumo nas plataformas alvo.

**Independent Test**: Pode ser testado alternando os formatos (1:1, 4:5 e 9:16) e executando o download em formato de imagens compactadas (ZIP de PNGs) e formato de documento PDF.

**Acceptance Scenarios**:

1. **Given** um carrossel finalizado para o Instagram, **When** o usuário seleciona a proporção 4:5 (Retrato) e solicita exportação, **Then** o sistema gera um arquivo ZIP com imagens PNG numeradas sequencialmente na resolução adequada (ex: 1080x1350px).
2. **Given** um carrossel destinado ao LinkedIn, **When** o usuário solicita a exportação para documento, **Then** o sistema gera um arquivo PDF multipágina onde cada página corresponde a um slide em alta resolução.
3. **Given** um carrossel destinado ao TikTok, **When** o usuário escolhe a proporção 9:16 (Vertical Tela Cheia), **Then** os slides se adaptam às dimensões verticais preservando margens de segurança contra os botões de interface nativos do aplicativo.

---

### Edge Cases

- **Texto muito curto ou com uma só frase:** O sistema gera um slide único de impacto visual com o branding do criador, sem forçar divisões artificiais nem exibir setas de avanço.
- **Texto extremamente longo (mais de 2.000 palavras):** O sistema alerta o usuário sobre o limite recomendado de slides para retenção (ex: máximo de 10 a 12 slides por carrossel) e oferece opção de sintetizar ou distribuir o texto em partes.
- **Nome ou @arroba de grande extensão:** O componente de branding ajusta o tamanho da tipografia dinamicamente para evitar truncamento ou sobreposição indesejada com o corpo do texto do slide.
- **Imagens com formatos atípicos (muito estreitas ou panorâmicas):** O sistema aplica enquadramento inteligente (crop centralizado com opção de ajuste manual) para não quebrar a proporção do slide.
- **Troca de proporção após edição (ex: de 1:1 para 9:16):** O sistema recalcula as áreas de respiro e margens de segurança sem perder o conteúdo textual nem as imagens já configuradas.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE permitir a inserção de texto livre (digitado ou colado) através de uma área de entrada dedicada.
- **FR-002**: O sistema DEVE analisar o texto inserido e segmentá-lo automaticamente em slides sequenciais, distribuindo títulos e parágrafos de forma balanceada e confortável para leitura rápida.
- **FR-003**: O sistema DEVE permitir que o usuário edite o texto de qualquer slide diretamente, adicione novos slides, remova slides existentes e reordene a sequência de slides.
- **FR-004**: O sistema DEVE disponibilizar um formulário de Perfil do Criador contendo: campo para upload de foto de perfil (avatar), campo para Nome Completo e campo para identificador de rede social (@arroba).
- **FR-005**: O sistema DEVE renderizar o bloco de identidade visual do criador (foto, nome e arroba lado a lado) em posição configurável (cabeçalho ou rodapé) em todos os slides ou em slides selecionados.
- **FR-006**: O sistema DEVE permitir a inserção de uma imagem personalizada por slide, fornecendo controles de enquadramento (ajuste de proporção, escala ou substituição).
- **FR-007**: O sistema DEVE incluir elementos visuais de navegação nos slides:
  - Indicador numérico de páginas (ex: "1/6", "2/6");
  - Indicadores de deslize direcionais (setas ou texto "arraste para o lado" / swipe cue);
  - Barra ou marcadores de progresso visual entre os slides;
  - Chamada para Ação (Call to Action / CTA) visual no slide final.
- **FR-008**: O sistema DEVE suportar proporções e layouts predefinidos para as redes sociais especificadas:
  - **Instagram**: 1:1 (Quadrado - 1080x1080) e 4:5 (Retrato vertical - 1080x1350);
  - **LinkedIn**: 1:1 e 4:5, com geração de arquivo PDF multipágina para o formato de documento interativo;
  - **TikTok**: 9:16 (Vertical tela cheia - 1080x1920) com margens de segurança para os botões de sobreposição da interface nativa da plataforma.
- **FR-009**: O sistema DEVE fornecer uma área de pré-visualização interativa em tempo real para navegar pelos slides exatamente como serão renderizados.
- **FR-010**: O sistema DEVE disponibilizar a exportação dos slides em dois formatos principais:
  - Pacote compactado (ZIP) contendo arquivos de imagem de alta definição (PNG/JPEG) numerados sequencialmente;
  - Documento PDF multipágina com páginas individuais para cada slide.

### Key Entities *(include if feature involves data)*

- **Carrossel (Carousel Project)**: Representa o projeto de carrossel. Atributos: título do projeto, plataforma alvo (Instagram, LinkedIn, TikTok), proporção de tela selecionada (1:1, 4:5, 9:16), paleta de cores/tema visual, lista ordenada de slides, data de criação e atualização.
- **Slide**: Representa um quadro individual do carrossel. Atributos: índice sequencial, tipo de slide (Capa, Conteúdo, Encerramento/CTA), texto de título, texto do corpo, imagem anexada (opcional), ajustes de posicionamento, configurações locais de visibilidade de navegação e branding.
- **Perfil do Criador (Author Branding)**: Representa as credenciais de assinatura do autor. Atributos: imagem de avatar, nome de exibição, @arroba, posição de renderização (topo ou rodapé), visibilidade padrão nos slides.
- **Configuração de Navegação (Navigation Settings)**: Representa os parâmetros de comunicação com o leitor. Atributos: formato do contador de páginas, visibilidade de setas de swipe, texto da pista de deslize, estilo da barra de progresso, mensagem do slide de encerramento.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário consegue transformar um texto bruto em um rascunho de carrossel de 5 a 8 slides estruturados em menos de 15 segundos após acionar a geração.
- **SC-002**: 90% dos usuários conseguem configurar seu perfil de branding (foto, nome e @arroba) e vê-lo refletido em todos os slides em menos de 60 segundos no primeiro uso.
- **SC-003**: 100% das exportações em PDF (para LinkedIn) e pacotes de imagens (para Instagram e TikTok) são geradas sem cortes de texto, sem distorção das fotos e respeitando as margens de respiro da proporção escolhida.
- **SC-004**: O tempo total gasto por um criador desde a inserção do texto bruto até o download do carrossel finalizado pronto para postar é inferior a 3 minutos.
- **SC-005**: 95% dos usuários conseguem navegar e pré-visualizar a sequência completa de slides na interface sem travamentos ou atrasos perceptíveis de renderização.

## Assumptions

- A segmentação de texto inicial é realizada por algoritmos de divisão baseados em estrutura de parágrafos, quebras lógicas e contagem máxima de caracteres por slide para garantir legibilidade instantânea em dispositivos móveis, sempre permitindo refinamento manual pelo usuário.
- Para o LinkedIn, o padrão de carrossel amplamente aceito e de maior alcance orgânico é o upload de documento PDF multipágina; portanto, essa opção é fornecida como padrão para essa rede.
- Os elementos de navegação respeitam "zonas seguras" (safe zones), especialmente no formato 9:16 do TikTok, para que botões nativos da rede (curtir, comentar, compartilhar e legenda) não sobreponham o texto ou a identidade do autor.
- A aplicação é totalmente agnóstica de stack tecnológica neste momento de especificação de produto, conforme determinado pela constituição do projeto.
