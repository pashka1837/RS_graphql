import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, myShemaBuilder } from './schemas.js';
import { GraphQLSchema, buildSchema, graphql } from 'graphql';
import { memberType } from './types/memberType.js';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs, PrismaClientOptions } from '@prisma/client/runtime/library.js';

// const schema = buildSchema(`
// type memberType {
//   id: String
//   discount: Float
//   postsLimitPerMonth: Int
// }
// type Query {
//   memberTypes: [memberType]
// }`);

// function createRoot(prisma: PrismaClient<PrismaClientOptions, never, DefaultArgs>) {
//   return {
//     memberTypes: () => {
//       return prisma.memberType.findMany();
//     },
//   };
// }

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma, httpErrors } = fastify;
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      console.log(`hey`, req.body.query);
      const source = req.body.query;
      // const query = queryBuilder(prisma);
      // const schema: GraphQLSchema = new GraphQLSchema({
      //   query: query,
      //   types: [memberType],
      // });
      const schema = myShemaBuilder(prisma);
      // const root = createRoot(prisma);

      const response = await graphql({ schema, source });
      console.log(response.data);
      return { data: response.data };
    },
  });
};

export default plugin;
