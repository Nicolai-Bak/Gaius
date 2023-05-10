import { Component } from 'solid-js';

import { LanguageSelector } from '../components/LanguageSelector';
import { useLocale } from '../locales/context';

//component with input to change language
export const Settings: Component = () => {
  const { i18n } = useLocale();

  return (
    <div>
      <h1>{i18n.t('settings.title')}</h1>

      <div class="flex-row">
        <label>{i18n.t('settings.language')}</label>
        <LanguageSelector showFullTitle={true} />
      </div>
    </div>
  );
};

export default Settings;
