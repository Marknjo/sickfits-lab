import Link from 'next/link'
import { useState } from 'react'
import { useForm } from '../../lib'
import { useSignin } from '../../lib/graphql'
import { Form, Input } from '../ui'

export default function Signin() {
  const [isFailedLogin, setIsFailedLogin] = useState(false)

  const { inputs, clearForm, inputChangeHandler } = useForm({
    email: '',
    password: '',
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

      <button>Sign In</button>

      <div className='extras'>
        <p>
          <small>
            Do not have an account, yet?
            <Link href='/app-access?type=signup'> Signup Here</Link>
          </small>
        </p>
      </div>
    </Form>
  )
}
