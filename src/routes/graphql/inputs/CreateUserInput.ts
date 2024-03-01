import { GraphQLFloat, GraphQLInputObjectType, GraphQLString } from 'graphql';

const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  },
});
export { CreateUserInput };
