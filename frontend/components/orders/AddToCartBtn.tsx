import { useAddToCart } from '../../lib/graphql'

export default function AddToCartBtn({
  productId,
  productName,
}: {
  productId: string
  productName: string
}) {
  const { addItemToCartHandler, loading, addedItem } = useAddToCart()

  async function onclickHandler() {
    const res = await addItemToCartHandler(productId, productName)

    /// @TODO: Handle messages correctly
  }

  return (
    <button type='button' onClick={onclickHandler}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  )
}
