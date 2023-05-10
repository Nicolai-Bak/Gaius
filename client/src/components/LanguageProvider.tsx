import i18next from 'i18next';
import { createSignal, FlowComponent, onMount, Show } from 'solid-js';

import { defaultI18n } from '../locales/config';
import { LocaleContext } from '../locales/context';
import { createLocale } from '../locales/store';

export const LanguageProvider: FlowComponent = (props) => {
  const [isLoaded, setIsLoaded] = createSignal(false);
  const [localeState, updateLocaleState] = createLocale(i18next);

  onMount(async () => {
    await defaultI18n;
    updateLocaleState(i18next);
    setIsLoaded(true);
  });

  const handleOnChangeLanguage = (lang: string) => {
    i18next.changeLanguage(lang).then(() => {
      updateLocaleState(i18next);
    });
  };

  return (
    <Show when={isLoaded()}>
      <LocaleContext.Provider
        value={{ i18n: localeState, handleOnChangeLanguage }}
      >
        {props.children}
      </LocaleContext.Provider>
    </Show>
  );
};
