import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

const client = new ApolloClient({
  uri: '/graphql',
});

describe('Test App', () => {
  test('renders correctly', () => {
    renderer.create(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
    );
  });
});
