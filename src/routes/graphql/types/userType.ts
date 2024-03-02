/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuidType.js';
import { profileType } from './profileType.js';
import { postType } from './postType.js';
import { MyContext } from '../index.js';
import DataLoader from 'dataloader';

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
      resolve: async (root, _args, context: MyContext, info) => {
        const { prisma, dataloaders } = context;
        let dl = dataloaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids) => {
            const profilesAr = await prisma.profile.findMany();
            return ids.map((id) => profilesAr.find((profile) => profile.userId === id));
          });
          dataloaders.set(info.fieldNodes, dl);
        }
        return await dl.load(root.id as string);

        // return await prisma.profile.findUnique({
        //   where: {
        //     userId: root.id,
        //   },
        // });
      },
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async (root, _args, context: MyContext, info) => {
        const { prisma, dataloaders } = context;
        let dl = dataloaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids) => {
            const postsAr = await prisma.post.findMany();
            return ids.map((id) => postsAr.filter((post) => post.authorId === id));
          });
          dataloaders.set(info.fieldNodes, dl);
        }

        return await dl.load(root.id as string);

        // return prisma.post.findMany({
        //   where: {
        //     authorId: root.id,
        //   },
        // });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: async (root, _args, context: MyContext, info) => {
        const { prisma, dataloaders } = context;
        const dl = dataloaders.get('users');
        if (!dl)
          return prisma.user.findMany({
            where: {
              subscribedToUser: {
                some: {
                  subscriberId: root.id,
                },
              },
            },
          });

        const usersObj = (await dl?.load('users')) as any;
        const users = usersObj.users;
        const user = users.find((u) => u.id === root.id);
        return user.userSubscribedTo;
      },
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async (root, _args, context: MyContext, info) => {
        const { prisma, dataloaders } = context;
        const dl = dataloaders.get('users');
        if (!dl)
          return prisma.user.findMany({
            where: {
              userSubscribedTo: {
                some: {
                  authorId: root.id,
                },
              },
            },
          });

        const usersObj = (await dl?.load('users')) as any;
        const users = usersObj.users;
        const user = users.find((u) => u.id === root.id);
        return user.subscribedToUser;
      },
    },
  }),
});

export { userType };
