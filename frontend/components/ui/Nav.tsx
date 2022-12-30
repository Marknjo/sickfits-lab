import Link from 'next/link'
import { useCart } from '../../lib'
import { useUser } from '../../lib/graphql'
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

  return (
    <NavStyles>
      <Link href='/products'>Products</Link>
      {user && (
        <>
          <Link href='/sell'>Sell</Link>
          <Link href='/orders'>Orders</Link>
          <Link href='/account'>Account</Link>
          <button type='button' onClick={openCart}>
            My Cart
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
