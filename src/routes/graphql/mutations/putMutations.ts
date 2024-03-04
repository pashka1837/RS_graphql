/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MyContext } from '../index.js';

import { postType } from '../types/postType.js';
import { userType } from '../types/userType.js';
import { profileType } from '../types/profileType.js';
import { UUIDType } from '../types/uuidType.js';
import { ChangePostInput } from '../inputs/ChangePostInput.js';
import { ChangeUserInput } from '../inputs/ChangeUserInput.js';
import { ChangeProfileInput } from '../inputs/ChangeProfileInput.js';

export const putMutations = {
  changePost: {
    type: postType,
    args: {
      dto: {
        type: ChangePostInput,
      },
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_root, { dto, id }, context: MyContext) => {
      const { prisma } = context;
      return await prisma.post.update({
        where: { id: id },
        data: dto,
      });
    },
  },
  changeUser: {
    type: userType,
    args: {
      dto: {
        type: ChangeUserInput,
      },
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_root, { dto, id }, context: MyContext) => {
      const { prisma } = context;
      return await prisma.user.update({
        where: { id: id },
        data: dto,
      });
    },
  },
  changeProfile: {
    type: profileType,
    args: {
      dto: {
        type: ChangeProfileInput,
      },
      id: {
        type: UUIDType,
      },
    },
    resolve: async (_root, { dto, id }, context: MyContext) => {
      const { prisma } = context;
      return await prisma.profile.update({
        where: { id: id },
        data: dto,
      });
    },
  },
  subscribeTo: {
    type: userType,
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
      return await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          userSubscribedTo: {
            create: {
              authorId: authorId,
            },
          },
        },
      });
    },
  },
};
