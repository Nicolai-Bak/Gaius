import { A } from '@solidjs/router';
import { Component } from 'solid-js';

import { useLocale } from '../locales/context';
import { LanguageSelector } from './LanguageSelector';

export const Header: Component = () => {
  const { i18n } = useLocale();

  return (
    <div class="justify-center navbar-center navbar">
      <a href="/" rel="noopener noreferrer">
        {i18n.t('title')}
      </a>
      <A class="nav" href="/">
        <div class="tab ">Home</div>
      </A>
      <A class="nav" href="/workoutHistory">
        <div class="tab ">History</div>
      </A>
      <A class="nav" href="/settings">
        <div class="tab ">Settings</div>
      </A>
      <LanguageSelector />
    </div>
  );
};
