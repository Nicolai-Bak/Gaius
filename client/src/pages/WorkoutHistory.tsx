import { Component, createResource, For, Show } from 'solid-js';

import { client } from '../client';
import { WorkoutHistoryCard } from '../components/WorkoutHistoryCard';
import { graphql } from '../gql';
import { Workout } from '../gql/graphql';
import { useLocale } from '../locales/context';

export const WorkoutHistory: Component = () => {
  const { i18n } = useLocale();
  const [workouts] = createResource(fetchWorkouts);

  return (
    <>
      <h1 class="text-center text-4xl">{i18n.t('history.title')}</h1>
      <Show
        when={!workouts.loading && workouts().length !== 0}
        fallback={<div>{i18n.t('history.noWorkouts')}</div>}
      >
        <For each={workouts()}>
          {(workout) => <WorkoutHistoryCard workout={workout} />}
        </For>
      </Show>
    </>
  );
};

export default WorkoutHistory;

const getWorkoutsQuery = graphql(/* GraphQL */ `
  query GetWorkouts {
    getWorkouts(takeArg: 10) {
      id
      title
      isCompleted
      exercises {
        id
        name
        sets {
          id
          weight
          reps
          isCompleted
        }
      }
    }
  }
`);

const fetchWorkouts = async (): Promise<Workout[]> =>
  (await client.query(getWorkoutsQuery, {}).toPromise()).data.getWorkouts;
