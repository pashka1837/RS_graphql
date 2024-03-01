/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GraphQLBoolean } from 'graphql';
import { myPrisma } from '../index.js';
import { UUIDType } from '../types/uuidType.js';

export const deleteMutations = {
  deletePost: {
    type: GraphQLBoolean,
    args: {
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_root, { id }, prisma: myPrisma) => {
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
    resolve: async (_root, { id }, prisma: myPrisma) => {
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
    resolve: async (_root, { id }, prisma: myPrisma) => {
      await prisma.user.delete({
        where: {
          id: id,
        },
      });
    },
  },
};
