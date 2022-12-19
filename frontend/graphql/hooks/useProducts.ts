import { useQuery } from '@apollo/client'
import { ProductsInterface } from '../../types/ProductTypes'
import { ALL_PRODUCTS_QUERY } from '../types'

export const useProducts = () => {
  const { data, error, loading } =
    useQuery<ProductsInterface>(ALL_PRODUCTS_QUERY)

  return {
    products: data?.products || [],
    error,
    loading,
  }
}
