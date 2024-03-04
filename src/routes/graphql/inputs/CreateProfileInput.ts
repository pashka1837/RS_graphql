import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt } from 'graphql';
import { UUIDType } from '../types/uuidType.js';
import { memberTypeIdENUM } from '../types/memberType.js';

const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
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
  },
});
export { CreateProfileInput };
