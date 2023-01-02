import { useQuery } from '@apollo/client'
import { OrderInterface } from '../../../types'
import { GET_ORDER_QUERY } from '../types'

export function useSingleOrder(id: string | null) {
  const { data, loading, error } = useQuery<{ order: OrderInterface }>(
    GET_ORDER_QUERY,
    {
      variables: {
        id,
      },
    }
  )

  const order = data?.order

  return {
    order,
    loading,
    error,
  }
}
