import { mutation } from './mutation';
import { query } from './query.ts';
import { subscription } from './subscription';

export const resolvers = {
  Query: query,
  Mutation: mutation,
  Subscription: subscription,
};
