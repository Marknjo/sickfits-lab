import { useQuery } from '@apollo/client'
import { ProductInterface } from '../../../types'
import { GET_USER_CREDENTIALS } from '../types'

interface AuthenticatedUser {
  authenticatedItem: {
    id: string
    email: string
    name: 'mark'

    cart?: {
      id: string
      quantity: number
      product: Pick<ProductInterface, 'id' | 'name' | 'price' | 'photo'>
    }
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
