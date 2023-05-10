import { createStore } from 'solid-js/store';

import { Workout } from '../gql/graphql';

export const createCurrentWorkout = () => {
  const [store, setStore] = createStore<Workout>(null);

  const updateStore = (currentWorkout: Workout) => {
    setStore(currentWorkout);
  };

  return [store, updateStore] as const;
};
