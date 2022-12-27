import Link from 'next/link'
import { useUser } from '../../lib/graphql'
import { NavStyles } from '../styles'
import LogoutBtn from '../users/LogoutBtn'

export default function Nav() {
  const { user, loading, error } = useUser()

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
          <LogoutBtn />
        </>
      )}

      {!user && (
        <>
          <Link href='/signin'>Sign In</Link>
          <Link href='/signup'>Sign Up</Link>
        </>
      )}
    </NavStyles>
  )
}
