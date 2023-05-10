import { createContext, useContext } from 'solid-js';

import { Workout } from '../gql/graphql';

export const CurrentWorkoutContext = createContext<Workout>();

export const useCurrentWorkout = () => {
  const context = useContext(CurrentWorkoutContext);
  if (!context) {
    throw new ReferenceError('useCurrentWorkout must be used within a CurrentWorkoutProvider');
  }
  return context;
};
