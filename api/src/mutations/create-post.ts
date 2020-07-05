import {
  GraphQLString,
} from 'graphql';
import post from '../models/post';
import createPostResolver from '../resolvers/create-post';

export default {
  type: post,
  description: 'Create a post with given inputs',
  args: {
    content: {
      name: 'Content',
      description: 'Content of the post',
      type: GraphQLString,
    },
  },
  resolve: createPostResolver,
};
