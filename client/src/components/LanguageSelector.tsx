import { Component, createSelector, For } from 'solid-js';

import { useLocale } from '../locales/context';

export const LanguageSelector: Component<{ showFullTitle?: boolean }> = (
  props,
) => {
  const { i18n, handleOnChangeLanguage } = useLocale();

  const isSelected = createSelector(() => i18n.language);
  const availableLocales = () => [
    { title: 'English', code: 'en' },
    { title: 'English-USA', code: 'en-US' },
    { title: 'Dansk', code: 'dk' },
  ];

  return (
    <select
      class="select select-primary"
      onChange={(e) => handleOnChangeLanguage(e.currentTarget.value)}
    >
      <For each={availableLocales()}>
        {(item) => (
          <option
            value={item.code}
            selected={isSelected(item.code)}
            classList={{ active: isSelected(item.code) }}
          >
            {props.showFullTitle ? item.title : item.code}
          </option>
        )}
      </For>
    </select>
  );
};
