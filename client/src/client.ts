import { yogaExchange } from '@graphql-yoga/urql-exchange';
import { createClient, defaultExchanges } from '@urql/core';
import { createRoot } from 'solid-js';

const urqlClient = createClient({
  url: 'http://host.docker.internal:4000/graphql',
  // url: import.meta.env.VITE_API_URL,
  exchanges: [...defaultExchanges, yogaExchange()],
});

export const client = createRoot(() => urqlClient);
