import { useMutation } from '@apollo/client'
import { REMOVE_CART_ITEMS_MUTATION, GET_USER_CREDENTIALS } from '../types'

export function useRemoveCartItem() {
  const [handleRemoveCartItems, { loading }] = useMutation(
    REMOVE_CART_ITEMS_MUTATION,
    {
      refetchQueries: [{ query: GET_USER_CREDENTIALS }],
    }
  )

  async function removeCartItemsHandler(id: string, productName: string) {
    const res = await handleRemoveCartItems({
      variables: {
        id,
      },
    })
    const error = res.errors

    if (error) {
      return {
        message: `Internal error, failed to remove ${productName} from your cart. If this error persists, contact the administrator of this site.`,
        status: 'error',
      }
    }

    const isDeleted = res.data?.deleteCartItem.id

    if (isDeleted) {
      return {
        message: `Successfully removed all ${productName}(s) from your cart.`,
        status: 'success',
      }
    }
  }

  return {
    loading,
    removeCartItemsHandler,
  }
}
