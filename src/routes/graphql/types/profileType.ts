/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { UUIDType } from './uuidType.js';
import { memberType, memberTypeIdENUM } from './memberType.js';
import { MyContext } from '../index.js';
import DataLoader from 'dataloader';

const profileType = new GraphQLObjectType({
  name: 'profileType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    userId: {
      type: UUIDType,
    },
    memberTypeId: {
      type: memberTypeIdENUM,
    },
    memberType: {
      type: memberType,
      resolve: async (root, _args, context: MyContext, info) => {
        const { prisma, dataloaders } = context;
        let dl = dataloaders.get(info.fieldNodes);
        if (!dl) {
          dl = new DataLoader(async (ids) => {
            const memberTypesAr = await prisma.memberType.findMany();
            return ids.map((id) => memberTypesAr.find((member) => member.id === id));
          });
          dataloaders.set(info.fieldNodes, dl);
        }
        return dl.load(root.memberTypeId as string);
        // return await prisma.memberType.findUnique({
        //   where: {
        //     id: root.memberTypeId,
        //   },
        // });
      },
    },
  }),
});

export { profileType };
