import { useQuery } from '@apollo/client'
import { PRODUCTS_COUNT_QUERY } from '../types'

export function useProductCount() {
  const { data, error, loading } = useQuery<{ productsCount: number }>(
    PRODUCTS_COUNT_QUERY
  )

  return {
    productsCount: data?.productsCount || 0,
    error,
    loading,
  }
}
