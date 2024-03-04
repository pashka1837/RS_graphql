/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { postType } from './types/postType.js';
import { userType } from './types/userType.js';
import { profileType } from './types/profileType.js';
import { memberType, memberTypeIdENUM } from './types/memberType.js';

import { CreatePostInput } from './inputs/CreatePostInput.js';
import { CreateProfileInput } from './inputs/CreateProfileInput.js';
import { CreateUserInput } from './inputs/CreateUserInput.js';

import { getByIdQueries } from './queries/getByIdQueries.js';
import { getQueries } from './queries/getQueries.js';

import { postMutations } from './mutations/postMutations.js';
import { deleteMutations } from './mutations/deleteMutations.js';
import { putMutations } from './mutations/putMutations.js';

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
    ...getQueries,
    ...getByIdQueries,
  }),
});

const mutationBuilder = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...postMutations,
    ...deleteMutations,
    ...putMutations,
  }),
});

export const schema = new GraphQLSchema({
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
