import { GraphQLError } from 'graphql';

import { GraphQLContext } from './context';

const applyTakeConstraints = (params: {
  min: number
  max: number
  value: number
}) => {
  if (params.value < params.min || params.value > params.max) {
    throw new GraphQLError(
      `'take' argument value '${params.value}' is outside the valid range of '${params.min}' to '${params.max}'.`
    );
  }
  return params.value;
};

const getWorkouts = async (
  _parent: unknown,
  { nameFilter, skip, takeArg }: { nameFilter?: string, skip?: number, takeArg?: number },
  { prisma }: GraphQLContext) => {
  const where = nameFilter
    ? {
      title: { contains: nameFilter }
    }
    : {};

  const take = applyTakeConstraints({
    min: 1,
    max: 50,
    value: takeArg ?? 2,
  });

  return await prisma.workout.findMany({
    where,
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
    skip,
    take,
  });
};

export const query = {
  getWorkouts,
};
