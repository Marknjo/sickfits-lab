import type { Lists } from '.keystone/types';
import { User, Product, ProductImage, CartItem } from '.';

export const lists: Lists = {
  User,
  Product,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ProductImage,
  CartItem,
};
