import { useQuery } from '@apollo/client'
import { ProductsInterface } from '../../types/ProductTypes'
import { ALL_PRODUCTS_QUERY } from '../types'

export const productsPaginationConfig = {
  skip: 0,
  first: 2,
}

export const useProducts = () => {
  const { data, error, loading } = useQuery<ProductsInterface>(
    ALL_PRODUCTS_QUERY,
    {
      variables: productsPaginationConfig,
      notifyOnNetworkStatusChange: true,
    }
  )

  return {
    products: data?.products || [],
    error,
    loading,
  }
}
