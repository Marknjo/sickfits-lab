import { useUser } from '../../lib/graphql'
import { CartStyles, Supreme } from '../styles'

export default function Cart() {
  const { user, loading } = useUser()

  return (
    <CartStyles open={true}>
      <header>
        <Supreme>{user?.name}</Supreme>
      </header>
    </CartStyles>
  )
}
