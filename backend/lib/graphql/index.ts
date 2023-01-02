import type { GraphQLSchema } from 'graphql';
import { mergeSchemas } from '@graphql-tools/schema';
import addToCart from './mutations/addToCart';
import reduceCartItems from './mutations/reduceCartItems';
import checkout from './mutations/checkout';

export const extendGraphqlSchema = (schema: GraphQLSchema) =>
  mergeSchemas({
    schemas: [schema],
    typeDefs: `#graphql

      type Mutation{
      """ Add To Cart Mutation """
        addToCart(productId: ID): CartItem

      """ Remove Items from the cart by reducing a specific product quantity """
        reduceCartItems(productId: ID): CartItem

      """ Checkout with Stripe """
        checkout(token: String!): Order
      }

  `,
    resolvers: {
      Mutation: {
        addToCart,
        reduceCartItems,
        checkout,
      },
      Query: {},
    },
  });
