import Link from 'next/link'
import { useForm } from '../../lib'
import { useSignUp } from '../../lib/graphql'
import { Form, Input } from '../ui'

export default function Signup() {
  const { inputs, clearForm, inputChangeHandler } = useForm({
    email: '',
    password: '',
    name: '',
  })

  const { loading, error, handleUserSignup } = useSignUp()

  async function userSigninHandler() {
    await handleUserSignup(inputs, clearForm)
  }

  return (
    <Form
      error={error}
      onSubmitHandler={userSigninHandler}
      loading={loading}
      method='POST'
    >
      <div
        style={{
          marginTop: '1.5rem',
        }}
      ></div>

      {/* Implementation of the form with unique names capitalized does not work */}
      <Input
        uniqueName='name'
        type='name'
        value={inputs.name}
        onChangeHandler={inputChangeHandler}
        isRequired={true}
      />

      <Input
        uniqueName='email'
        type='email'
        value={inputs.email}
        onChangeHandler={inputChangeHandler}
        isRequired={true}
      />

      <Input
        uniqueName='password'
        type='password'
        value={inputs.password}
        onChangeHandler={inputChangeHandler}
        isRequired={true}
      />

      <button>Sign Up</button>

      <div className='extras'>
        <p>
          <small>
            Have an account?
            <Link href='/app-access?type=signin'> Signin Here</Link>
          </small>
        </p>
      </div>
    </Form>
  )
}
