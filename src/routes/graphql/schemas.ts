import { Type } from '@fastify/type-provider-typebox';
import { GraphQLList, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { memberType, memberTypeIdENUM } from './types/memberType.js';
import { PrismaClient } from '@prisma/client';
import { DefaultArgs, PrismaClientOptions } from '@prisma/client/runtime/library.js';
import { postType } from './types/post.js';
import { userType } from './types/users.js';
import { profileType } from './types/profile.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

const queryBuilder = (prisma: PrismaClient<PrismaClientOptions, never, DefaultArgs>) =>
  new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      memberTypes: {
        type: new GraphQLList(memberType),
        resolve: (_) => prisma.memberType.findMany(),
      },
      posts: {
        type: new GraphQLList(postType),
        resolve: (_) => prisma.post.findMany(),
      },
      users: {
        type: new GraphQLList(userType),
        resolve: (_) => prisma.user.findMany(),
      },
      profiles: {
        type: new GraphQLList(profileType),
        resolve: (_) => prisma.profile.findMany(),
      },
    }),
  });

export function myShemaBuilder(
  prisma: PrismaClient<PrismaClientOptions, never, DefaultArgs>,
) {
  return new GraphQLSchema({
    query: queryBuilder(prisma),
    types: [memberType, postType, userType, profileType, memberTypeIdENUM],
  });
}
