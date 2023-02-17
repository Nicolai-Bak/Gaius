import type { Component } from 'solid-js';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql,
  createQuery,
} from '@merged/solid-apollo';

export const App: Component = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  });

  client
    .query({
      query: gql`
        query ExampleQuery {
          books {
            author
            year
          }
        }
      `,
    })
    .then((result) => console.log(result));

  return (
    <ApolloProvider client={client}>
      <FirstComponent />
    </ApolloProvider>
  );
};

export const FirstComponent: Component = () => {
  const data = createQuery(QUERY);

  return (
    <>
      <h1 class="text-4xl">Hello</h1>
      {JSON.stringify(data())}
    </>
  );
};

const QUERY = gql`
  query ExampleQuery {
    books {
      title
      author
      year
    }
  }
`;
