import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuidType.js';
import { profileType } from './profileType.js';
import { DefaultArgs, PrismaClientOptions } from '@prisma/client/runtime/library.js';
import { PrismaClient } from '@prisma/client';

type myPrisma = PrismaClient<PrismaClientOptions, never, DefaultArgs>;

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
      type: GraphQLFloat,
    },
    profile: {
      type: profileType,

      resolve: async (root, _args, prisma: myPrisma) => {
        return await prisma.profile.findUnique({
          where: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            userId: root.id,
          },
        });
      },
    },
  }),
});

export { userType };
