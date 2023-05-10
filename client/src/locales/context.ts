import { i18n } from 'i18next';
import { createContext, useContext } from 'solid-js';

export const LocaleContext = createContext<{ i18n: i18n, handleOnChangeLanguage: (lang: string) => void }>();

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new ReferenceError('useLocale must be used within a LocaleProvider');
  }
  return context;
};
