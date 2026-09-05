import { get, set } from 'idb-keyval';

const PROFILE_KEY = 'carousel-profile';
const DRAFTS_KEY = 'carousel-drafts';

export const storageService = {
  async saveProfile(profile) {
    await set(PROFILE_KEY, profile);
  },
  
  async getProfile() {
    return (await get(PROFILE_KEY)) || { name: '', handle: '', avatar: null };
  },

  async saveDraft(id, draft) {
    const drafts = (await get(DRAFTS_KEY)) || {};
    drafts[id] = draft;
    await set(DRAFTS_KEY, drafts);
  },

  async getDraft(id) {
    const drafts = (await get(DRAFTS_KEY)) || {};
    return drafts[id] || null;
  },
  
  async getAllDrafts() {
    return (await get(DRAFTS_KEY)) || {};
  }
};
