import { Component, For } from 'solid-js';

import { Exercise, Set, Workout } from '../gql/graphql';

export const WorkoutHistoryCard: Component<{ workout: Workout }> = (props) => {
  return (
    <div class="card bg-slate-800 m-3 p-2 shadow-2xl">
      <h2 class="card-title ">{props.workout.title}</h2>
      <For each={props.workout.exercises}>
        {(exercise) => <ExerciseSummary exercise={exercise} />}
      </For>
    </div>
  );
};

export const ExerciseSummary: Component<{ exercise: Exercise }> = (props) => {
  return (
    <div>
      <h3>{props.exercise.name}</h3>
      <For each={props.exercise.sets}>{(set) => <SetSummary set={set} />}</For>
    </div>
  );
};

export const SetSummary: Component<{ set: Set }> = (props) => {
  return (
    <div>
      <p>
        {props.set.weight} lbs x {props.set.reps}
      </p>
    </div>
  );
};
