import { useCreateProduct } from '../../lib/graphql/hooks/useCreateProduct'
import { useForm } from '../../lib'
import { Form, Input } from '../ui'
import { Textarea } from '../ui/form/Textarea'
import { ProductFormOutputs } from '../../types'
import { GenericBgStyles } from '../styles'

const CreateProduct = () => {
  const {
    inputs,
    inputChangeHandler,
    textAreaChangeHandler,
    clearForm,
    // blurInputHandler,
    // resetForm,
  } = useForm<ProductFormOutputs>({
    name: '',
    price: 0,
    description: '',
    image: '',
  })

  const { error, loading, handleProductCreate } = useCreateProduct(inputs)

  const submitHandler = () => {
    handleProductCreate(clearForm)
  }

  return (
    <GenericBgStyles>
      <Form onSubmitHandler={submitHandler} error={error} loading={loading}>
        <Input
          uniqueName='name'
          value={inputs.name}
          placeholder='product title'
          onChangeHandler={inputChangeHandler}
          isRequired={true}
        />

        <Input
          uniqueName='image'
          type='file'
          onChangeHandler={inputChangeHandler}
          isRequired={true}
        />

        <Input
          label='Price (in USD Cents)'
          uniqueName='price'
          type='number'
          value={`${inputs.price}`}
          onChangeHandler={inputChangeHandler}
          isRequired={true}
          placeholder={'$100'}
          options={{
            min: 1,
          }}
        />

        <Textarea
          uniqueName='description'
          onChangeHandler={textAreaChangeHandler}
          isRequired={true}
          placeholder={'Add your Description'}
          value={inputs.description}
        />

        {/* <button onClick={clearForm} type='button'>
          Clear Form
        </button>
        <button onClick={resetForm} type='reset'>
          Reset Form
        </button> */}
        <button type='submit'>&#x2719; Add Product</button>
      </Form>
    </GenericBgStyles>
  )
}

export default CreateProduct
