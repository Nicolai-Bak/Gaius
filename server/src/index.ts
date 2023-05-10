import { createServer } from 'node:http';

import { buildSubgraphSchema } from '@apollo/subgraph';
import { PrismaClient } from '@prisma/client';
import { createPubSub, createYoga } from 'graphql-yoga';

import { PubSubChannels } from './channels';
import { GraphQLContext } from './context';
import { resolvers } from './resolver';
import { typeDefs } from './typeDefs';

const prisma = new PrismaClient();

const pubsub = createPubSub<PubSubChannels>();

// const schema1: YogaSchemaDefinition<GraphQLContext> = createSchema({
//   typeDefs,
//   resolvers,
// });

const schema = buildSubgraphSchema([{ typeDefs, resolvers }]);

async function createContext(): Promise<GraphQLContext> {
  return { prisma, pubsub };
}

const yoga = createYoga({ schema: schema, context: createContext });

const server = createServer(yoga);

const port = process.env.PORT || 4002;

server.listen(port, () => {
  console.info(`Server is running on http://localhost:${port}/graphql`);
});
