import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';

const userType = new GraphQLObjectType({
  name: 'userType',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLInt,
    },
  }),
});

export { userType };
