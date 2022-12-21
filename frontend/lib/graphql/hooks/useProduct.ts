import { useQuery } from '@apollo/client'
import { SingleProductInterface } from '../../../types/ProductTypes'
import { GET_SINGLE_PRODUCT_QUERY } from '../types'

export const useProduct = (id: string) => {
  const { data, loading, error } = useQuery<SingleProductInterface>(
    GET_SINGLE_PRODUCT_QUERY,
    {
      variables: {
        id,
      },
    }
  )

  return {
    product: data?.product || undefined,
    loading,
    error,
  }
}
