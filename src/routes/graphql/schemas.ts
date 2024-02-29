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

export function myShemaBuilder() {
  return new GraphQLSchema({
    query: queryBuilder,
    types: [memberType, postType, userType, profileType, memberTypeIdENUM],
  });
}
