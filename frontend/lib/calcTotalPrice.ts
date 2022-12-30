import { CartItem } from '../types'

export function calcTotalPrice(cart: CartItem[]) {
  if (!cart || cart.length === 0) return 0

  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally

    return tally + cartItem.quantity * cartItem.product.price
  }, 0)
}
