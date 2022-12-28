import Link from 'next/link'
import { useState } from 'react'
import { useForm } from '../../lib'
import { useSignin } from '../../lib/graphql'
import { BtnText } from '../styles'
import { Form, Input } from '../ui'

export function SignInExtras({
  onClickHandler,
}: {
  onClickHandler: () => void
}) {
  return (
    <>
      <p>
        <small>
          Do not have an account, yet?
          <BtnText type='button' onClick={onClickHandler}>
            Signup Here
          </BtnText>
        </small>
      </p>
      <p>
        <small className='password-reset'>
          Forgot Password?
          <BtnText type='button'>
            <Link href='/password-forget'>Request Reset</Link>
          </BtnText>
        </small>
      </p>
    </>
  )
}

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
    </Form>
  )
}
