import { parse } from 'graphql';

export const typeDefs = parse(/* GraphQL */ `
  type Workout {
    id: ID!
    title: String!
    isCompleted: Boolean!
    exercises: [Exercise!]!
  }
  type Exercise {
    id: ID!
    name: String!
    sets: [Set!]!
  }
  type Set {
    id: ID!
    weight: Int!
    reps: Int!
    isCompleted: Boolean!
  }
  type Query {
    getWorkouts(nameFilter: String, skip: Int, takeArg: Int): [Workout!]!
  }
  type Mutation {
    addWorkout(title: String!): Workout!
    addExerciseToWorkout(workoutId: ID!, name: String!): Exercise!
    addSetToExercise(
      exerciseId: ID!
      weight: Int!
      reps: Int!
      workoutId: ID!
    ): Set!
    toggleSetIsCompleted(id: ID!, isCompleted: Boolean!, workoutId: ID!): Set!
  }
  type Subscription {
    currentWorkout(id: ID!): Workout!
  }
`);
