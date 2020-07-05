import PostType from '../models/post';
import getLatestPostResolver from '../resolvers/get-latest-post';

export default {
  type: PostType,
  resolve: getLatestPostResolver,
};
