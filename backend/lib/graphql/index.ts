import type { GraphQLSchema } from 'graphql';
import { mergeSchemas } from '@graphql-tools/schema';

export const extendGraphqlSchema = (schema: GraphQLSchema) =>
  mergeSchemas({
    schemas: [schema],
    typeDefs: `#graphql

      """ Add To Cart Mutation """
      type Mutation{
        addToCart(productId: ID): CartItem
      }

  `,
    resolvers: {
      Mutation: {
        addToCart() {
          console.log('ADD TO CART!!!');
        },
      },
      Query: {},
    },
  });
