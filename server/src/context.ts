import { PrismaClient, } from '@prisma/client';
import {
  PubSub,
} from 'graphql-yoga';

import { PubSubChannels } from './channels';

export type GraphQLContext = {
  prisma: PrismaClient;
  pubsub: PubSub<PubSubChannels>;
}
