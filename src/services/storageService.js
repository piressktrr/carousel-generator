/**
 * Storage Service (Offline-First via IndexedDB)
 * Implements pure asynchronous local persistence using idb-keyval.
 */
import { get, set, del } from 'idb-keyval';

const WORKSPACE_KEY = 'carousel-active-workspace';
const PROFILE_KEY = 'carousel-profile';
const CUSTOM_THEMES_KEY = 'carousel-custom-themes';
const GEMINI_API_KEY = 'gemini-api-key';

export const storageService = {
  /**
   * Salva o estado completo do workspace ativo no IndexedDB.
   * @param {Object} state - Estado completo atual (WorkspaceState)
   * @returns {Promise<void>}
   */
  async saveWorkspace(state) {
    try {
      if (!state) return;
      await set(WORKSPACE_KEY, {
        ...state,
        lastModified: Date.now()
      });
    } catch (err) {
      console.error('[storageService] Erro ao salvar workspace no IndexedDB:', err);
    }
  },

  /**
   * Recupera o estado ativo do workspace do IndexedDB.
   * @returns {Promise<Object|null>}
   */
  async getWorkspace() {
    try {
      const data = await get(WORKSPACE_KEY);
      if (!data) return null;
      const validTemplates = ['classic', 'quote', 'minimalist'];
      return {
        ...data,
        isLeftSidebarOpen: data.isLeftSidebarOpen ?? true,
        isRightSidebarOpen: data.isRightSidebarOpen ?? false,
        aspectRatio: data.aspectRatio === '1:1' ? '1:1' : '4:5',
        rawScript: data.rawScript || '',
        currentTheme: data.currentTheme || 'abyssal-glow',
        customThemes: Array.isArray(data.customThemes) ? data.customThemes : [],
        profile: data.profile
          ? {
              ...data.profile,
              hasVerifiedBadge: data.profile?.hasVerifiedBadge ?? false,
              avatarShape: data.profile?.avatarShape || 'circle',
              position: data.profile?.position || 'bottom-left'
            }
          : undefined,
        branding: {
          ...data.branding,
          hasVerifiedBadge: data.branding?.hasVerifiedBadge ?? false,
          avatarShape: data.branding?.avatarShape || 'circle',
          position: data.branding?.position || 'bottom-left'
        },
        slides: Array.isArray(data.slides)
          ? data.slides.map(s => ({
              ...s,
              subtext: s.subtext || '',
              profilePosition: s.profilePosition !== undefined ? s.profilePosition : null,
              slideTemplate: validTemplates.includes(s.slideTemplate) ? s.slideTemplate : 'classic'
            }))
          : []
      };
    } catch (err) {
      console.error('[storageService] Erro ao recuperar workspace do IndexedDB:', err);
      return null;
    }
  },

  /**
   * Reseta e limpa o workspace salvo para iniciar um novo projeto.
   * @returns {Promise<void>}
   */
  async clearWorkspace() {
    try {
      await del(WORKSPACE_KEY);
    } catch (err) {
      console.error('[storageService] Erro ao limpar workspace do IndexedDB:', err);
    }
  },

  /**
   * Salva a lista global de temas personalizados criados pelo usuário ou IA.
   * @param {Array<Object>} themes - Lista de CustomTheme
   * @returns {Promise<void>}
   */
  async saveCustomThemes(themes) {
    try {
      if (!Array.isArray(themes)) return;
      await set(CUSTOM_THEMES_KEY, themes);
    } catch (err) {
      console.error('[storageService] Erro ao salvar temas customizados:', err);
    }
  },

  /**
   * Recupera a lista global de temas personalizados.
   * @returns {Promise<Array<Object>>}
   */
  async getCustomThemes() {
    try {
      const themes = await get(CUSTOM_THEMES_KEY);
      return Array.isArray(themes) ? themes : [];
    } catch (err) {
      console.error('[storageService] Erro ao recuperar temas customizados:', err);
      return [];
    }
  },

  /**
   * Salva a chave de API do Gemini localmente com segurança.
   * @param {string} apiKey
   * @returns {Promise<void>}
   */
  async saveGeminiApiKey(apiKey) {
    try {
      await set(GEMINI_API_KEY, (apiKey || '').trim());
    } catch (err) {
      console.error('[storageService] Erro ao salvar chave da API do Gemini:', err);
    }
  },

  /**
   * Recupera a chave de API do Gemini salva localmente.
   * @returns {Promise<string>}
   */
  async getGeminiApiKey() {
    try {
      const key = await get(GEMINI_API_KEY);
      return typeof key === 'string' ? key : '';
    } catch (err) {
      console.error('[storageService] Erro ao carregar chave da API do Gemini:', err);
      return '';
    }
  },

  /**
   * Salva o perfil do criador (persistência global de autoria).
   * @param {Object} profile - CreatorProfile
   * @returns {Promise<void>}
   */
  async saveProfile(profile) {
    try {
      if (!profile) return;
      await set(PROFILE_KEY, profile);
    } catch (err) {
      console.error('[storageService] Erro ao salvar perfil no IndexedDB:', err);
    }
  },

  /**
   * Obtém o perfil do criador salvo.
   * @returns {Promise<Object|null>}
   */
  async getProfile() {
    try {
      const profile = await get(PROFILE_KEY);
      if (!profile) return null;
      return {
        ...profile,
        hasVerifiedBadge: profile.hasVerifiedBadge ?? false,
        avatarShape: profile.avatarShape || 'circle',
        position: profile.position || 'bottom-left'
      };
    } catch (err) {
      console.error('[storageService] Erro ao carregar perfil do IndexedDB:', err);
      return null;
    }
  }
};
