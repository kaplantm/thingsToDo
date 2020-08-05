import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:4000/graphql'; // TODO: dynamic

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: 'Bearer 123', // TODO: dynamic
  },
});

export default graphQLClient;
