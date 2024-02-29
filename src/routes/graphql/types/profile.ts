import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { memberTypeIdENUM } from './memberType.js';

const profileType = new GraphQLObjectType({
  name: 'profileType',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    userId: {
      type: UUIDType,
    },
    memberTypeId: {
      type: memberTypeIdENUM,
    },
  }),
});

export { profileType };
