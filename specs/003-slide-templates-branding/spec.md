# Feature Specification: Slide Templates, Subtext & Enhanced Creator Branding

**Feature Branch**: `003-slide-templates-branding`

**Created**: 2026-09-05

**Status**: Draft

**Input**: User description: "Na mesma barra lateral esquerda, eu quero poder modificar só o texto bruto por inteiro e também quero poder ter a opção de modificar esse texto bruto por inteiro, porque eu quero às vezes colar outro roteiro para ver como é que vai ficar e, em vez disso, eu não quero ter que ficar mudando um por um. Também quero ter a opção de colocar um selo verificado. Tudo isso na lateral esquerda, do lado do meu nome, no caso. Eu quero ter a opção de mudar o nome, o arroba, de colocar um selo verificado ou não, de mudar como que a foto vai ficar, se vai ficar redonda, se vai ficar quadrada. E nos slides, eu quero ter a opção de colocar um subtexto e selecionar como que o template vai ser, o template do slide."

## Clarifications

### Session 2026-09-05
- Q: Como deve funcionar a substituição do texto bruto completo a partir da barra lateral esquerda? → A: Editor de Roteiro Bruto Integrado (o usuário pode visualizar e editar o roteiro original ou colar um roteiro totalmente novo dentro de uma aba dedicada na barra esquerda, e ao clicar em "Atualizar / Regenerar Slides", todos os slides são reestruturados adaptativamente de uma vez só, preservando as credenciais de branding e tema).
- Q: Ao colar um novo roteiro bruto na barra lateral e acionar a regeneração em lote, como o sistema deve tratar imagens e ícones secundários que já haviam sido adicionados aos slides anteriores? → A: Preservação Posicional (as imagens ancoradas, ícones na grade 3x3 e customizações visuais são transferidas e preservadas nos novos slides correspondentes ao mesmo índice ordinal).
- Q: Quais formatos de foto de perfil devem ser disponibilizados e onde o selo verificado deve ser exibido? → A: Seletor de Formato (Redonda vs. Quadrada com cantos suaves) e Selo Verificado em Destaque (ao lado do nome do criador, com ícone de verificado azul/ciano bioluminescente, ativável via chave seletora na barra lateral).
- Q: Como o campo de subtexto deve se integrar com o texto principal nos slides? → A: Campo Independente com Hierarquia Tipográfica (cada slide possui um campo de subtexto opcional com estilo visual secundário — tamanho ligeiramente menor, opacidade equilibrada ou cor de destaque —, complementando o título/gancho principal).
- Q: Quais templates de slide devem ser oferecidos inicialmente? → A: Catálogo Curado de Layouts Essenciais para Mídias Sociais (Padrão/Classic, Destaque com Aspas/Editorial, Lista com Marcadores/Bullets, Big Stat/Numérico e Minimalista Foco).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Edição Completa de Roteiro e Regeneração Rápida na Barra Esquerda (Priority: P1)

Como criador de conteúdo que já está trabalhando no estúdio, quero dispor de uma aba dedicada na barra lateral esquerda para visualizar o texto bruto completo, editá-lo ou colar um novo roteiro por inteiro, acionando uma regeneração em lote de todos os slides com um único clique, para testar variações de roteiro rapidamente sem precisar alterar slide por slide ou reiniciar o projeto do zero.

**Why this priority**: Elimina atrito no processo criativo. Permite iterações instantâneas de roteiro mantendo o usuário imerso no estúdio com seus temas e configurações já definidos.

**Independent Test**: Pode ser testado abrindo o estúdio com um carrossel ativo, acessando a aba de Roteiro na barra esquerda, colando um texto novo e clicando em "Atualizar Slides"; o palco de slides deve reconstruir a sequência inteira instantaneamente conforme a nova estrutura textual preservando imagens e ícones dos índices correspondentes.

**Acceptance Scenarios**:

1. **Given** o estúdio de trabalho com slides já carregados, **When** o usuário acessa a seção de Roteiro na barra esquerda, **Then** o texto bruto original está visível e editável em um campo de texto amplo.
2. **Given** o usuário colando um roteiro completamente novo no editor de texto bruto da barra esquerda, **When** aciona a ação de "Atualizar / Regenerar Slides", **Then** o sistema gera uma nova sequência completa de slides adaptada ao novo conteúdo sem forçar quantidade fixa, preservando imagens ancoradas e overlays por posição ordinal, além de manter a identidade do criador e tema visual.
3. **Given** uma edição de texto bruto acidental, **When** o usuário cancela ou não confirma a regeneração, **Then** os slides em exibição no palco continuam preservados intactos.

---

### User Story 2 - Identidade Aprimorada: Selo Verificado e Formato de Foto (Priority: P1)

Como autor, quero poder cadastrar meu nome e meu @arroba, marcar uma opção para exibir um selo de perfil verificado ao lado do meu nome e escolher se minha foto de perfil será exibida no formato **redondo** ou **quadrado**, tudo a partir da barra lateral esquerda, para que a assinatura do carrossel reflita com precisão o estilo da minha presença digital nas redes sociais.

**Why this priority**: É um requisito de marca e autoridade estética demandado diretamente pelo usuário. O selo verificado e a forma da foto elevam o padrão de acabamento visual das publicações.

**Independent Test**: Pode ser testado ativando a opção "Selo Verificado" e alternando o formato da foto entre "Redonda" e "Quadrada" na aba de Branding da barra lateral esquerda; os slides devem atualizar o rodapé de autoria em tempo real exibindo o selo e adaptando a curvatura do avatar.

**Acceptance Scenarios**:

1. **Given** a aba de identidade/branding na barra esquerda, **When** o usuário ativa a opção "Selo Verificado", **Then** um selo gráfico de verificado (ícone de medalha/check) passa a ser exibido imediatamente ao lado do nome do criador em todos os slides com assinatura visível.
2. **Given** a foto de perfil carregada, **When** o usuário seleciona a opção "Quadrada", **Then** o avatar passa a ser exibido com bordas quadradas arredondadas (squircle); quando seleciona "Redonda", o avatar retorna ao formato circular clássico.
3. **Given** as preferências de selo verificado e formato de foto configuradas, **When** a página é recarregada, **Then** as configurações permanecem salvas e ativas no perfil do criador via persistência local.

---

### User Story 3 - Hierarquia de Conteúdo com Subtexto Independente por Slide (Priority: P1)

Como criador, quero poder adicionar e editar um campo de **subtexto** (subtítulo, explicação complementar ou nota de rodapé) específico para cada slide, além do texto principal, para organizar a leitura com hierarquia visual clara (título principal + detalhamento).

**Why this priority**: Slides de carrossel profissionais exigem diferenciação entre o gancho central e o texto de apoio para reter a atenção do leitor sem poluir visualmente o slide.

**Independent Test**: Pode ser testado selecionando o Slide 2, preenchendo o campo "Subtexto" na barra lateral esquerda e verificando que o slide renderiza o texto principal com destaque e o subtexto logo abaixo com tipografia harmônica e proporções adequadas.

**Acceptance Scenarios**:

1. **Given** um slide ativo na barra esquerda, **When** o usuário insere um texto no campo "Subtexto", **Then** ele é renderizado no slide logo abaixo do texto principal com diferenciação visual nítida (tamanho e peso tipográfico secundário).
2. **Given** um slide onde o campo de subtexto está vazio, **When** renderizado, **Then** nenhum espaço em branco residual ou marcador fantasma é exibido no slide, garantindo alinhamento centralizado do texto principal.
3. **Given** a combinação de subtexto com imagem principal ancorada (docking) ou ícones na grade 3x3, **When** exibido, **Then** o subtexto se reacomoda perfeitamente no espaço útil sem sobrepor mídias ou assinaturas.

---

### User Story 4 - Seleção de Templates Visuais de Slide (Priority: P2)

Como usuário, quero selecionar entre diferentes **templates visuais de slide** (arranjos pré-definidos de diagramação como Cartão Clássico, Citação Editorial, Lista com Marcadores e Destaque Numérico) na barra lateral esquerda, para alterar instantaneamente a estética estrutural do slide ativo sem precisar reconfigurar manualmente margens ou elementos.

**Why this priority**: Proporciona variedade visual rítmica ao longo do carrossel, impedindo que todos os slides tenham exatamente a mesma aparência monótona.

**Independent Test**: Pode ser testado alternando o template do slide 1 para "Citação Editorial" e do slide 3 para "Lista com Marcadores", verificando que cada um adota sua respectiva estilização visual e ornamentos específicos.

**Acceptance Scenarios**:

1. **Given** o seletor de templates na barra lateral esquerda, **When** o usuário escolhe um template específico (ex: "Citação Editorial"), **Then** o slide ativo adota os estilos visuais característicos daquele layout (ex: aspas estilizadas, alinhamento editorial, espaçamento diferenciado).
2. **Given** a escolha de um template de "Lista com Marcadores", **When** o texto contém quebras de linha ou itens numerados, **Then** o slide os renderiza como itens destacados com bullets bioluminescentes.
3. **Given** a necessidade de aplicar um template uniformemente, **When** o usuário clica na opção "Aplicar template a todos os slides", **Then** todo o carrossel adota a nova diagramação base mantendo seus respectivos textos e imagens.

---

### User Story 5 - Opções de Cores Mais Cleans & Refatoração para Azul Celestial (Priority: P1)

Como criador de conteúdo visual, quero poder escolher novos temas de cores minimalistas e limpos (mais *clean*, com contraste suave e moderno), mantendo as opções existentes, além de dispor de um tema azul reformulado com um autêntico **Azul Celestial** vívido e brilhante (em vez de um azul opaco), para produzir carrosséis com estética contemporânea e acabamento visual de alto impacto.

**Why this priority**: Solicitado explicitamente pelo usuário para elevar a sofisticação gráfica da ferramenta, garantindo paletas *clean* profissionais e um azul verdadeiramente vivo e celestial.

**Independent Test**: Pode ser testado selecionando os novos temas *clean* no seletor de temas e o tema *Celestial Blue*, verificando visualmente que o azul se destaca com vivacidade bioluminescente e que os slides mantêm legibilidade primorosa.

**Acceptance Scenarios**:

1. **Given** o seletor de temas visuais na barra lateral, **When** o usuário examina as opções, **Then** encontra as opções preexistentes preservadas mais novos temas de design *clean* (ex: *Clean Ivory*, *Minimalist Slate*, *Celestial Azure*).
2. **Given** a seleção do tema azul refatorado, **When** aplicado aos slides, **Then** o tom de azul exibido é um Azul Celestial luminoso, vivo e vibrante (`#00A3FF` / `#00D2FF` com realce de brilho e contraste de texto refinado).
3. **Given** a preparação para referência de imagem, **When** uma imagem é fornecida como inspiração visual, **Then** a arquitetura de temas permite acomodar e sincronizar uma paleta derivada dessa referência sem alterar o código base do editor.

---

## Edge Cases

- **Colagem de roteiro com formatação caótica no editor bruto:** O motor de regeneração limpa quebras de linha triplas, normaliza espaçamentos e preserva a estrutura de blocos coerente.
- **Subtexto muito longo combinado com layout dividido (Split):** O sistema aplica rolagem interna sutil ou ajusta dinamicamente a escala da fonte para evitar transbordamento além dos limites do slide.
- **Nome do criador muito extenso com selo verificado ativado:** O selo verificado permanece ancorado ao lado do nome com quebra flexível segura (`white-space: nowrap` no grupo de nome + selo).
- **Alternância entre formatos de foto (redonda vs quadrada) com imagens em proporções retangulares:** O contêiner aplica `object-fit: cover` garantindo centralização da imagem sem distorções no corte.
- **Troca de template em slide que já possui imagem ancorada:** O template respeita o posicionamento da imagem sem quebrar a proporção de docking estabelecida.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE disponibilizar uma aba/seção de "Roteiro Completo" fixada na barra lateral esquerda de ferramentas.
- **FR-002**: O sistema DEVE permitir a visualização, edição livre e colagem de um texto bruto completo de roteiro dentro da barra lateral esquerda.
- **FR-003**: O sistema DEVE fornecer um comando de ação na barra lateral ("Atualizar Slides pelo Roteiro" / "Regenerar Slides") que reprocessa o texto bruto por inteiro de forma adaptativa, substituindo a lista de slides de uma vez só sem perda de tema, branding ou configurações de projeto.
- **FR-004**: O sistema DEVE disponibilizar na aba de identidade da barra esquerda um controle para ligar ou desligar o **Selo Verificado** de perfil.
- **FR-005**: O sistema DEVE renderizar um selo gráfico de verificado imediatamente ao lado do nome de exibição do autor nos slides sempre que a opção estiver ativada.
- **FR-006**: O sistema DEVE disponibilizar um seletor visual na barra esquerda para definir o **formato da foto de perfil** do criador entre **Redonda (circular)** e **Quadrada (rounded-square)**.
- **FR-007**: O sistema DEVE aplicar o formato de foto escolhido (redonda ou quadrada) ao avatar em todos os slides que possuem assinatura visível.
- **FR-008**: O sistema DEVE fornecer um campo de entrada independente de **Subtexto** na barra lateral esquerda para cada slide.
- **FR-009**: O sistema DEVE renderizar o subtexto logo abaixo do texto principal com diferenciação hierárquica e proporções tipográficas balanceadas.
- **FR-010**: O sistema DEVE disponibilizar um catálogo de **Templates Visuais de Slide** selecionáveis na barra lateral esquerda para o slide ativo, incluindo no mínimo:
  - *Classic Card* (Layout padrão equilibrado para leitura direta);
  - *Editorial Quote* (Layout com aspas decorativas e tipografia de impacto para citações e reflexões);
  - *Bullet List* (Layout com marcadores bioluminescentes para listas e passos práticos);
  - *Big Stat* (Layout de destaque para números, métricas e porcentagens com subtexto explicativo);
  - *Minimalist Focus* (Layout amplo com respiro visual e foco essencial no argumento).
- **FR-011**: O sistema DEVE permitir aplicar o template selecionado exclusivamente ao slide ativo ou, opcionalmente, estendê-lo a todos os slides do carrossel com um clique.
- **FR-012**: O sistema DEVE persistir as novas propriedades (texto bruto atualizado, subtexto de cada slide, template de cada slide, selo verificado e formato do avatar) continuamente no IndexedDB local do navegador.
- **FR-013**: O sistema DEVE disponibilizar opções adicionais de temas de cores com estética *Clean* e minimalista (ex: *Clean Ivory/Paper*, *Minimalist Slate*, *Dark Clean Minimal*), mantendo todas as opções de temas já existentes disponíveis para seleção.
- **FR-014**: O sistema DEVE refatorar a paleta de cor azul dos slides para um **Azul Celestial** autêntico, vivo e luminoso (celestial sky blue vibrante), garantindo presença marcante e contraste nítido em vez de tons opacos/acinzentados.
- **FR-015**: O sistema DEVE disponibilizar arquitetura e slot de tema personalizável/predefinido preparado para paletas harmonizadas inspiradas em referências visuais e imagens de exemplo.

---

### Key Entities *(include if feature involves data)*

- **Roteiro Bruto do Workspace (`rawScript`)**: Texto completo centralizado que alimenta o particionamento em lote da sequência de slides.
- **Subtexto do Slide (`subtext`)**: Propriedade textual secundária que acompanha o conteúdo principal do slide.
- **Template do Slide (`slideTemplate`)**: Identificador de layout visual (`'classic' | 'quote' | 'bullets' | 'stat' | 'minimalist'`) que governa ornamentos, alinhamentos e estilo do cartão.
- **Perfil Aprimorado (`CreatorProfile`)**: Reúne nome, @handle, foto de perfil, `hasVerifiedBadge` (booleano) e `avatarShape` (`'circle' | 'square'`).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário consegue substituir o roteiro bruto por inteiro e regenerar todos os slides do carrossel diretamente da barra lateral esquerda em menos de 3 segundos no modo local.
- **SC-002**: A alternância do formato da foto (redonda vs quadrada) e do selo verificado reflete nos slides do palco em menos de 50 milissegundos.
- **SC-003**: 100% dos slides com subtexto preenchido apresentam hierarquia visual clara e legível sem sobreposição de textos ou elementos gráficos.
- **SC-004**: A troca entre templates de slide opera de maneira não-destrutiva: trocar de template altera o arranjo visual preservando integralmente o texto, subtexto e imagens do slide.
- **SC-005**: 100% das novas configurações (subtextos, templates, selo verificado e corte de foto) são mantidas após recarregamento da página (F5) via salvamento automático no IndexedDB.

---

## Assumptions

- O subtexto é um campo opcional: slides sem subtexto mantêm diagramação harmoniosa sem espaçamento fantasma.
- O formato quadrado do avatar utiliza cantos ligeiramente arredondados (squircle moderno de 6px a 8px de raio) para consistência com o design system do projeto.
- O selo verificado utiliza estilo vetorial compatível com os tokens bioluminescentes do tema ativo (ciano/azul).
- A regeneração por texto bruto mantém as configurações globais (fontes, branding do autor e tema) intocadas, substituindo apenas os blocos de conteúdo dos slides.
