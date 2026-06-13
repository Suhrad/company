import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';

Vue.use(VueI18n);

export const loadI18n = async () => {
  const userLang = 'en';

  let dbMessages = {};
  try {
    // Add a 1500ms timeout so a slow translation fetch doesn't hang the entire UI initialization
    const response = await axios.get(`translations/en`, { timeout: 1500 });
    dbMessages = response.data;
  } catch (error) {
    console.warn("⚠️ Failed to load translations or request timed out, falling back to local defaults.");
  }

  const messages = {
    en: dbMessages || {}
  };

  const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
    silentTranslationWarn: true,
  });

  return i18n;
};
