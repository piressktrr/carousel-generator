/**
 * Workspace Service
 * Core domain operations for slides, docking, 9-point grid overlays, raw script regeneration, and project state.
 * Implements pure functions respecting immutability and Single Responsibility Principle (SRP).
 */
import { aiService } from './aiService.js';
import { segmentTextToSlides } from './textSegmenter.js';

export const workspaceService = {
  /**
   * Converte o roteiro bruto em uma sequência estruturada e adaptativa de slides via IA.
   * @param {string} rawScript - Texto livre do roteiro
   * @param {string|null} [apiKey] - Chave opcional da API do Gemini
   * @returns {Promise<Array<Object>>} Lista de slides gerados
   */
  async generateSlidesFromScript(rawScript, apiKey = null) {
    return await aiService.generateSlides(rawScript, apiKey);
  },

  /**
   * Regenera em lote a lista de slides pelo roteiro bruto completo com preservação posicional.
   * Transfere imagens ancoradas (docking) e overlays secundários para o novo slide do mesmo índice.
   * @param {string} rawScript - Texto bruto do roteiro
   * @param {Array<Object>} [existingSlides=[]] - Lista atual de slides antes da regeneração
   * @returns {Array<Object>} Nova lista de slides re-segmentados com mídias preservadas
   */
  regenerateSlidesFromRawScript(rawScript, existingSlides = []) {
    const parsedSlides = segmentTextToSlides(rawScript);
    if (!parsedSlides || parsedSlides.length === 0) {
      return existingSlides.length > 0 ? existingSlides : [
        {
          id: 'slide-1',
          order: 1,
          type: 'cover',
          content: rawScript ? rawScript.trim() : 'Slide inicial pronto para personalização...',
          subtext: '',
          slideTemplate: 'classic',
          fontOverride: null,
          showBranding: true,
          dockedImage: null,
          overlays: []
        }
      ];
    }

    // Preservação Posicional: transfere dockedImage, overlays e personalizações conforme índice ordinal
    return parsedSlides.map((slide, index) => {
      const prev = existingSlides[index];
      return {
        ...slide,
        id: prev?.id || slide.id,
        subtext: prev?.subtext || '',
        slideTemplate: prev?.slideTemplate || 'classic',
        dockedImage: prev?.dockedImage || null,
        overlays: prev?.overlays || [],
        fontOverride: prev?.fontOverride || null,
        showBranding: prev?.showBranding !== undefined ? prev.showBranding : true
      };
    });
  },

  /**
   * Atualiza as propriedades de autoria do criador (incluindo selo verificado e formato do avatar).
   * @param {Object} currentBranding - Perfil atual
   * @param {Object} updates - Novos atributos
   * @returns {Object} Perfil atualizado
   */
  updateCreatorBranding(currentBranding, updates = {}) {
    const current = currentBranding || {
      name: 'Seu Nome',
      handle: '@seuperfil',
      avatarUrl: null,
      hasVerifiedBadge: false,
      avatarShape: 'circle'
    };
    return {
      ...current,
      ...updates,
      hasVerifiedBadge: updates.hasVerifiedBadge !== undefined ? Boolean(updates.hasVerifiedBadge) : Boolean(current.hasVerifiedBadge),
      avatarShape: updates.avatarShape || current.avatarShape || 'circle'
    };
  },

  /**
   * Atualiza o template visual de um slide específico.
   * @param {Array<Object>} slides - Lista atual
   * @param {string} slideId - ID do slide
   * @param {string} templateId - ID do template ('classic'|'quote'|'bullets'|'stat'|'minimalist')
   * @returns {Array<Object>}
   */
  updateSlideTemplate(slides, slideId, templateId) {
    if (!Array.isArray(slides)) return [];
    return slides.map(slide => {
      if (slide.id === slideId) {
        return {
          ...slide,
          slideTemplate: templateId
        };
      }
      return slide;
    });
  },

  /**
   * Aplica um template visual a todos os slides do carrossel uniformemente.
   * @param {Array<Object>} slides - Lista atual
   * @param {string} templateId - ID do template
   * @returns {Array<Object>}
   */
  applyTemplateToAllSlides(slides, templateId) {
    if (!Array.isArray(slides)) return [];
    return slides.map(slide => ({
      ...slide,
      slideTemplate: templateId
    }));
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
      subtext: '',
      slideTemplate: 'classic',
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
