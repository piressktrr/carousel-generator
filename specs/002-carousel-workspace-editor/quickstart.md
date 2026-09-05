# Quickstart & E2E Validation Guide: Carousel Studio Workspace

**Feature**: `002-carousel-workspace-editor`  
**Date**: 2026-09-05  
**Spec**: [spec.md](file:///D:/Carrosseis-Generator/specs/002-carousel-workspace-editor/spec.md) | **Plan**: [plan.md](file:///D:/Carrosseis-Generator/specs/002-carousel-workspace-editor/plan.md)

---

## 1. Pré-Requisitos e Inicialização

Certifique-se de estar na branch `002-carousel-workspace-editor` e com as dependências instaladas:

```bash
# Instalar dependências (incluindo lucide-react para o catálogo de ícones)
npm install lucide-react

# Iniciar o servidor local de desenvolvimento
npm run dev
```

Acesse no navegador: `http://localhost:3000/`.

---

## 2. Cenários de Validação de Ponta a Ponta

### Cenário 1: Ingestão de Roteiro e Apresentação do Estúdio
1. Abra a aplicação.
2. Na tela inicial de boas-vindas, cole o seguinte roteiro no campo de texto:
   ```text
   5 Hábitos para Turbinar sua Produtividade em 2026

   1. Bloqueio de Tempo: reserve blocos de foco absoluto sem notificações.
   2. Regra dos 2 Minutos: se leva menos de 2 minutos, faça agora.
   3. Planejamento Noturno: defina suas 3 prioridades na noite anterior.
   4. Descanso Ativo: caminhe ou faça pausas regulares longe da tela.

   Qual desses hábitos você vai implementar hoje? Comente abaixo e salve o post!
   ```
3. Clique no botão **"Gerar Slides"**.
4. **Resultado Esperado**:
   - O sistema divide o roteiro em 6 slides sequenciais (Capa, 4 Conteúdos e 1 CTA de fechamento).
   - O ambiente transiciona para o **Studio Workspace**, com a **Barra Lateral de Ferramentas fixada à esquerda** e os **slides organizados no palco à direita**.

---

### Cenário 2: Ancoragem Estruturada de Imagem (Docking)
1. No palco de slides, clique no **Slide 2**.
2. Na barra lateral esquerda (na aba *Imagem do Slide*), faça o upload de uma imagem.
3. Teste os 4 modos de ancoragem clicando nos botões de layout:
   - **Em cima (Superior)**: A imagem se posiciona no topo do slide e o texto fica abaixo.
   - **Embaixo (Inferior)**: O texto fica no topo e a imagem na base.
   - **Metade Esquerda (Split)**: O slide se divide em duas colunas verticais (imagem à esquerda, texto à direita).
   - **Metade Direita (Split)**: Imagem à direita, texto à esquerda.
4. Mova o controle de escala para aumentar e diminuir o zoom da imagem.
5. **Resultado Esperado**: A imagem se redimensiona e reposiciona instantaneamente sem distorcer o aspect ratio e sem sobrepor o texto.

---

### Cenário 3: Inserção de Ícones e Elementos Secundários (Grade 3x3)
1. No **Slide 1 (Capa)**, localize a seção *Ícones e Elementos* na barra lateral esquerda.
2. Selecione o ícone de **Foguete** ou **Fogo** no catálogo nativo de ícones.
3. Clique na âncora **Topo Direito** da grade 3x3.
4. Altere o tamanho do ícone pelo controle deslizante para `64px`.
5. **Resultado Esperado**: O ícone aparece exatamente no canto superior direito do slide 1 com tamanho de 64px e cores harmoniosas com o tema.

---

### Cenário 4: Customização Tipográfica (Global e Override)
1. Na seção *Tipografia* da barra lateral esquerda, altere a fonte global para **"Space Grotesk"** ou **"Playfair Display"**.
2. **Resultado Esperado**: Todos os 6 slides passam a exibir seus textos com a nova tipografia instantaneamente.
3. No **Slide 1 (Capa)**, ative a opção *"Personalizar fonte apenas neste slide"* e escolha outra fonte (ex: *Playfair Display*).
4. **Resultado Esperado**: O slide 1 assume a fonte exclusiva, enquanto os slides 2 a 6 continuam com a fonte global.

---

### Cenário 5: Controle Granular de Identidade do Criador e Autosave
1. Na seção *Branding do Criador* da barra esquerda, preencha o Nome e o `@handle` (ex: `@dev.produtivo`).
2. Todos os slides passam a exibir o `@dev.produtivo`.
3. Com o **Slide 1** selecionado, desmarque a caixa *"Exibir Foto e @ no slide ativo"*.
4. **Resultado Esperado**: O Slide 1 oculta a identificação, enquanto os Slides 2 a 6 mantêm o `@dev.produtivo` visível.
5. Pressione `F5` (recarregar página).
6. **Resultado Esperado**: O carrossel reabre exatamente com todas as customizações (imagens, ícones, fontes e visibilidade) preservadas pelo salvamento contínuo no IndexedDB.
