import {
  GraphQLObjectType,
} from 'graphql';
import createPostMutation from './create-post';

export default new GraphQLObjectType({
  name: 'Mutations',
  description: 'Mutations',
  fields: () => ({
    createPost: createPostMutation,
  }),
});
