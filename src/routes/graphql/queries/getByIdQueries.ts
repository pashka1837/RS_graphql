/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GraphQLNonNull } from 'graphql';
import { postType } from '../types/postType.js';
import { userType } from '../types/userType.js';
import { UUIDType } from '../types/uuidType.js';
import { profileType } from '../types/profileType.js';
import { memberType, memberTypeIdENUM } from '../types/memberType.js';
import { myPrisma } from '../index.js';

export const getByIdQueries = {
  memberType: {
    type: memberType,
    args: {
      id: {
        type: new GraphQLNonNull(memberTypeIdENUM),
      },
    },
    resolve: async (_root, { id }, prisma: myPrisma) => {
      return await prisma.memberType.findUnique({
        where: {
          id: id,
        },
      });
    },
  },
  user: {
    type: userType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_root, { id }, prisma: myPrisma) => {
      return await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    },
  },
  post: {
    type: postType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_root, { id }, prisma: myPrisma) => {
      return await prisma.post.findUnique({
        where: {
          id: id,
        },
      });
    },
  },
  profile: {
    type: profileType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_root, { id }, prisma: myPrisma) => {
      return await prisma.profile.findUnique({
        where: {
          id: id,
        },
      });
    },
  },
};
