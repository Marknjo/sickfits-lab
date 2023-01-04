import Link from 'next/link'
import { useCart } from '../../lib'
import { useUser } from '../../lib/graphql'
import CartCount from '../orders/CartCount'
import { NavStyles } from '../styles'
import LogoutBtn from '../users/LogoutBtn'

export default function Nav() {
  const { user, loading, error } = useUser()
  const { openCart } = useCart()

  if (error) {
    return <p>Internal service error, report to the administrator</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  const cart = user?.cart

  function CartCounter() {
    if (!cart || cart.length === 0) {
      return 0
    }

    // @ts-ignore
    return user.cart.reduce(
      (tally: any, cartItem: { quantity: any }) => tally + cartItem.quantity,
      0
    )
  }

  let canSellLink: JSX.Element = <></>
  if (user?.role.name === 'Admin' || user?.role.name === 'Editor') {
    canSellLink = <Link href='/sell'>Sell</Link>
  }

  return (
    <NavStyles>
      <Link href='/products'>Products</Link>
      {user && (
        <>
          {canSellLink}
          <Link href='/orders'>Orders</Link>
          {/* <Link href='/account'>Account</Link> */}
          <button type='button' onClick={openCart}>
            My Cart
            <CartCount count={CartCounter()} />
          </button>
          <LogoutBtn />
        </>
      )}

      {!user && (
        <>
          <Link href='/app-access'>Sign In</Link>
          <Link href='/app-access?type=signup'>Sign Up</Link>
        </>
      )}
    </NavStyles>
  )
}
