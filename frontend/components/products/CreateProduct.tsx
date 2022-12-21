import { gql } from '@apollo/client'
import { FormEvent } from 'react'
import { useCreateProduct } from '../../lib/graphql/hooks/useCreateProduct'
import useForm from '../../lib/hooks/useForm'
import { Form } from '../styles'
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

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    handleProductCreate(clearForm)
  }

  return (
    <Form method='POST' onSubmit={submitHandler}>
      <DisplayError error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
        <label>
          Name
          <input
            required
            aria-required
            id='name'
            type='text'
            name='name'
            value={inputs.name}
            placeholder='product title'
            onChange={inputChangeHandler}
            // onBlur={blurInputHandler}
          />
        </label>

        <label>
          Image
          <input
            required
            aria-required
            id='image'
            type='file'
            name='image'
            onChange={inputChangeHandler}
          />
        </label>

        <label>
          Price
          <input
            required
            aria-required
            id='price'
            type='text'
            name='price'
            value={inputs.price}
            placeholder='100'
            onChange={inputChangeHandler}
          />
        </label>

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
      </fieldset>
    </Form>
  )
}

export default CreateProduct
