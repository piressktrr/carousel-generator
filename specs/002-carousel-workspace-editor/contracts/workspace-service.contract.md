# Service Contract: Workspace & Slide Editor Service

**Feature**: `002-carousel-workspace-editor`  
**Date**: 2026-09-05  
**Spec**: [spec.md](file:///D:/Carrosseis-Generator/specs/002-carousel-workspace-editor/spec.md)

---

## 1. Contrato do `workspaceService` (Módulo de Operações de Domínio)

Interface JavaScript responsável pela orquestração do estado, estruturação do roteiro e mutações dos slides.

```javascript
export const workspaceService = {
  /**
   * Converte o roteiro bruto em uma sequência estruturada de slides.
   * Aciona IA se configurada, com fallback automático local por parágrafos.
   * @param {string} rawScript - Texto livre do roteiro
   * @param {string|null} [apiKey] - Chave opcional da API do Gemini
   * @returns {Promise<Array<SlideItem>>} Lista de slides gerados
   */
  async generateSlidesFromScript(rawScript, apiKey = null) {},

  /**
   * Atualiza as propriedades de um slide específico preservando imutabilidade.
   * @param {Array<SlideItem>} slides - Lista atual de slides
   * @param {string} slideId - ID do slide a modificar
   * @param {Partial<SlideItem>} changes - Atributos a mesclar no slide
   * @returns {Array<SlideItem>} Nova lista de slides atualizada
   */
  updateSlide(slides, slideId, changes) {},

  /**
   * Anexa ou atualiza a imagem principal ancorada de um slide.
   * @param {SlideItem} slide - Slide ativo
   * @param {string} imageSrc - Base64 ou URL da imagem
   * @param {'top'|'bottom'|'left'|'right'} position - Modo de ancoragem
   * @param {number} scale - Escala da imagem (0.5 a 2.0)
   * @returns {SlideItem} Novo objeto de slide com dockedImage configurada
   */
  setDockedImage(slide, imageSrc, position = 'top', scale = 1.0) {},

  /**
   * Remove a imagem ancorada do slide.
   * @param {SlideItem} slide - Slide ativo
   * @returns {SlideItem} Slide sem imagem principal
   */
  removeDockedImage(slide) {},

  /**
   * Insere um novo elemento gráfico secundário (ícone ou imagem menor) no slide.
   * @param {SlideItem} slide - Slide ativo
   * @param {'icon'|'image'} type - Tipo do elemento
   * @param {string} asset - Nome do ícone (lucide) ou Base64 da imagem
   * @param {GridAnchor} anchor - Uma das 9 posições de grade
   * @param {number} size - Tamanho em pixels
   * @returns {SlideItem} Slide com o novo overlay adicionado
   */
  addOverlay(slide, type, asset, anchor = 'top-right', size = 48) {},

  /**
   * Atualiza propriedades de um overlay existente (posição na grade ou tamanho).
   * @param {SlideItem} slide - Slide ativo
   * @param {string} overlayId - ID do overlay
   * @param {Partial<OverlayItem>} changes - Novos atributos do overlay
   * @returns {SlideItem} Slide com o overlay atualizado
   */
  updateOverlay(slide, overlayId, changes) {},

  /**
   * Remove um overlay secundário do slide.
   * @param {SlideItem} slide - Slide ativo
   * @param {string} overlayId - ID do overlay a remover
   * @returns {SlideItem} Slide sem o overlay especificado
   */
  removeOverlay(slide, overlayId) {}
};
```

---

## 2. Contrato de Persistência `storageService`

```javascript
export const storageService = {
  /**
   * Salva o estado completo do workspace ativo no IndexedDB.
   * @param {WorkspaceState} state - Estado completo atual
   * @returns {Promise<void>}
   */
  async saveWorkspace(state) {},

  /**
   * Recupera o estado ativo do workspace do IndexedDB.
   * @returns {Promise<WorkspaceState|null>}
   */
  async getWorkspace() {},

  /**
   * Reseta e limpa o workspace salvo para iniciar um novo projeto.
   * @returns {Promise<void>}
   */
  async clearWorkspace() {},

  /**
   * Salva o perfil do criador (persistência global).
   * @param {CreatorProfile} profile
   * @returns {Promise<void>}
   */
  async saveProfile(profile) {},

  /**
   * Obtém o perfil do criador salvo.
   * @returns {Promise<CreatorProfile|null>}
   */
  async getProfile() {}
};
```

---

## 3. Contratos de Componentes de Interface (UI Component Specs)

### 3.1. `<StudioWorkspace />`
- **Props**: Nenhuma (Componente de página orquestrador).
- **Layout**: Container de tela cheia `display: flex; height: 100vh; overflow: hidden;`.
- **Filhos**:
  - `<LeftSidebar />`: Largura `380px`, menu retrátil/fixo com abas de customização.
  - `<SlidesCanvas />`: Área flexível com scroll horizontal, renderizando a lista de `<SlideCard />`.

### 3.2. `<LeftSidebar />`
- **Props**:
  - `activeSlide`: Objeto do slide atualmente em foco.
  - `slides`: Lista completa de slides.
  - `globalFont`: Família tipográfica do projeto.
  - `profile`: Perfil do autor.
  - `onUpdateSlide(slideId, changes)`: Callback de mutação do slide.
  - `onUpdateGlobalFont(fontName)`: Callback de tipografia global.
  - `onUpdateProfile(profile)`: Callback de autoria.
  - `onNewProject()`: Callback de reinicialização do roteiro.

### 3.3. `<SlideCard />`
- **Props**:
  - `slide`: Dados do slide (`content`, `dockedImage`, `overlays`, `showBranding`, `fontOverride`).
  - `index`: Índice ordinal.
  - `total`: Total de slides.
  - `globalFont`: Tipografia padrão do projeto.
  - `profile`: Dados do criador.
  - `isActive`: Boolean indicativo de foco de edição.
  - `onSelect()`: Callback disparado ao clicar no slide para focar a barra lateral.
