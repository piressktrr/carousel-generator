# Feature Specification: Slide Templates, Subtext, Enhanced Creator Branding & Studio Layout Refinement

**Feature Branch**: `003-slide-templates-branding`

**Created**: 2026-09-05 | **Updated**: 2026-09-06

**Status**: Ready for Planning

**Input**: User description: "Antes de dar push para o GitHub, vamos implementar mais algumas coisas aqui e arrumar outras. Essa parte do roteiro pode jogar para uma barra lateral direita. Me permita também ocultar essas barras laterais, tanto a direita quanto a esquerda, como ficar. Tira ali a parte de PDF, que está ali de exportar para PDF, aquilo ali eu não vou usar, não precisa. Falando ali da parte dos slides, que está na lateral esquerda ali, acho que está tudo certo por enquanto. Tira o tipo de slide, na verdade, tira o tipo de slide ali de onde está o texto principal, subtexto, que pode editar. Tira aquele negócio de tipo de slide ali embaixo. E na fonte, na aba de fonte ali, separa a paleta de cores e estilo visual dessa fonte. Cria outra etapa para a paleta de cores e estilo visual. Além disso, arruma os templates dos slides que o único que está funcionando é o cartão clássico, citação editorial e o de minimalista lá foco. Sinceramente não precisa o de lista com marcadores e o de destaque numérico não estão funcionando."

## Clarifications

### Session 2026-09-05
- Q: Como deve funcionar a substituição do texto bruto completo? → A: Editor de Roteiro Bruto Integrado com atualização em lote adaptativa.
- Q: Ao colar um novo roteiro bruto e acionar a regeneração em lote, como o sistema deve tratar imagens e ícones secundários anteriores? → A: Preservação Posicional (imagens ancoradas, split ratios e overlays da grade 3x3 são transferidos nos novos slides correspondentes ao mesmo índice ordinal).
- Q: Quais formatos de foto de perfil devem ser disponibilizados e onde o selo verificado deve ser exibido? → A: Seletor de Formato (Redonda vs. Quadrada) e Selo Verificado em Destaque ao lado do nome.
- Q: Como o campo de subtexto deve se integrar com o texto principal nos slides? → A: Campo Independente com Hierarquia Tipográfica (título principal em destaque + subtexto de apoio subordinado).

### Session 2026-09-06 (Refinamentos de Layout e Escopo)
- Q: Onde deve ficar o editor de roteiro bruto e como gerenciar o espaço visual da tela? → A: Barra Lateral Direita dedicada para o Roteiro, com botões de alternância (toggle) para ocultar ou exibir tanto a barra esquerda quanto a barra direita livremente.
- Q: Quais formatos de exportação devem permanecer disponíveis? → A: Somente exportação de alta resolução em imagens PNGs empacotadas em arquivo ZIP; o botão de exportação para PDF é removido.
- Q: Quais templates de slide devem ser mantidos no catálogo curado? → A: Exclusivamente os 3 layouts comprovados e estáveis: Cartão Clássico (`classic`), Citação Editorial (`quote`) e Minimalista Foco (`minimalist`). Os formatos de lista e numérico são descartados do seletor.
- Q: Como organizar as opções de estilo na barra esquerda? → A: Desacoplamento da aba de Fonte: uma aba dedicada para Paleta de Cores & Temas Visuais (com destaque em Azul Celestial e temas Clean) e uma aba exclusiva para Tipografia/Fontes.
- Q: O seletor "Tipo de Slide" (capa/conteúdo/cta) deve permanecer na aba de edição de texto? → A: Não. Deve ser completamente removido, simplificando a interface para foco exclusivo em texto principal e subtexto.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Barra Lateral Direita para Roteiro Bruto & Ocultação de Painéis Laterais (Priority: P1)

Como criador de conteúdo no estúdio, quero ter um painel dedicado no lado direito da tela para visualizar e editar o texto bruto do roteiro completo com ação de regeneração em lote, e quero poder ocultar e exibir tanto a barra esquerda quanto a direita, para focar totalmente na visualização do carrossel no palco central com espaço máximo.

**Why this priority**: Melhora drasticamente a ergonomia do workspace. Separa as ferramentas de customização visual (esquerda) do conteúdo bruto (direita) e dá liberdade para trabalhar em tela cheia.

**Independent Test**: Clicar no botão de toggle da barra direita para abrir o editor de roteiro, colar um novo texto, clicar em "Atualizar Slides" e conferir os slides atualizados; depois, alternar os botões de ocultar para fechar ambas as barras laterais e verificar que o palco de slides ocupa toda a extensão horizontal.

**Acceptance Scenarios**:
1. **Given** o estúdio aberto, **When** o usuário clica no botão de alternância da barra direita, **Then** o painel de Roteiro Bruto abre na lateral direita com o texto completo do projeto.
2. **Given** o usuário editando na barra direita, **When** clica em "Atualizar Slides pelo Roteiro", **Then** todos os slides são recalculados com preservação posicional de imagens e overlays.
3. **Given** qualquer das barras laterais abertas (esquerda ou direita), **When** o usuário clica no botão de recolher/ocultar correspondente, **Then** a barra se recolhe suavemente liberando espaço horizontal para o palco central.

---

### User Story 2 - Identidade Aprimorada: Selo Verificado e Avatar Squircle (Priority: P1)

Como autor, quero cadastrar meu nome e arroba, marcar a opção de selo verificado e selecionar se minha foto de perfil será redonda ou quadrada (squircle suave), tudo na aba de Perfil, para que a assinatura do carrossel represente com autoridade minha presença digital.

**Why this priority**: Requisito essencial de branding e estética para publicações em redes sociais.

**Independent Test**: Na aba Perfil da barra esquerda, ativar "Selo Verificado" e selecionar foto "Quadrada"; verificar visualmente no rodapé de autoria do slide o selo azul celestial ao lado do nome e o corte squircle no avatar.

**Acceptance Scenarios**:
1. **Given** o perfil com selo verificado ativado, **When** exibido no slide, **Then** a insígnia oficial de verificado é renderizada ao lado do nome de exibição em linha sem quebra.
2. **Given** o seletor de formato de foto, **When** o usuário escolhe "Quadrada", **Then** o avatar adota cantos squircle arredondados de 8px; quando escolhe "Redonda", adota formato circular clássico.

---

### User Story 3 - Edição Focada com Subtexto (Sem Dropdown de Tipo de Slide) (Priority: P1)

Como usuário, quero editar o texto principal e o subtexto de apoio de cada slide sem a distração do campo técnico de "Tipo de Slide", para ter uma interface limpa, rápida e concentrada no conteúdo relevante.

**Why this priority**: Remove sobrecarga cognitiva e controles desnecessários que não agregavam valor visual ao fluxo criativo.

**Independent Test**: Abrir a aba "Slide" na barra esquerda, constatar que o dropdown de "Tipo de Slide" foi removido, preencher o campo de subtexto e constatar que ele é exibido perfeitamente subordinado ao texto principal.

**Acceptance Scenarios**:
1. **Given** a aba de Slide da barra esquerda, **When** examinada pelo usuário, **Then** contém apenas o campo de Texto Principal, o campo de Subtexto independente e as ações de mover/adicionar/excluir, sem o seletor de Tipo de Slide.
2. **Given** um slide com subtexto preenchido, **When** renderizado, **Then** apresenta contraste harmônico e hierarquia proporcional em relação ao texto principal.

---

### User Story 4 - Seleção dos 3 Templates Visuais Estáveis (Priority: P1)

Como criador, quero selecionar entre os 3 templates visuais funcionais e curados (*Cartão Clássico*, *Citação Editorial* e *Minimalista Foco*) para o slide ativo ou aplicar a todos, sabendo que os templates entregam acabamento impecável.

**Why this priority**: Foca o produto nos layouts estáveis e de alto valor que funcionam com excelência, eliminando opções quebradas ou ruidosas.

**Independent Test**: Na aba de Slide, alternar entre os 3 templates (Clássico, Citação Editorial e Minimalista) e verificar que cada um reflete seus atributos visuais (aspas estilizadas na citação, respiro no minimalista, equilíbrio no clássico).

**Acceptance Scenarios**:
1. **Given** o seletor de templates na aba de Slide, **When** aberto, **Then** exibe exatamente os 3 templates curados: *Cartão Clássico*, *Citação Editorial* e *Minimalista Foco*.
2. **Given** a seleção de *Citação Editorial*, **When** visualizado no palco, **Then** o slide renderiza aspas decorativas estilizadas e tipografia de impacto.
3. **Given** o botão "Aplicar a todos os slides", **When** clicado, **Then** todos os slides passam a utilizar o template selecionado mantendo intactos seus textos e mídias.

---

### User Story 5 - Aba Dedicada para Paleta de Cores e Estilo Visual (Priority: P1)

Como criador, quero dispor de uma aba específica e dedicada na barra lateral esquerda para Paleta de Cores & Temas (com opções *Clean* e *Azul Celestial*), totalmente separada da aba de Fontes, para organizar minhas escolhas visuais de maneira clara e intuitiva.

**Why this priority**: Desacopla a escolha de cores/temas da escolha de famílias de fontes, proporcionando uma navegação mais organizada e ergonômica.

**Independent Test**: Clicar na nova aba "Cores / Temas" na barra esquerda e verificar a grade completa com os temas *Clean Ivory*, *Scandinavian Slate*, *Azul Celestial* e demais opções; clicar na aba "Fontes" e verificar exclusivamente os controles de tipografia.

**Acceptance Scenarios**:
1. **Given** a navegação da barra lateral esquerda, **When** visualizada, **Then** apresenta abas distintas para "Cores" (Paleta de Cores & Temas) e "Fonte" (Família Tipográfica).
2. **Given** a aba de Cores aberta, **When** o usuário clica em "Azul Celestial" ou "Clean Ivory", **Then** o tema é aplicado instantaneamente ao carrossel e salvo no IndexedDB.

---

### User Story 6 - Exportação Simplificada Apenas em Imagens PNGs em Alta Resolução (Priority: P2)

Como criador, quero baixar meu carrossel em imagens PNG de alta resolução agrupadas em um arquivo ZIP com um único clique, sem botões de exportação em PDF que poluem a barra de ferramentas.

**Why this priority**: Elimina recursos não utilizados solicitados para remoção, mantendo a barra de ações limpa e objetiva.

**Independent Test**: Observar o canto superior direito do palco de slides e confirmar que apenas o botão "Baixar PNGs (ZIP)" está visível; clicar nele e validar o download do pacote compactado com as imagens renderizadas.

**Acceptance Scenarios**:
1. **Given** a barra de exportação no topo direito, **When** renderizada, **Then** exibe exclusivamente a opção de download em imagens PNG (ZIP), sem presença de botão de exportação em PDF.
2. **Given** o clique em "Baixar PNGs (ZIP)", **When** o processamento finaliza, **Then** o arquivo .zip com todos os slides é baixado com fidelidade gráfica total.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE disponibilizar o editor de roteiro bruto completo em uma **Barra Lateral Direita** dedicada.
- **FR-002**: O sistema DEVE fornecer controles de alternância (toggle) que permitam recolher e expandir tanto a barra lateral esquerda quanto a barra lateral direita de forma independente.
- **FR-003**: O sistema DEVE permitir a edição e colagem de texto bruto na barra lateral direita com botão de "Atualizar Slides pelo Roteiro", preservando mídias ancoradas e overlays por índice ordinal.
- **FR-004**: O sistema DEVE fornecer na aba de perfil da barra esquerda um controle para ligar ou desligar o **Selo Verificado**.
- **FR-005**: O sistema DEVE renderizar a insígnia gráfica de verificado em azul celestial ao lado do nome do autor nos slides sempre que a opção estiver ativada.
- **FR-006**: O sistema DEVE fornecer um seletor visual na barra esquerda para definir o formato do avatar entre **Redonda** (`rounded-full`) e **Quadrada** (squircle `rounded-xl`).
- **FR-007**: O sistema DEVE fornecer um campo independente de **Subtexto** na aba de slide da barra esquerda.
- **FR-008**: O sistema DEVE REMOVER o seletor de "Tipo de Slide" da aba de slide, simplificando a interface.
- **FR-009**: O sistema DEVE disponibilizar um catálogo curado contendo exatamente **3 Templates Visuais de Slide**: *Cartão Clássico* (`classic`), *Citação Editorial* (`quote`) e *Minimalista Foco* (`minimalist`), removendo as opções de lista e big stat.
- **FR-010**: O sistema DEVE permitir aplicar o template selecionado ao slide ativo ou estendê-lo a todos os slides do carrossel.
- **FR-011**: O sistema DEVE disponibilizar uma aba dedicada exclusivamente a **Paleta de Cores & Temas Visuais** na barra esquerda, separada da aba de tipografia/fontes.
- **FR-012**: O sistema DEVE disponibilizar opções de temas *Clean* (*Clean Ivory*, *Scandinavian Slate*, *Light Clean*) e a paleta reformulada em **Azul Celestial** vívido (`#00A3FF` / `#00D2FF`).
- **FR-013**: O sistema DEVE REMOVER o botão de exportação para PDF da barra de ferramentas, mantendo exclusivamente o botão de exportação em pacote ZIP contendo as imagens PNG de alta resolução.
- **FR-014**: O sistema DEVE persistir todas as configurações no IndexedDB local do navegador.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário consegue recolher ambas as barras laterais, expandindo o espaço útil do canvas central em 100% da largura útil disponível.
- **SC-002**: A barra de exportação contém 1 único botão primário de ação ("Baixar PNGs (ZIP)"), eliminando confusões de exportação.
- **SC-003**: 100% dos 3 templates visuais (*Clássico*, *Citação Editorial* e *Minimalista Foco*) renderizam fielmente com estética polida sem quebras de layout.
- **SC-004**: A navegação da barra esquerda possui abas específicas para "Cores" e "Fontes", permitindo alternância com 1 clique.
- **SC-005**: A regeneração de slides pela barra lateral direita atualiza todos os slides mantendo 100% das imagens ancoradas nos mesmos índices em menos de 3 segundos localmente.
