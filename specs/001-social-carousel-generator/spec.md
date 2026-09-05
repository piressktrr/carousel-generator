# Feature Specification: Gerador de Carrosséis Multiplataforma (Instagram, LinkedIn, TikTok)

**Feature Branch**: `001-social-carousel-generator`

**Created**: 2026-09-03

**Status**: Ready for Planning

**Input**: User description: "Crie uma aplicação que será um gerador de carrosséis para Instagram, LinkedIn e TikTok. Nesse gerador de carrosséis, eu vou colocar um texto e a própria aplicação cuidará de organizar esse texto em cada imagem ali do carrossel, cada post do carrossel. Dentro de cada post, eu quero poder inserir a imagem que eu quiser, quero poder colocar o meu nome, ter um espaço para a minha foto e do lado o meu arroba, meu nome, e também ter efeitos de navegação que se comuniquem com o leitor que está vendo aquele carrossel."

## Clarifications

### Session 2026-09-04
- Q: Como deve funcionar a inteligência de organização e divisão do texto bruto em cada slide do carrossel? → A: Abordagem híbrida com IA: a aplicação utiliza IA para sugerir títulos chamativos (ganchos), resumir e distribuir o conteúdo semanticamente em slides ideais, permitindo edição manual irrestrita e contando com fallback algorítmico local em caso de falha de conexão.
- Q: Onde e como os projetos de carrossel em edição e as configurações de branding (foto, nome, @) devem ser armazenados? → A: Armazenamento local no navegador (IndexedDB/LocalStorage), sem exigência de autenticação, login ou infraestrutura remota de contas no MVP.
- Q: Como deve funcionar a personalização visual (estilo, cores e tipografia) dos slides do carrossel? → A: Híbrido de temas prontos com edição visual flexível: o sistema oferece templates e paletas pré-configuradas de alto contraste como base inicial, permitindo customizar cores da marca e ajustar livremente o posicionamento e alinhamento de textos e imagens em cada slide.
- Q: Como deve ser o fluxo de publicação do carrossel nas redes sociais? → A: Apenas download direto dos arquivos prontos: o sistema foca estritamente na geração, renderização e download de arquivos de alta definição (ZIP de PNGs e PDF multipágina), sendo a postagem feita manualmente pelo criador em cada rede, sem integrações diretas de APIs de publicação no MVP.
- Q: Quais efeitos de navegação e pistas de continuidade devem ser oferecidos para prender a atenção do leitor durante a passagem dos slides? → A: Carrossel contínuo (Seamless / Infinito): suporte a contadores de página, setas/pistas de swipe, barras de progresso contínuo, CTA final e capacidade de posicionar imagens ou elementos gráficos conectores que atravessam a borda de um slide e continuam no slide subsequente, gerando uma experiência de leitura contínua e imersiva ao deslizar.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Organização Automática e Híbrida de Texto em Slides de Carrossel (Priority: P1)

Como criador de conteúdo, quero colar um texto bruto (ideias, artigos, listas ou roteiros) na aplicação para que um assistente de IA analise, crie ganchos atrativos e divida o conteúdo automaticamente em uma sequência lógica de slides de carrossel, mantendo controle irrestrito de edição manual pelo usuário.

**Why this priority**: É o valor central da aplicação (Core Value Proposition). Sem a capacidade de receber texto livre e convertê-lo em blocos legíveis, atrativos e organizados por imagem, o produto não cumpre sua função primária.

**Independent Test**: Pode ser testado inserindo um texto de exemplo com múltiplos parágrafos e verificando se o sistema gera uma sequência visual de slides contendo Capa (Gancho magnético gerado pela IA), Desenvolvimento sintetizado e Conclusão, com quantidade equilibrada de texto por slide e opção de edição manual.

**Acceptance Scenarios**:

1. **Given** que o usuário cola um texto com título e vários parágrafos, **When** ele aciona a geração com assistência de IA, **Then** o sistema gera automaticamente uma sequência ordenada de slides onde o primeiro funciona como Capa/Gancho e os subsequentes contêm blocos legíveis e sintetizados de conteúdo.
2. **Given** uma sequência de slides gerados pela IA, **When** o usuário clica em qualquer slide para editar seu texto ou mover um trecho para outro slide, **Then** a visualização do slide é atualizada em tempo real sem afetar os slides não selecionados.
3. **Given** a necessidade de ajustar a extensão do carrossel, **When** o usuário decide adicionar um novo slide em branco ou excluir um slide intermediário, **Then** o sistema reorganiza a sequência numérica automaticamente.
4. **Given** falha de conexão com a API de IA ou indisponibilidade de rede, **When** o usuário solicita a geração, **Then** o sistema ativa automaticamente a segmentação algorítmica local (heurística de parágrafos) e notifica o usuário sem interromper o fluxo.

---

### User Story 2 - Identidade Visual do Criador / Branding Pessoal (Priority: P1)

Como criador ou profissional, quero configurar minha foto de perfil, meu nome e meu arroba (@handle) para que apareçam de forma consistente e elegante em cada slide do carrossel, garantindo a atribuição e o reconhecimento da minha marca pessoal quando meu post for compartilhado, permanecendo salvos no meu navegador para futuros carrosséis.

**Why this priority**: A assinatura visual (foto + nome + arroba) é indispensável para criadores de conteúdo em redes sociais, sendo um requisito explícito e inegociável do usuário.

**Independent Test**: Pode ser testado fazendo o upload de uma foto de perfil e preenchendo o nome e arroba, confirmando se todos os slides do carrossel exibem instantaneamente esses dados no cabeçalho ou rodapé configurado e se persistem após recarregar a página.

**Acceptance Scenarios**:

1. **Given** que o usuário preencheu seu nome ("João Silva"), seu arroba ("@joaosilva") e selecionou uma foto de avatar, **When** o carrossel é visualizado, **Then** todos os slides exibem o avatar circular ao lado do nome e do arroba com alinhamento e proporções adequadas.
2. **Given** dados de branding já cadastrados, **When** o usuário altera seu nome ou substitui a foto, **Then** todos os slides do carrossel em edição refletem imediatamente a nova identidade e os dados são salvos localmente.
3. **Given** um slide específico onde o autor prefira destaque total ao conteúdo (ex: slide de capa ou encerramento), **When** o usuário opta por ocultar a barra de branding naquele slide, **Then** apenas aquele slide oculta a identificação, mantendo-a nos demais.
4. **Given** que o usuário recarrega a aplicação no mesmo navegador, **When** acessa a página, **Then** suas credenciais de branding (foto, nome e arroba) já aparecem pré-preenchidas a partir do armazenamento local.

---

### User Story 3 - Inserção, Personalização e Posicionamento Flexível de Imagens e Elementos (Priority: P2)

Como usuário, quero aplicar temas visuais pré-definidos (cores e fontes) e ter liberdade para inserir imagens e ajustar o posicionamento e alinhamento dos elementos em cada slide, combinando rapidez com flexibilidade criativa.

**Why this priority**: A união de temas estéticos pré-configurados com a flexibilidade de reposicionar elementos permite que o carrossel tenha padrão profissional sem engessar a criatividade do autor.

**Independent Test**: Pode ser testado aplicando um tema visual (ex: Dark Mode), alterando a cor primária para a cor da marca do usuário, inserindo uma imagem em um slide e ajustando a posição do texto e da imagem livremente.

**Acceptance Scenarios**:

1. **Given** um carrossel em edição, **When** o usuário seleciona um tema pré-configurado (ex: Minimalista, Dark, Editorial), **Then** todos os slides adotam instantaneamente as fontes, cores de fundo e contrastes do tema.
2. **Given** um tema selecionado, **When** o usuário personaliza a cor primária da sua marca, **Then** os destaques tipográficos e elementos gráficos se adaptam à paleta escolhida.
3. **Given** um slide selecionado, **When** o usuário insere uma imagem ou move blocos de texto, **Then** o sistema permite ajustar o posicionamento e escala dos elementos de forma fluida.
4. **Given** um slide com imagem, **When** o usuário opta por remover a imagem, **Then** o layout do slide é readequado com elegância.

---

### User Story 4 - Efeitos de Navegação e Continuidade Visual Imersiva / Seamless (Priority: P2)

Como criador, quero que cada post do carrossel contenha pistas de navegação visual (setas, contador de páginas, barra de progresso) e elementos visuais contínuos (efeito seamless que divide uma imagem ou elemento entre dois slides adjacentes) para instigar o leitor a deslizar até o final.

**Why this priority**: O efeito contínuo (seamless) é um dos formatos visuais de maior retenção e engajamento em redes sociais, conectando visualmente um slide ao próximo e transformando o carrossel em uma experiência panorâmica.

**Independent Test**: Pode ser testado ativando o modo seamless em dois slides adjacentes (ex: slides 2 e 3), posicionando uma imagem na borda divisória e conferindo se a metade esquerda é renderizada no slide 2 e a metade direita no slide 3 com alinhamento perfeito.

**Acceptance Scenarios**:

1. **Given** um carrossel de 7 slides, **When** os slides são renderizados, **Then** cada slide exibe um contador de posição preciso (ex: "Slide 2 de 7" ou "2/7") e uma barra de progresso visual.
2. **Given** slides que possuem um próximo slide na sequência, **When** renderizados, **Then** exibem um indicador direcional amigável (como uma seta estilizada ou texto "Deslize para o lado").
3. **Given** dois slides adjacentes onde o usuário ativa o efeito contínuo (seamless), **When** uma imagem conectora é posicionada na extremidade direita do primeiro slide, **Then** o sistema divide e continua o elemento graficamente na extremidade esquerda do slide seguinte de forma milimétrica.
4. **Given** o último slide da sequência (Slide 7/7), **When** renderizado, **Then** o sistema oculta a seta de avanço e apresenta um elemento visual de fechamento / Call To Action (ex: "Gostou? Salve e compartilhe").

---

### User Story 5 - Formatação Multiplataforma e Exportação Final para Download (Priority: P3)

Como usuário, quero exportar e baixar meu carrossel nos formatos e resoluções ideais para Instagram, LinkedIn e TikTok diretamente no meu computador para fazer a publicação manual de forma ágil e segura.

**Why this priority**: Fecha o ciclo de valor da aplicação, entregando os arquivos finais prontos para publicação manual sem burocracia de integrações externas.

**Independent Test**: Pode ser testado alternando os formatos (1:1, 4:5 e 9:16) e executando o download em formato de imagens compactadas (ZIP de PNGs) e formato de documento PDF.

**Acceptance Scenarios**:

1. **Given** um carrossel finalizado para o Instagram, **When** o usuário seleciona a proporção 4:5 (Retrato) e clica em exportar, **Then** o sistema gera o download de um arquivo ZIP contendo as imagens PNG numeradas sequencialmente (ex: 1080x1350px) com os cortes seamless perfeitamente calculados.
2. **Given** um carrossel destinado ao LinkedIn, **When** o usuário solicita a exportação para documento, **Then** o sistema gera o download de um arquivo PDF multipágina otimizado para o feed do LinkedIn.
3. **Given** um carrossel destinado ao TikTok, **When** o usuário escolhe a proporção 9:16 (Vertical Tela Cheia), **Then** os slides são exportados com resolução 1080x1920px preservando as margens seguras da interface do aplicativo.

---

### Edge Cases

- **Texto muito curto ou com uma só frase:** O sistema gera um slide único de impacto visual com o branding do criador, sem forçar divisões artificiais nem exibir setas de avanço.
- **Texto extremamente longo (mais de 2.000 palavras):** O sistema alerta o usuário sobre o limite recomendado de slides para retenção (ex: máximo de 10 a 12 slides por carrossel) e oferece opção de sintetizar via IA ou distribuir o texto em partes.
- **Falha de conectividade ou indisponibilidade na API de IA:** O sistema ativa automaticamente a divisão algorítmica/heurística local por quebras de parágrafo, informando o usuário via notificação não-bloqueante e permitindo edição manual.
- **Limpeza de cache / Janela anônima no navegador:** O sistema detecta a ausência de persistência permanente e alerta o usuário para exportar o projeto antes de fechar a sessão caso esteja em modo anônimo.
- **Nome ou @arroba de grande extensão:** O componente de branding ajusta o tamanho da tipografia dinamicamente para evitar truncamento ou sobreposição indesejada com o corpo do texto do slide.
- **Imagens seamless em troca de aspect ratio:** Se o usuário alterar a proporção (ex: de 4:5 para 9:16), os pontos de corte dos elementos contínuos são recalculados automaticamente para manter a fusão visual entre os slides.
- **Exclusão de slide intermediário contendo elemento seamless:** O sistema avisa o usuário e ajusta ou converte o elemento conector para caber no slide remanescente sem deixar pontas cortadas.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE permitir a inserção de texto livre (digitado ou colado) através de uma área de entrada dedicada.
- **FR-002**: O sistema DEVE fornecer um motor híbrido de estruturação: utilizar IA para sugerir títulos chamativos (ganchos), resumir e distribuir o conteúdo semanticamente em uma sequência lógica de slides otimizados para redes sociais.
- **FR-003**: O sistema DEVE disponibilizar um mecanismo de fallback algorítmico local (baseado em quebras de parágrafo e limites de caracteres) caso a chamada de IA falhe ou esteja sem conectividade.
- **FR-004**: O sistema DEVE permitir que o usuário edite o texto de qualquer slide diretamente, adicione novos slides, remova slides existentes e reordene a sequência de slides.
- **FR-005**: O sistema DEVE disponibilizar um formulário de Perfil do Criador contendo: campo para upload de foto de perfil (avatar), campo para Nome Completo e campo para identificador de rede social (@arroba).
- **FR-006**: O sistema DEVE renderizar o bloco de identidade visual do criador (foto, nome e arroba lado a lado) em posição configurável (cabeçalho ou rodapé) em todos os slides ou em slides selecionados.
- **FR-007**: O sistema DEVE permitir a inserção de uma imagem personalizada por slide, fornecendo controles de enquadramento (ajuste de proporção, escala ou substituição).
- **FR-008**: O sistema DEVE incluir elementos visuais de navegação e continuidade entre os slides:
  - Indicador numérico de páginas (ex: "1/6", "2/6");
  - Indicadores de deslize direcionais (setas ou texto "arraste para o lado" / swipe cue);
  - Barra ou marcadores de progresso visual entre os slides;
  - Chamada para Ação (Call to Action / CTA) visual no slide final;
  - Suporte a elementos contínuos (efeito *seamless* / carrossel infinito), calculando automaticamente a divisão e transição de imagens ou faixas gráficas que conectam dois slides adjacentes.
- **FR-009**: O sistema DEVE suportar proporções e layouts predefinidos para as redes sociais especificadas:
  - **Instagram**: 1:1 (Quadrado - 1080x1080) e 4:5 (Retrato vertical - 1080x1350);
  - **LinkedIn**: 1:1 e 4:5, com geração de arquivo PDF multipágina para o formato de documento interativo;
  - **TikTok**: 9:16 (Vertical tela cheia - 1080x1920) com margens de segurança para os botões de sobreposição da interface nativa da plataforma.
- **FR-010**: O sistema DEVE fornecer uma área de pré-visualização interativa em tempo real para navegar pelos slides exatamente como serão renderizados, simulando o efeito contínuo ao deslizar.
- **FR-011**: O sistema DEVE disponibilizar o download direto dos carrosséis gerados em dois formatos:
  - Pacote compactado (ZIP) contendo arquivos de imagem de alta definição (PNG/JPEG) numerados sequencialmente;
  - Documento PDF multipágina com páginas individuais para cada slide.
- **FR-012**: O sistema DEVE persistir os rascunhos de carrossel em edição e as configurações do Perfil do Criador localmente no navegador do usuário (via IndexedDB / LocalStorage), permitindo recuperar o trabalho sem necessidade de criação de conta ou login.
- **FR-013**: O sistema DEVE disponibilizar temas visuais pré-definidos de alto contraste com paletas de cores customizáveis (fundo, tipografia, destaques) e oferecer controles de posicionamento flexível para mover, alinhar e redimensionar blocos de texto e imagens dentro de cada slide.

### Key Entities *(include if feature involves data)*

- **Carrossel (Carousel Project)**: Representa o projeto de carrossel. Atributos: título do projeto, plataforma alvo (Instagram, LinkedIn, TikTok), proporção de tela selecionada (1:1, 4:5, 9:16), tema visual base, paleta de cores customizada, lista ordenada de slides, data de criação e atualização. Armazenado localmente no dispositivo/navegador do criador.
- **Slide**: Representa um quadro individual do carrossel. Atributos: índice sequencial, tipo de slide (Capa, Conteúdo, Encerramento/CTA), texto de título, texto do corpo, imagem anexada (opcional), coordenadas/alinhamento de elementos customizáveis, flags de efeito seamless (elemento conector entre slides), configurações locais de visibilidade de navegação e branding.
- **Perfil do Criador (Author Branding)**: Representa as credenciais de assinatura do autor. Atributos: imagem de avatar (Blob/Base64), nome de exibição, @arroba, posição de renderização (topo ou rodapé), visibilidade padrão nos slides. Persistido localmente no cliente.
- **Configuração de Navegação (Navigation Settings)**: Representa os parâmetros de comunicação com o leitor. Atributos: formato do contador de páginas, visibilidade de setas de swipe, texto da pista de deslize, estilo da barra de progresso, mensagem do slide de encerramento, configuração de conectores seamless entre slides.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário consegue transformar um texto bruto em um rascunho de carrossel de 5 a 8 slides estruturados com ganchos e síntese em menos de 15 segundos após acionar a geração.
- **SC-002**: 90% dos usuários conseguem configurar seu perfil de branding (foto, nome e @arroba) e vê-lo refletido em todos os slides em menos de 60 segundos no primeiro uso, com persistência automática entre recarregamentos de página.
- **SC-003**: 100% das exportações em PDF (para LinkedIn) e pacotes de imagens (para Instagram e TikTok) são geradas sem cortes indesejados de texto, sem distorção das fotos e com alinhamento milimétrico em elementos contínuos (seamless).
- **SC-004**: O tempo total gasto por um criador desde a inserção do texto bruto até o download do carrossel finalizado pronto para postar é inferior a 3 minutos.
- **SC-005**: 95% dos usuários conseguem navegar e pré-visualizar a sequência completa de slides na interface sem travamentos ou atrasos perceptíveis de renderização.

## Assumptions

- A estruturação inicial adota um modelo híbrido: a IA sugere ganchos e sínteses para os slides, mas o usuário mantém autonomia total de edição, e o sistema possui fallback algorítmico local caso a rede ou API externa falhe.
- Toda a persistência de dados no MVP opera no modelo "Offline-First / Client-Side", utilizando o armazenamento local do navegador (IndexedDB/LocalStorage) para guardar rascunhos e perfil do autor sem dependência de autenticação ou banco de dados em nuvem.
- A personalização visual combina templates estéticos profissionais pré-definidos com controle flexível para o usuário ajustar cores e reposicionar blocos de texto/imagem nos slides.
- Os efeitos visuais contínuos (seamless) calculam a divisão exata dos elementos gráficos baseando-se na resolução nominal da proporção de tela selecionada (1080x1080 para 1:1, 1080x1350 para 4:5 e 1080x1920 para 9:16).
- A aplicação é voltada exclusivamente para a criação e download direto dos ativos prontos; postagens automáticas e conexões diretas via APIs de redes sociais (Meta, LinkedIn, TikTok) estão explicitamente fora do escopo do MVP.
- Para o LinkedIn, o padrão de carrossel amplamente aceito e de maior alcance orgânico é o upload de documento PDF multipágina; portanto, essa opção é fornecida como padrão para essa rede.
- Os elementos de navegação respeitam "zonas seguras" (safe zones), especialmente no formato 9:16 do TikTok, para que botões nativos da rede (curtir, comentar, compartilhar e legenda) não sobreponham o texto ou a identidade do autor.
- A aplicação é agnóstica de frameworks ou bibliotecas neste momento de especificação, devendo os critérios de stack ser definidos na fase de planejamento (`plan.md`).
