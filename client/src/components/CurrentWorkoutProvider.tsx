import { createSignal, FlowComponent, onMount, Show } from 'solid-js';

import { CurrentWorkoutContext } from '../currentWorkout/context';
import { createCurrentWorkout } from '../currentWorkout/store';

export const CurrentWorkoutProvider: FlowComponent = (props) => {
  const [isLoaded, setIsLoaded] = createSignal(false);
  const [currentWorkout, updateCurrentWorkout] = createCurrentWorkout();

  onMount(async () => {
    updateCurrentWorkout(null);
    setIsLoaded(true);
  });

  return (
    <Show when={isLoaded()}>
      <CurrentWorkoutContext.Provider value={currentWorkout}>
        {props.children}
      </CurrentWorkoutContext.Provider>
    </Show>
  );
};
