import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, myShemaBuilder } from './schemas.js';
import { graphql } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { DefaultArgs, PrismaClientOptions } from '@prisma/client/runtime/library.js';

export type myPrisma = PrismaClient<PrismaClientOptions, never, DefaultArgs>;

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
      const vars = req.body.variables;
      // console.log(vars);

      const schema = myShemaBuilder();
      const response = await graphql({
        schema,
        source,
        variableValues: vars,
        contextValue: prisma,
      });
      return { data: response.data, errors: response.errors };
      // try {
      //   const response = await graphql({
      //     schema,
      //     source,
      //     variableValues: vars,
      //     contextValue: prisma,
      //   });
      //   console.log(response);
      //   return { data: response.data };
      // } catch (error) {
      //   return { errors: error };
      // }

      // console.log(response.data);
    },
  });
};

export default plugin;
