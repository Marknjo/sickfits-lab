import { FormEvent } from 'react'
import useForm from '../../lib/hooks/useForm'
import { Form } from '../styles'

interface FormOutputs {
  name: string
  price: number
  description: string
}

const CreateProduct = () => {
  const {
    inputs,
    inputChangeHandler,
    textAreaChangeHandler,
    // clearForm,
    // resetForm,
  } = useForm<FormOutputs>({
    name: 'Nice Shoes',
    price: 34234,
    description: 'These are the best shoes',
  })

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.table(inputs)
  }

  return (
    <Form method='POST' onSubmit={submitHandler}>
      <fieldset>
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
