import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

export const defaultI18n = i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en'],// 'en-US', 'dk'],
    supportedLngs: ['en', 'dk'],
    ns: 'translations',
    defaultNS: 'translations',
    fallbackNS: false,
    debug: true,
    detection: {
      order: ['querystring', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
    },
    backend: {
      loadPath: '/src/locales/{{lng}}/{{ns}}.json',
    },
  }, (err) => {
    if (err) {
      console.error(err);
    }
  });
