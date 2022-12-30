import { useMutation } from '@apollo/client'
import { ADD_TO_CART_MUTATION, GET_USER_CREDENTIALS } from '../types'

export function useAddToCart() {
  const [handleAddToCart, { error, data, loading }] = useMutation<{
    addToCart: {
      id: string
      quantity: number
    }
  }>(ADD_TO_CART_MUTATION, {
    refetchQueries: [{ query: GET_USER_CREDENTIALS }],
  })

  async function addItemToCartHandler(productId: string, productName: string) {
    const res = await handleAddToCart({
      variables: {
        productId,
      },
    })

    if (res.errors) {
      return {
        message: `Error while attempting to add ${productName} to Cart. If error persist please contact the admin for help.`,
        status: 'error',
      }
    }

    if (res.data?.addToCart) {
      return {
        message: `${productName} added to cart`,
        status: 'success',
      }
    }
  }

  return {
    addItemToCartHandler,
    loading,
    error,
    addedItem: data?.addToCart,
  }
}
