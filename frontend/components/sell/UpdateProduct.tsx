import { ProductInterface } from '../../types'

function UpdateProduct({ product }: { product: ProductInterface }) {
  const { id, photo, price, description, name, status } = product

  return (
    <>
      <h2>Update Product Page</h2>
    </>
  )
}

export default UpdateProduct
