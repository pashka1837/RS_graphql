import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { DefaultArgs, PrismaClientOptions } from '@prisma/client/runtime/library.js';
import depthLimit from 'graphql-depth-limit';

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
      const validateErrors = validate(schema, parse(source), [depthLimit(5)]);
      if (validateErrors?.length) return { errors: validateErrors };

      const response = await graphql({
        schema,
        source,
        variableValues: vars,
        contextValue: prisma,
      });

      console.log(response.data, response.errors);
      return { data: response.data, errors: response.errors };
    },
  });
};

export default plugin;
