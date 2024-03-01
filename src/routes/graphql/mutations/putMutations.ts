/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { myPrisma } from '../index.js';

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
    resolve: (_root, { dto, id }, prisma: myPrisma) =>
      prisma.post.update({
        where: { id: id },
        data: dto,
      }),
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
    resolve: (_root, { dto, id }, prisma: myPrisma) =>
      prisma.user.update({
        where: { id: id },
        data: dto,
      }),
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
    resolve: (_root, { dto, id }, prisma: myPrisma) =>
      prisma.profile.update({
        where: { id: id },
        data: dto,
      }),
  },
};
