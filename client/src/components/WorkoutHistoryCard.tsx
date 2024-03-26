import { Component, For } from 'solid-js';

import { Exercise, Set, Workout } from '../gql/graphql';

export const WorkoutHistoryCard: Component<{ workout: Workout }> = (props) => {
  return (
    <>
      <label
        for="full-workout-modal"
        class="card bg-slate-800 m-3 p-2 shadow-2xl"
      >
        <h2 class="card-title ">{props.workout.title}</h2>
        <table>
          <thead>
            <tr>
              <th class="text-start">Exercise</th>
              <th class="text-end">Best set</th>
            </tr>
          </thead>
          <tbody>
            <For each={props.workout.exercises}>
              {(exercise) => <ExerciseSummary exercise={exercise} />}
            </For>
          </tbody>
        </table>
      </label>

      <FullWorkoutModal workout={props.workout} />
    </>
  );
};

export const FullWorkoutModal: Component<{ workout: Workout }> = (props) => {
  return (
    <>
      <input type="checkbox" id="full-workout-modal" class="modal-toggle" />

      <label for="full-workout-modal" class="modal cursor-pointer">
        <div class="card bg-slate-800 m-3 p-2 shadow-2xl">
          <h2 class="card-title ">{props.workout.title}</h2>
          <table>
            <thead>
              <tr>
                <th class="text-start">Exercise</th>
                <th class="text-end">1RM</th>
              </tr>
            </thead>
            <tbody>
              <For each={props.workout.exercises}>
                {(exercise, i) => (
                  <FullExerciseSummary index={i() + 1} exercise={exercise} />
                )}
              </For>
            </tbody>
          </table>
        </div>
      </label>
    </>
  );
};

export const FullExerciseSummary: Component<{
  index: number;
  exercise: Exercise;
}> = (props) => {
  return (
    <tr>
      <td>{props.exercise.name}</td>
      <td class="text-end">1RM</td>
    </tr>
  );
};

export const ExerciseSummary: Component<{ exercise: Exercise }> = (props) => {
  function calcBestSet(sets: Set[]) {
    let bestSetIndex = 0;
    let bestSet = 0;

    if (sets.length === 0) {
      return '';
    }

    for (let i = 0; i < sets.length; i++) {
      const value = sets[i].weight * sets[i].reps;
      if (value > bestSet) {
        bestSet = value;
        bestSetIndex = i;
      }
    }
    return `${sets[bestSetIndex].weight} x ${sets[bestSetIndex].reps}`;
  }
  return (
    <tr>
      <td>
        {props.exercise.sets.length} x {props.exercise.name}
      </td>
      <td class="text-end">{calcBestSet(props.exercise.sets)}</td>
    </tr>
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
