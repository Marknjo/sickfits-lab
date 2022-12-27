import { useQuery } from '@apollo/client'
import { perPage } from '../../../config'
import { ProductsInterface } from '../../../types/ProductTypes'
import { PRODUCTS_PAGINATION_QUERY } from '../types'

export const useProducts = (skip: number = 0) => {
  const { data, error, loading } = useQuery(PRODUCTS_PAGINATION_QUERY, {
    variables: {
      orderBy: 'desc',
      limit: perPage,
      offset: skip,
    },
  })

  // const response =
  const response = data as ProductsInterface

  return {
    products: response?.products || [],
    error,
    loading,
  }
}
