import { FormEvent } from 'react'
import { useCreateProduct } from '../../lib/graphql/hooks/useCreateProduct'
import useForm from '../../lib/hooks/useForm'
import { Form, Input } from '../ui'
import DisplayError from '../ui/ErrorMessage'

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

      <label>
        Description
        <textarea
          id='description'
          name='description'
          value={inputs.description}
          placeholder='Add your Description'
          onChange={textAreaChangeHandler}
        ></textarea>
      </label>

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
