/* eslint-disable */
import { KeystoneContext } from '@keystone-6/core/types';

import { Session } from '../../../types';

export default async function addToCart(
  _root: any,
  { productId }: { productId: string },
  context: KeystoneContext
) {
  // 1. Query the current user see it they are signed in
  const session = context.session as Session;

  const itemId = session.itemId;

  if (!session.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // 2. Query the user Cart
  const allCartItems = await context.db.CartItem.findMany({
    where: {
      customer: { id: { equals: itemId } },
      product: { id: { equals: productId } },
    },
  });

  const [existingCartItem] = allCartItems;

  if (existingCartItem) {
    // 3. See if the current item is iin their cart
    // 4. If it is, increment by 1
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1`
    );

    const id = existingCartItem.id as string;
    const quantity = existingCartItem.quantity as number;

    return await context.db.CartItem.updateOne({
      where: { id },
      data: { quantity: quantity + 1 },
    });
  }
  // 4.1. if it isn't, create a new cart item!
  return await context.db.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      customer: { connect: { id: session.itemId } },
    },
  });
}
