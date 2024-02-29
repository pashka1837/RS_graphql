/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuidType.js';
import { memberType, memberTypeIdENUM } from './memberType.js';
import { myPrisma } from '../index.js';

const profileType = new GraphQLObjectType({
  name: 'profileType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
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
    memberType: {
      type: memberType,
      resolve: async (root, _args, prisma: myPrisma) => {
        return await prisma.memberType.findUnique({
          where: {
            id: root.memberTypeId,
          },
        });
      },
    },
  }),
});

export { profileType };
