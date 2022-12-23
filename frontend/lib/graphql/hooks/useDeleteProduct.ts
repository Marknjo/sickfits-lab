import {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
  useMutation,
} from '@apollo/client'
import { DELETE_PRODUCT_MUTATION } from '../types'

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
  cache.gc()
}

export const useDeleteProduct = (id: string) => {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: {
        id,
      },
      update,
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
