/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { myPrisma } from '../index.js';
import { CreatePostInput } from '../inputs/CreatePostInput.js';
import { CreateProfileInput } from '../inputs/CreateProfileInput.js';
import { CreateUserInput } from '../inputs/CreateUserInput.js';

import { postType } from '../types/postType.js';
import { userType } from '../types/userType.js';
import { profileType } from '../types/profileType.js';

export const postMutations = {
  createPost: {
    type: postType,
    args: {
      dto: {
        type: CreatePostInput,
      },
    },
    resolve: (_root, { dto }, prisma: myPrisma) =>
      prisma.post.create({
        data: dto,
      }),
  },
  createUser: {
    type: userType,
    args: {
      dto: {
        type: CreateUserInput,
      },
    },
    resolve: (_root, { dto }, prisma: myPrisma) =>
      prisma.user.create({
        data: dto,
      }),
  },
  createProfile: {
    type: profileType,
    args: {
      dto: {
        type: CreateProfileInput,
      },
    },
    resolve: (_root, { dto }, prisma: myPrisma) =>
      prisma.profile.create({
        data: dto,
      }),
  },
};
