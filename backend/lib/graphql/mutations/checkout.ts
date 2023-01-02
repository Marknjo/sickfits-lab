/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { KeystoneContext } from '@keystone-6/core/types';
import type { CartItemCreateInput } from '.keystone/types';
import { Session } from '../../../types';
import stripeConfig from '../../stripe';

export default async function checkout(
  _root: any,
  { token }: { token: string },
  context: KeystoneContext
) {
  // 1.1. Make sure they are signed in
  const session = context.session as Session;

  const userId = session.data?.id;

  if (!session.itemId) {
    throw new Error('You must be logged in to do this!');
  }

  // 1.2. query the current user
  const user = await context.query.User.findOne({
    where: {
      id: userId,
    },
    query: `#graphql
       id 
       name 
       email
       cart{
        id
        quantity
        product {
          name
          price
          description
          id
          photo {
            id
            altText
            image {
              id
              url
            }
          }
        }
       }
    `,
  });

  // 2. Calc the total price for their order
  const cartItems = user.cart.filter(
    (cartItem: { product: any }) => cartItem.product
  );

  const amount = cartItems.reduce(
    (tally: number, cartItem: CartItemCreateInput) =>
      // @ts-ignore;
      tally + cartItem.quantity * cartItem.product.price,
    0
  );

  // 3. Create the payment with the stripe library
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((err: Error) => {
      console.log(err);
      throw new Error(err.message);
    });

  // 4. Convert the cartItems to OrderedItems
  const orderedItems = cartItems.map(
    (cartItem: {
      product: { name: any; description: any; price: any; photo: { id: any } };
      quantity: any;
    }) => {
      const orderItem = {
        name: cartItem.product.name,
        description: cartItem.product.description,
        photo: { connect: { id: cartItem.product.photo.id } },
        price: cartItem.product.price,
        quantity: cartItem.quantity,
        // customer: { connect: { id: userId } },
      };

      return orderItem;
    }
  );

  // 5. Create the order and return it
  const order = await context.db.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderedItems },
      customer: { connect: { id: userId } },
    },
  });

  /// 6. Clean up any old cart items
  const cartItemIds = cartItems.map((cartItem: any) => ({
    id: cartItem.id,
  })) as Array<{ id: string }>;

  await context.db.CartItem.deleteMany({
    where: cartItemIds,
  });

  return order;
}
