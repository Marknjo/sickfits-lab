import { useUpdateProduct } from '../../lib/graphql'
import { useForm } from '../../lib'
import { ProductInterface } from '../../types'
import { Form } from '../ui'

function UpdateProduct({ product }: { product: ProductInterface }) {
  const {
    inputs,
    inputChangeHandler,
    textAreaChangeHandler,
    clearForm,
    // blurInputHandler,
    // resetForm,
  } = useForm<FormOutputs>({
    name: 'Nice Shoes',
    price: 34234,
    description: 'These are the best shoes',
    image: '',
  })

  const { id, photo, price, description, name, status } = product
  const {} = useForm()
  const {} = useUpdateProduct(inputs)

  return (
    <Form>
      <h2>Update Product Page</h2>
    </Form>
  )
}

export default UpdateProduct
