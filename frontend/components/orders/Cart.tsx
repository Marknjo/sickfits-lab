import Image from 'next/image'
import styled from 'styled-components'
import { calcTotalPrice, useCart } from '../../lib'
import { formatMoney } from '../../lib/formatMoney'
import { useUser } from '../../lib/graphql'
import { CartItem as CartItemInterface } from '../../types'
import { CartStyles, CloseButton, Supreme } from '../styles'
import Checkout from './Checkout'
import RemoveCartItemsBtn from './RemoveCartItemsBtn'

const CartItemStyles = styled.li`
  padding: 1rem 2.4rem;
  border-bottom: 1px solid var(--lightGray);

  display: grid;
  grid-template-columns: auto 1fr auto;

  img {
    margin-right: 1rem;
    object-position: top;
    object-fit: cover;
  }

  h3,
  p {
    margin: 0;
  }
`
/* Cart Item Co: Component */
function CartItem({ cartItem }: { cartItem: CartItemInterface }) {
  const product = cartItem.product
  const photo = cartItem.product.photo

  return (
    <CartItemStyles>
      <Image src={photo.image.url} alt={photo.altText} width={80} height={70} />
      <div>
        <h3>{product.name}</h3>
        <p>
          <strong>{formatMoney(product.price * cartItem.quantity)}</strong> -
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
      <RemoveCartItemsBtn id={cartItem.id} name={product.name} />
    </CartItemStyles>
  )
}

export default function Cart() {
  const { user, loading } = useUser()
  const { isOpen, closeCart } = useCart()

  const cart = user?.cart

  return (
    <CartStyles open={isOpen}>
      <header>
        <Supreme>{user?.name}</Supreme>

        <CloseButton onClick={closeCart} type='button'>
          &times;
        </CloseButton>
      </header>
      <ul>
        {!cart || cart.length === 0 ? (
          <li>
            <p>No Items in your cart!</p>
          </li>
        ) : (
          ''
        )}
        {cart &&
          cart.map(cartItem => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(cart!))}</p>

        {!cart ||
          (cart.length > 0 && (
            <>
              <p className='checkout-title'>
                Enter Your Payments Details to Checkout
              </p>
              <Checkout />
            </>
          ))}
      </footer>
    </CartStyles>
  )
}
