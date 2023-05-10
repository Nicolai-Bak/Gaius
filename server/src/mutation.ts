import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { GraphQLError } from 'graphql';

import { CURRENT_WORKOUT_CHANNEL } from './channels';
import { GraphQLContext } from './context';

const addWorkout = async (
  _parent: unknown,
  { title }: { title: string },
  { prisma }: GraphQLContext,
) => await prisma.workout.create({
  data: {
    title,
  },
});

const addExerciseToWorkout = async (
  _parent: unknown,
  { workoutId, name }: { workoutId: string; name: string },
  { prisma, pubsub }: GraphQLContext,
) => {
  const exercise = await prisma.exercise
    .create({
      data: {
        name,
        workout: {
          connect: {
            id: Number(workoutId),
          },
        },
      },
    })
    .catch((error) => {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return Promise.reject(new GraphQLError(`Workout with id ${workoutId} does not exist.`));
      }
      return Promise.reject(error);
    });

  pubsub.publish(CURRENT_WORKOUT_CHANNEL, {
    currentWorkout: await prisma.workout.findUnique({
      where: {
        id: Number(workoutId),
      },
      include: {
        exercises: {
          include: {
            sets: true,
          },
        },
      },
    }),
  });

  return exercise;
};

const addSetToExercise = async (
  _parent: unknown,
  { exerciseId, weight, reps, workoutId }: { exerciseId: string; weight: number, reps: number, workoutId: string },
  { prisma, pubsub }: GraphQLContext,
) => {
  const set = await prisma.set
    .create({
      data: {
        weight,
        reps,
        exercise: {
          connect: {
            id: Number(exerciseId),
          },
        },
      },
    })
    .catch((error) => {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return Promise.reject(new GraphQLError(`Exercise with id ${exerciseId} does not exist.`));
      }
      return Promise.reject(error);
    });

  pubsub.publish(CURRENT_WORKOUT_CHANNEL, {
    currentWorkout: await prisma.workout.findUnique({
      where: {
        id: Number(workoutId),
      },
      include: {
        exercises: {
          include: {
            sets: true,
          },
        },
      },
    }),
  });

  return set;
};

const toggleSetIsCompleted = async (
  _parent: unknown,
  { id, isCompleted, workoutId }: { id: string; isCompleted: boolean, workoutId: string },
  { prisma, pubsub }: GraphQLContext,
) => {
  const set = await prisma.set.update({
    where: {
      id: Number(id),
    },
    data: {
      isCompleted: isCompleted,
    },
  });
  pubsub.publish(CURRENT_WORKOUT_CHANNEL, {
    currentWorkout: await prisma.workout.findUnique({
      where: {
        id: Number(workoutId),
      },
      include: {
        exercises: {
          include: {
            sets: true,
          },
        },
      },
    }),
  });
  return set;
};

export const mutation = {
  addWorkout,
  addExerciseToWorkout,
  addSetToExercise,
  toggleSetIsCompleted,
};
