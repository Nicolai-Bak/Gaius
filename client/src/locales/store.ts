import { i18n } from 'i18next';
import { createStore } from 'solid-js/store';

export const createLocale = (i18n: i18n) => {
  const [store, setStore] = createStore({
    ...i18n,
    t: i18n.t.bind({}),
  });
  const updateStore = (i18n: i18n) => {
    setStore({
      ...i18n,
      t: i18n.t.bind({}),
    });
  };
  return [store, updateStore] as const;
};
