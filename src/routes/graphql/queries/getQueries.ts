import { GraphQLList, GraphQLResolveInfo, GraphQLType } from 'graphql';
import { postType } from '../types/postType.js';
import { userType } from '../types/userType.js';
import { profileType } from '../types/profileType.js';
import { memberType } from '../types/memberType.js';
import { MyContext } from '../index.js';
import DataLoader from 'dataloader';
import {
  ResolveTree,
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';

export const getQueries = {
  memberTypes: {
    type: new GraphQLList(memberType),
    resolve: (_root, _args, context: MyContext) => {
      const { prisma } = context;
      return prisma.memberType.findMany();
    },
  },
  posts: {
    type: new GraphQLList(postType),
    resolve: (_root, _args, context: MyContext) => {
      const { prisma } = context;
      return prisma.post.findMany();
    },
  },
  users: {
    type: new GraphQLList(userType),
    resolve: async (_root, _args, context: MyContext, info: GraphQLResolveInfo) => {
      const { prisma, dataloaders } = context;
      const parsedResolveInfoFragment = parseResolveInfo(info) as ResolveTree;
      const { fields } = simplifyParsedResolveInfoFragmentWithType(
        parsedResolveInfoFragment,
        userType as GraphQLType,
      );
      let dl = dataloaders.get('users');
      if (!dl) {
        dl = new DataLoader(async (ids) => {
          const users = await prisma.user.findMany({
            include: {
              subscribedToUser: !!Object.keys(fields).find(
                (key) => key === 'subscribedToUser',
              ),
              userSubscribedTo: !!Object.keys(fields).find(
                (key) => key === 'userSubscribedTo',
              ),
            },
          });
          return ids.map((id) => (id === 'users' ? users : undefined));
        });
        dataloaders.set('users', dl);
      }
      return dl.load('users');
    },
  },
  profiles: {
    type: new GraphQLList(profileType),
    resolve: (_root, _args, context: MyContext) => {
      const { prisma } = context;
      return prisma.profile.findMany();
    },
  },
};
