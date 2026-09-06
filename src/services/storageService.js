/**
 * Storage Service (Offline-First via IndexedDB)
 * Implements pure asynchronous local persistence using idb-keyval.
 */
import { get, set, del } from 'idb-keyval';

const WORKSPACE_KEY = 'carousel-active-workspace';
const PROFILE_KEY = 'carousel-profile';

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
      return {
        ...data,
        rawScript: data.rawScript || '',
        branding: {
          ...data.branding,
          hasVerifiedBadge: data.branding?.hasVerifiedBadge ?? false,
          avatarShape: data.branding?.avatarShape || 'circle'
        },
        slides: Array.isArray(data.slides)
          ? data.slides.map(s => ({
              ...s,
              subtext: s.subtext || '',
              slideTemplate: s.slideTemplate || 'classic'
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
        avatarShape: profile.avatarShape || 'circle'
      };
    } catch (err) {
      console.error('[storageService] Erro ao carregar perfil do IndexedDB:', err);
      return null;
    }
  }
};
