import { useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { CartItem, OrderInterface } from '../../../types'
import { GET_USER_CREDENTIALS } from '../types'

interface AuthenticatedUser {
  authenticatedItem: {
    id: string
    email: string
    name: 'mark'
    orders: [OrderInterface]
    cart: CartItem[] | []
    role: { name: string }
  } | null
}

export function useUser() {
  const {
    data: response,
    loading,
    error,
  } = useQuery<AuthenticatedUser>(GET_USER_CREDENTIALS)

  return {
    user: response?.authenticatedItem,
    error,
    loading,
  }
}
