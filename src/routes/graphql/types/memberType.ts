import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql';

const memberTypeIdENUM = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    business: { value: 'business' },
    basic: { value: 'basic' },
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
