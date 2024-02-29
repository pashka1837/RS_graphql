import { GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';

const postType = new GraphQLObjectType({
  name: 'postType',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    authorId: {
      type: UUIDType,
    },
  }),
});

export { postType };
