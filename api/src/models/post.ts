import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const post = new GraphQLObjectType({
  name: 'Post',
  description: 'Post type definition',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLString),
      description: 'The id of the post.',
    },
    content: {
      type: GraphQLString,
    },
    date: {
      type: GraphQLString,
    },
  }),
});

export default post;
