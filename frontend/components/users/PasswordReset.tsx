import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from '../../lib'
import { usePasswordRedeem } from '../../lib/graphql'
import { AppAccessPageStyles, GenericBgStyles } from '../styles'
import { Form, Input } from '../ui'
import { PasswordResetExtras } from './PasswordResetExtras'

export default function PasswordReset() {
  const [genericErrorMessage, setGenericErrorMessage] = useState<{
    message: string
  } | null>()

  const param = useSearchParams()

  const token = param.get('token')

  const { inputs, clearForm, inputChangeHandler } = useForm({
    email: '',
    token: token || '',
    password: '',
  })

  const { loading, error, handlePasswordRedeem } = usePasswordRedeem()

  async function passwordResetHandler() {
    const res = await handlePasswordRedeem(inputs, clearForm)
    if (res?.message) {
      setGenericErrorMessage(res)
    }
  }

  const formErrors = error
    ? error
    : genericErrorMessage
    ? genericErrorMessage
    : ''

  return (
    <AppAccessPageStyles>
      <div className='tab-name'>
        <h2>Reset Your Password</h2>
      </div>
      <GenericBgStyles>
        <Form
          error={formErrors}
          onSubmitHandler={passwordResetHandler}
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
            uniqueName='token'
            type='hidden'
            value={inputs.token}
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

          <button type='submit'>Reset Your Password &rarr;</button>
        </Form>

        <div className='extras'>
          <PasswordResetExtras />
        </div>
      </GenericBgStyles>
    </AppAccessPageStyles>
  )
}
