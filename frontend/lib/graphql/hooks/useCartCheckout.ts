import { DefaultContext, OperationVariables, useMutation } from '@apollo/client'
import { CART_CHECKOUT_MUTATION } from '../types'

function update(cache: DefaultContext, payload: OperationVariables) {
  cache.evict(cache.identify(payload.data.checkout))

  cache.gc({
    resetResultCache: true,
    resetResultIdentities: true,
  })
}

export function useCartCheckout() {
  const [handleCheckout, { error, loading, data }] = useMutation(
    CART_CHECKOUT_MUTATION
  )

  async function checkoutHandler(token: string) {
    const res = await handleCheckout({
      variables: {
        token,
      },
      update,
    })

    /// test is successful
    if (res.errors) {
      return {
        message: 'Checkout failed!',
        status: 'error',
      }
    }

    console.log(res)

    if (res.data.checkout) {
      return {
        orders: res.data.checkout,
        message: 'Payment successful',
        status: 'success',
      }
    }
  }

  return {
    checkoutHandler,
    loading,
    checkErrors: error,
  }
}
