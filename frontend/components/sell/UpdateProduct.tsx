import { useUpdateProduct } from '../../lib/graphql'
import { useForm } from '../../lib'
import type {
  ProductFormOutputs,
  ProductInterface,
  // @TODO: implement select options for status - ProductStatusesEnum,
} from '../../types'
import { Form, Input } from '../ui'
import { Textarea } from '../ui/form/Textarea'

function UpdateProduct({ product }: { product: ProductInterface }) {
  const { id, price, description, name, status } = product
  const {
    inputs,
    inputChangeHandler,
    textAreaChangeHandler,
    clearForm,
    // blurInputHandler,
    // resetForm,
  } = useForm<ProductFormOutputs>({
    name: name || '',
    price: price || 1,
    description: description || '',
    status: status || 'DRAFT',
    id: id || '',
  })

  const { handleProductUpdate, error, loading } = useUpdateProduct(inputs)

  const submitHandler = () => {
    handleProductUpdate(clearForm)
  }

  return (
    <Form loading={loading} error={error} onSubmitHandler={submitHandler}>
      <Input
        uniqueName='name'
        value={inputs.name}
        placeholder='product title'
        onChangeHandler={inputChangeHandler}
        isRequired={true}
      />

      <Input
        uniqueName='id'
        value={id}
        type='hidden'
        onChangeHandler={inputChangeHandler}
      />

      <Input
        label='Price (USD Cents)'
        uniqueName='price'
        type='number'
        value={`${inputs.price}`}
        onChangeHandler={inputChangeHandler}
        isRequired={true}
        placeholder={'100'}
        options={{
          min: 1,
        }}
      />

      <Textarea
        uniqueName='description'
        onChangeHandler={textAreaChangeHandler}
        isRequired={true}
        placeholder={'Add your Description'}
      />

      <button type='submit'>Update Product</button>
    </Form>
  )
}

export default UpdateProduct
