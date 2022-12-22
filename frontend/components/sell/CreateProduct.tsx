import { useCreateProduct } from '../../lib/graphql/hooks/useCreateProduct'
import useForm from '../../lib/hooks/useForm'
import { Form, Input } from '../ui'
import { Textarea } from '../ui/form/Textarea'

interface FormOutputs {
  name: string
  price: number
  description: string
  image: any
}

const CreateProduct = () => {
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

  const { error, loading, handleProductCreate } = useCreateProduct(inputs)

  const submitHandler = () => {
    handleProductCreate(clearForm)
  }

  return (
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
        uniqueName='price'
        type='number'
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

      {/* <button onClick={clearForm} type='button'>
          Clear Form
        </button>
        <button onClick={resetForm} type='reset'>
          Reset Form
        </button> */}
      <button type='submit'>&#x2719; Add Product</button>
    </Form>
  )
}

export default CreateProduct
