import { map, pipe, Repeater } from 'graphql-yoga';

import { CURRENT_WORKOUT_CHANNEL } from './channels';
import { GraphQLContext } from './context';

const currentWorkout = {
  subscribe: async (_parent: unknown, _args: any, { prisma, pubsub }: GraphQLContext) =>
    pipe(
      Repeater.merge([undefined, pubsub.subscribe(CURRENT_WORKOUT_CHANNEL)]),
      map(async () => await prisma.workout.findFirst({
        where: {
          isCompleted: false,
        },
        include: {
          exercises: {
            include: {
              sets: true,
            },
          },
        },
      })),
    ),
  resolve: (payload: any) => payload,
};

export const subscription = {
  currentWorkout,
};
