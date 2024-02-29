import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const memberTypeIdENUM = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BUSINESS: { value: 'business' },
    BASIC: { value: 'basic' },
  },
});

const memberType = new GraphQLObjectType({
  name: 'memberType',
  fields: () => ({
    id: {
      type: memberTypeIdENUM,
    },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
  }),
});

export { memberType, memberTypeIdENUM };
