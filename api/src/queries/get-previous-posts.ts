import {
  GraphQLList,
} from 'graphql';
import PostType from '../models/post';
import previousPostResolver from '../resolvers/get-previous-posts';

export default {
  type: GraphQLList(PostType),
  resolve: previousPostResolver,
};
