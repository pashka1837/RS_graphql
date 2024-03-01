import { GraphQLInputObjectType, GraphQLString } from 'graphql';

const ChangePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: {
      type: GraphQLString,
    },
  },
});
export { ChangePostInput };
