import Link from 'next/link'
import { NavStyles } from '../styles'

export default function Nav() {
  return (
    <NavStyles>
      <Link href='/products' replace>
        Products
      </Link>
      <Link href='/sell' replace>
        Sell
      </Link>
      <Link href='/orders' replace>
        Orders
      </Link>
      <Link href='/account' replace>
        Account
      </Link>
    </NavStyles>
  )
}
