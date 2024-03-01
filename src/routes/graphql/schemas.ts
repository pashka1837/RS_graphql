/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Type } from '@fastify/type-provider-typebox';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { memberType, memberTypeIdENUM } from './types/memberType.js';
import { PrismaClient } from '@prisma/client';
import { DefaultArgs, PrismaClientOptions } from '@prisma/client/runtime/library.js';
import { postType } from './types/postType.js';
import { userType } from './types/userType.js';
import { profileType } from './types/profileType.js';
import { UUIDType } from './types/uuidType.js';
import { getAllQueries } from './queries/getAll.js';
import { getByIdQueries } from './queries/getById.js';
import { CreatePostInput } from './inputs/CreatePostInput.js';
import { CreateProfileInput } from './inputs/CreateProfileInput.js';
import { CreateUserInput } from './inputs/CreateUserInput.js';
import { postById } from './mutations/mutations.js';

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

const queryBuilder = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...getAllQueries,
    ...getByIdQueries,
  }),
});

const mutationBuilder = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...postById,
  }),
});

export function myShemaBuilder() {
  return new GraphQLSchema({
    query: queryBuilder,
    mutation: mutationBuilder,
    types: [
      memberType,
      postType,
      userType,
      profileType,
      memberTypeIdENUM,
      CreatePostInput,
      CreateProfileInput,
      CreateUserInput,
    ],
  });
}
