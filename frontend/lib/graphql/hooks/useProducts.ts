import { useQuery } from '@apollo/client'
import { perPage } from '../../../config'
import { ProductsInterface } from '../../../types/ProductTypes'
import { ALL_PRODUCTS_QUERY } from '../types'

export const useProducts = (skip: number = 0) => {
  const { data, error, loading, fetchMore } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      orderBy: 'desc',
      take: perPage,
      skip,
    },
  })

  // const response =
  const response = data as ProductsInterface

  return {
    products: response?.products || [],
    error,
    loading,
    fetchMore,
  }
}
