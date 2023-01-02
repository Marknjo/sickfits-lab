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

  console.log(userId);
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

  console.log(amount);

  // 3. Create the payment with the stripe library
  const stripe = await stripeConfig.paymentIntents
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

  console.log(stripe);

  // 4. Convert the cartItems to OrderItems

  // 5. Create the order and return it
}
