# Quickstart: Validação e Execução do Gerador de Carrosséis

**Feature**: `001-social-carousel-generator`  
**Date**: 2026-09-05  

Este guia detalha o passo a passo para executar e validar de ponta a ponta a aplicação do gerador de carrosséis na web.

---

## 1. Pré-requisitos e Instalação

- **Node.js**: versão 18 ou superior.
- **Gerenciador de Pacotes**: npm ou yarn.

```bash
# Instalar as dependências essenciais do projeto
npm install
```

---

## 2. Executando o Servidor de Desenvolvimento

```bash
# Iniciar o servidor Vite local
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` com Hot Module Replacement (atualizações visuais instantâneas).

---

## 3. Roteiro de Validação de Ponta a Ponta (End-to-End)

Execute os seguintes cenários para comprovar o funcionamento completo de todos os requisitos:

### Cenário 1: Configuração da Identidade do Autor (Branding)
1. No painel lateral ou cabeçalho, localize o formulário de perfil.
2. Faça o upload de uma foto de perfil (avatar).
3. Digite seu nome (ex: `Pedro Henrique`) e seu @ (ex: `@pedrodev`).
4. **Resultado esperado**: O avatar, nome e arroba são renderizados no rodapé de todos os slides do preview em tempo real.

### Cenário 2: Conversão de Texto Bruto em Carrossel
1. Clique no botão **"Novo Carrossel"** ou **"Inserir Texto"**.
2. Cole um texto com 3 a 4 parágrafos (ou artigo de dicas).
3. Clique em **"Gerar Carrossel"** (via IA ou Fallback Local).
4. **Resultado esperado**: O texto é automaticamente distribuído em uma sequência de slides:
   - Slide 1: Capa com título de impacto / gancho;
   - Slides 2 e 3: Tópicos e explicações sintetizadas com boa área de respiro;
   - Slide 4: Slide final com CTA ("Salve este post").

### Cenário 3: Inserção de Imagem Personalizada em Slide Específico
1. Selecione o **Slide 2** no carrossel.
2. Clique em **"Adicionar Imagem"** e escolha uma foto do seu computador.
3. Use o controle deslizante de escala/zoom para enquadrar a imagem.
4. **Resultado esperado**: A imagem é incorporada ao layout do Slide 2 com margens e legibilidade preservadas.

### Cenário 4: Seleção de Temas e Paletas de Cores
1. Abra o seletor de temas visuais.
2. Alterne entre os temas (ex: *Dark Modern*, *Minimalista*, *Editorial*).
3. Altere a cor de destaque (accent color) para a cor da sua preferência.
4. **Resultado esperado**: Todos os slides adotam o novo esquema de cores instantaneamente sem travamento visual.

### Cenário 5: Efeito de Continuidade (Seamless / Carrossel Infinito)
1. Nos slides 2 e 3, ative a opção **"Efeito Contínuo (Seamless)"**.
2. Posicione um elemento gráfico ou imagem na junção entre eles.
3. **Resultado esperado**: A metade esquerda é cortada na borda direita do Slide 2 e se completa perfeitamente na borda esquerda do Slide 3, simulando um painel contínuo ao deslizar.

### Cenário 6: Exportação e Download
1. Escolha a plataforma **Instagram (4:5)** e clique em **"Baixar Imagens (ZIP)"**:
   - O navegador baixa um arquivo `.zip` contendo `slide-01.png`, `slide-02.png`, etc., com resolução de 1080x1350px.
2. Alterne para **LinkedIn** e clique em **"Baixar PDF"**:
   - O navegador baixa um arquivo `.pdf` multipágina com páginas sequenciais no formato de documento oficial do LinkedIn.

### Cenário 7: Validação da Persistência Offline-First (IndexedDB)
1. Recarregue a página (`F5`).
2. **Resultado esperado**: Todos os dados do perfil (foto, nome, arroba), tema selecionado e o carrossel em edição permanecem exatamente intactos.
