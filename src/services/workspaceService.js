/**
 * Workspace Service
 * Core domain operations for slides, docking, 9-point grid overlays, and project state.
 * Implements pure functions respecting immutability and Single Responsibility Principle (SRP).
 */
import { aiService } from './aiService.js';

export const workspaceService = {
  /**
   * Converte o roteiro bruto em uma sequência estruturada e adaptativa de slides.
   * @param {string} rawScript - Texto livre do roteiro
   * @param {string|null} [apiKey] - Chave opcional da API do Gemini
   * @returns {Promise<Array<Object>>} Lista de slides gerados
   */
  async generateSlidesFromScript(rawScript, apiKey = null) {
    return await aiService.generateSlides(rawScript, apiKey);
  },

  /**
   * Atualiza as propriedades de um slide específico preservando imutabilidade.
   * @param {Array<Object>} slides - Lista atual de slides
   * @param {string} slideId - ID do slide a modificar
   * @param {Object} changes - Atributos a mesclar no slide
   * @returns {Array<Object>} Nova lista de slides atualizada
   */
  updateSlide(slides, slideId, changes) {
    if (!Array.isArray(slides)) return [];
    return slides.map(slide => {
      if (slide.id === slideId) {
        return {
          ...slide,
          ...changes
        };
      }
      return slide;
    });
  },

  /**
   * Adiciona um novo slide na sequência (no final ou após um índice).
   * @param {Array<Object>} slides - Lista atual
   * @param {number|null} [afterIndex=null] - Índice opcional após o qual inserir
   * @returns {Array<Object>}
   */
  addSlide(slides, afterIndex = null) {
    const list = Array.isArray(slides) ? [...slides] : [];
    const newId = `slide-${Date.now()}`;
    const newSlide = {
      id: newId,
      order: list.length + 1,
      type: 'content',
      content: 'Novo slide pronto para personalização...',
      fontOverride: null,
      showBranding: true,
      dockedImage: null,
      overlays: []
    };

    if (afterIndex !== null && afterIndex >= 0 && afterIndex < list.length) {
      list.splice(afterIndex + 1, 0, newSlide);
    } else {
      list.push(newSlide);
    }

    // Re-indexa a propriedade order
    return list.map((s, idx) => ({ ...s, order: idx + 1 }));
  },

  /**
   * Remove um slide da lista por ID e reordena os demais.
   * @param {Array<Object>} slides
   * @param {string} slideId
   * @returns {Array<Object>}
   */
  removeSlide(slides, slideId) {
    if (!Array.isArray(slides) || slides.length <= 1) {
      return slides; // Mantém no mínimo 1 slide
    }
    const filtered = slides.filter(s => s.id !== slideId);
    return filtered.map((s, idx) => ({ ...s, order: idx + 1 }));
  },

  /**
   * Anexa ou atualiza a imagem principal ancorada de um slide.
   * @param {Object} slide - Slide ativo
   * @param {string} imageSrc - Base64 ou URL da imagem
   * @param {'top'|'bottom'|'left'|'right'} [position='top'] - Modo de ancoragem
   * @param {number} [scale=1.0] - Escala da imagem (0.5 a 2.0)
   * @returns {Object} Novo objeto de slide com dockedImage configurada
   */
  setDockedImage(slide, imageSrc, position = 'top', scale = 1.0) {
    if (!slide) return slide;
    return {
      ...slide,
      dockedImage: {
        src: imageSrc,
        position,
        scale: Number(scale) || 1.0
      }
    };
  },

  /**
   * Remove a imagem ancorada do slide.
   * @param {Object} slide - Slide ativo
   * @returns {Object} Slide sem imagem principal
   */
  removeDockedImage(slide) {
    if (!slide) return slide;
    return {
      ...slide,
      dockedImage: null
    };
  },

  /**
   * Insere um novo elemento gráfico secundário (ícone ou imagem menor) no slide.
   * @param {Object} slide - Slide ativo
   * @param {'icon'|'image'} type - Tipo do elemento
   * @param {string} asset - Nome do ícone (lucide) ou Base64 da imagem
   * @param {string} [anchor='top-right'] - Uma das 9 posições de grade
   * @param {number} [size=48] - Tamanho em pixels
   * @param {string} [color] - Cor opcional para ícones
   * @returns {Object} Slide com o novo overlay adicionado
   */
  addOverlay(slide, type, asset, anchor = 'top-right', size = 48, color = null) {
    if (!slide) return slide;
    const currentOverlays = Array.isArray(slide.overlays) ? [...slide.overlays] : [];
    
    // Limite ergonômico seguro de até 5 overlays por slide conforme plan.md
    if (currentOverlays.length >= 5) {
      console.warn('[workspaceService] Limite máximo de 5 overlays secundários por slide atingido.');
      return slide;
    }

    const newOverlay = {
      id: `overlay-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      iconName: asset,
      anchor,
      size: Number(size) || 48,
      color: color || undefined
    };

    return {
      ...slide,
      overlays: [...currentOverlays, newOverlay]
    };
  },

  /**
   * Atualiza propriedades de um overlay existente (posição na grade, tamanho ou cor).
   * @param {Object} slide - Slide ativo
   * @param {string} overlayId - ID do overlay
   * @param {Object} changes - Novos atributos do overlay
   * @returns {Object} Slide com o overlay atualizado
   */
  updateOverlay(slide, overlayId, changes) {
    if (!slide || !Array.isArray(slide.overlays)) return slide;
    return {
      ...slide,
      overlays: slide.overlays.map(ov => {
        if (ov.id === overlayId) {
          return {
            ...ov,
            ...changes
          };
        }
        return ov;
      })
    };
  },

  /**
   * Remove um overlay secundário do slide.
   * @param {Object} slide - Slide ativo
   * @param {string} overlayId - ID do overlay a remover
   * @returns {Object} Slide sem o overlay especificado
   */
  removeOverlay(slide, overlayId) {
    if (!slide || !Array.isArray(slide.overlays)) return slide;
    return {
      ...slide,
      overlays: slide.overlays.filter(ov => ov.id !== overlayId)
    };
  }
};
