import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';
import axios from 'axios';

Vue.use(VueLocalStorage);

export default {
  namespaced: true,

  state: {
    language: Vue.localStorage.get('language') || 'en',
  },

  mutations: {
    SET_LANGUAGE(state, lang) {
      Vue.localStorage.set('language', lang);
      state.language = lang;
    },
  },

  actions: {
    async setLanguage({ commit }, payload) {
      let selected = 'en';

      if (typeof payload === 'string') {
        selected = payload;
      } else if (Array.isArray(payload)) {
        selected = payload
          .map(l => l.substring(0, 2))
          .find(code => !!code) || 'en';
      }

      // Update localStorage & state
      commit('SET_LANGUAGE', selected);

      // Sync to backend only if user is authenticated (token exists in axios defaults)
      try {
        if (axios.defaults.headers.common['Authorization']) {
          await axios.post(`/languages_setting/set-default/${selected}`);
        }
      } catch (error) {
        // Silently fail — user may not be authenticated yet
        console.warn('Failed to sync default language to backend:', error);
      }
    },
  }

};
