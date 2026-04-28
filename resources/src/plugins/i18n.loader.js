import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';

Vue.use(VueI18n);

export const loadI18n = async () => {
  const userLang = 'en';

  let dbMessages = {};
  try {
    const response = await axios.get(`translations/en`);
    dbMessages = response.data;
  } catch (error) {
    console.warn("⚠️ Failed to load translations.");
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
