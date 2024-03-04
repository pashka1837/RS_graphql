import { GraphQLBoolean, GraphQLInputObjectType } from 'graphql';

const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: {
      type: GraphQLBoolean,
    },
  },
});
export { ChangeProfileInput };
