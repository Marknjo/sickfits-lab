import { useQuery } from '@apollo/client'
import { OrderInterface } from '../../../types'
import { GET_ALL_ORDERS_QUERY } from '../types'

export function useOrders(id?: string) {
  const { data, error, loading } = useQuery<{ orders: [OrderInterface] }>(
    GET_ALL_ORDERS_QUERY,
    {
      variables: {
        id,
      },
    }
  )

  const orders = data?.orders

  return {
    error,
    loading,
    orders,
  }
}
