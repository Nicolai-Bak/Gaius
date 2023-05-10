import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import { useApolloFederation } from "@envelop/apollo-federation";
import { createYoga } from "graphql-yoga";

export const gateway = async function gateway() {
  // Initialize the gateway
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: "workouts", url: "http://host.docker.internal:4005/graphql" },
        //{ name: "products", url: "http://localhost:4002" },
      ],
    }),
  });

  await gateway.load();

  const yoga = createYoga({
    plugins: [
      useApolloFederation({
        gateway,
      }),
    ],
  });

  return yoga;
};
