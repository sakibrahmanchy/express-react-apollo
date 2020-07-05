import {
  GraphQLObjectType,
} from 'graphql';
import getLatestPost from './get-latest-post';
import getPreviousPosts from './get-previous-posts';
import posts from './posts';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    posts,
    getLatestPost,
    getPreviousPosts,
  },
});
