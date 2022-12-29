import { useLazyQuery } from '@apollo/client'
import { ProductInterface } from '../../../types'
import { PRODUCTS_SEARCH_QUERY } from '../types'

export function useProductsSearch() {
  const [searchProducts, { data, error, loading }] = useLazyQuery(
    PRODUCTS_SEARCH_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  )

  const items = (data?.searchTerms || []) as ProductInterface[] | []

  return {
    searchProducts,
    error,
    loading,
    searchResults: items,
  }
}
