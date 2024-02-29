/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuidType.js';
import { profileType } from './profileType.js';
import { postType } from './postType.js';
import { myPrisma } from '../index.js';

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
            userId: root.id,
          },
        });
      },
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: (root, _args, prisma: myPrisma) => {
        return prisma.post.findMany({
          where: {
            authorId: root.id,
          },
        });
      },
    },
  }),
});

export { userType };
