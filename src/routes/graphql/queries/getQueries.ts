import { GraphQLList } from 'graphql';
import { postType } from '../types/postType.js';
import { userType } from '../types/userType.js';
import { profileType } from '../types/profileType.js';
import { memberType } from '../types/memberType.js';
import { myPrisma } from '../index.js';

export const getQueries = {
  memberTypes: {
    type: new GraphQLList(memberType),
    resolve: (_root, _args, prisma: myPrisma) => prisma.memberType.findMany(),
  },
  posts: {
    type: new GraphQLList(postType),
    resolve: (_root, _args, prisma: myPrisma) => prisma.post.findMany(),
  },
  users: {
    type: new GraphQLList(userType),
    resolve: (_root, _args, prisma: myPrisma) => prisma.user.findMany(),
  },
  profiles: {
    type: new GraphQLList(profileType),
    resolve: (_root, _args, prisma: myPrisma) => prisma.profile.findMany(),
  },
};
