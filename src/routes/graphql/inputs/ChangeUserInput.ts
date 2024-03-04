import { GraphQLInputObjectType, GraphQLString } from 'graphql';

const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
});
export { ChangeUserInput };
