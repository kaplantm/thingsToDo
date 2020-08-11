import { GraphQLClient } from 'graphql-request';
import { API_KEY, API_URL } from '../../../config';

const endpoint = `${API_URL}/graphql`; // TODO: dynamic

// Future state: pagination / limit
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${API_KEY}`, // TODO: dynamic
  },
});

export default graphQLClient;
