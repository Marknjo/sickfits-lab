import {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
  useMutation,
} from '@apollo/client'
import {
  PRODUCTS_PAGINATION_QUERY,
  DELETE_PRODUCT_MUTATION,
  PRODUCTS_COUNT_QUERY,
} from '../types'

/// Useful where we do not have pagination
/// Affects pagination as the cache store still holds old data
const update:
  | MutationUpdaterFunction<
      any,
      {
        id: string
      },
      DefaultContext,
      ApolloCache<any>
    >
  | undefined = function (cache, payload) {
  const cacheId = cache.identify(payload.data.deleteProduct)
  cache.evict({ id: cacheId })

  // @ts-ignore
  cache.gc({
    resetResultCache: true,
    resetResultIdentities: true,
  })
}

export const useDeleteProduct = (id: string) => {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: {
        id,
      },
      // update,
      refetchQueries: [
        { query: PRODUCTS_PAGINATION_QUERY },
        { query: PRODUCTS_COUNT_QUERY },
      ],
    }
  )

  function handleProductDelete() {
    deleteProduct()
  }

  return {
    handleProductDelete,
    loading,
    error: !!error,
  }
}
