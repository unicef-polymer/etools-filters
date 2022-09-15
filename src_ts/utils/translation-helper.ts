// @ts-ignore
import translations from '../../assets/translations.js';

export function getTranslation(lang: string, key: string) {
  try {
    return lang ? translations[lang][key] : translations.en[key];
  } catch (error) {
    return translations.en[key];
  }
}
