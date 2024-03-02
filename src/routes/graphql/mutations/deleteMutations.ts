/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GraphQLBoolean } from 'graphql';
import { UUIDType } from '../types/uuidType.js';
import { MyContext } from '../index.js';

export const deleteMutations = {
  deletePost: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_root, { id }, context: MyContext) => {
      const { prisma } = context;
      await prisma.post.delete({
        where: {
          id: id,
        },
      });
    },
  },
  deleteProfile: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_root, { id }, context: MyContext) => {
      const { prisma } = context;
      await prisma.profile.delete({
        where: {
          id: id,
        },
      });
    },
  },
  deleteUser: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_root, { id }, context: MyContext) => {
      const { prisma } = context;
      await prisma.user.delete({
        where: {
          id: id,
        },
      });
    },
  },
  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: {
      userId: {
        type: UUIDType,
      },
      authorId: {
        type: UUIDType,
      },
    },
    resolve: async (_root, { userId, authorId }, context: MyContext) => {
      const { prisma } = context;
      await prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId: userId,
            authorId: authorId,
          },
        },
      });
    },
  },
};
