import {
  GraphQLList,
} from 'graphql';
import PostType from '../models/post';
import postsResolver from '../resolvers/posts';

export default {
  type: GraphQLList(PostType),
  resolve: postsResolver,
};
