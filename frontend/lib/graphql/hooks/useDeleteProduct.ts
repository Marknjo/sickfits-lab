import {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
  useMutation,
} from '@apollo/client'
import { ALL_PRODUCTS_QUERY, DELETE_PRODUCT_MUTATION } from '../types'

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
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }, 'GetAllProducts'],
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
