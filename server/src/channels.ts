import { Exercise, Set, Workout } from '@prisma/client';

export const CURRENT_WORKOUT_CHANNEL = 'CURRENT_WORKOUT_CHANNEL';
export type PubSubChannels = {
  CURRENT_WORKOUT_CHANNEL: [{ currentWorkout: (Workout & { exercises: (Exercise & { sets: Set[]; })[]; }) | null; }];
};
