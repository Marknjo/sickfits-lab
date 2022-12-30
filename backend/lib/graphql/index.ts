import type { GraphQLSchema } from 'graphql';
import { mergeSchemas } from '@graphql-tools/schema';
import addToCart from './mutations/addToCart';
import reduceCartItems from './mutations/reduceCartItems';

export const extendGraphqlSchema = (schema: GraphQLSchema) =>
  mergeSchemas({
    schemas: [schema],
    typeDefs: `#graphql

      """ Add To Cart Mutation """
      type Mutation{
        addToCart(productId: ID): CartItem
      }

      """ Remove Items from the cart by reducing a specific product quantity """
      type Mutation{
        reduceCartItems(productId: ID): CartItem
      }
  `,
    resolvers: {
      Mutation: {
        addToCart,
        reduceCartItems,
      },
      Query: {},
    },
  });
