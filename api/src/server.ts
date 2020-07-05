import express from 'express';
import { GraphQLSchema } from 'graphql';
import expressGraphql from 'express-graphql';
import { config } from 'dotenv';
import queryTypes from './queries/query-types';
import mutationTypes from './mutations/mutation-types';
import ActiveDB from './factory/connect-db';

export const context = async () => {
  config();

  const db = await ActiveDB.getInstance();

  return { db };
};

const createServer = () => {
  const app = express();

  const schema = new GraphQLSchema({
    query: queryTypes,
    mutation: mutationTypes,
  });

  app.use('/graphql', expressGraphql({
    context,
    schema,
    graphiql: true,
  }));

  return app;
};

export default createServer;
