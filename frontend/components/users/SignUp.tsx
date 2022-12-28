import Link from 'next/link'
import { useState } from 'react'
import { useForm } from '../../lib'
import { useSignin } from '../../lib/graphql'
import { Form, Input } from '../ui'

export default function Signup() {
  const [isFailedLogin, setIsFailedLogin] = useState(false)

  const { inputs, clearForm, inputChangeHandler } = useForm({
    email: '',
    password: '',
    name: '',
  })

  const { loading, error, handleSignIn } = useSignin()

  async function userSigninHandler() {
    const res = await handleSignIn(inputs, clearForm)

    if (res?.message) {
      setIsFailedLogin(true)
    }
  }

  const formErrors = error
    ? error
    : isFailedLogin
    ? { message: 'Password or Email Invalid!' }
    : ''

  return (
    <Form
      error={formErrors}
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

      <button>Signup In</button>

      <div className='extras'>
        <p>
          <small>
            Have an account?
            <Link href='/app-access?type=login'> Signin here</Link>
          </small>
        </p>
      </div>
    </Form>
  )
}
