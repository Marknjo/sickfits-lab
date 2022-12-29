import { useSearchParams } from 'next/navigation'
import { useForm } from '../../lib'
import { usePasswordForget } from '../../lib/graphql'
import { AppAccessPageStyles, GenericBgStyles } from '../styles'
import { Form, Input } from '../ui'
import { PasswordResetExtras } from './PasswordResetExtras'

export default function PasswordReset() {
  const param = useSearchParams()

  const token = param.get('token')

  const { inputs, clearForm, inputChangeHandler } = useForm({
    email: '',
    token: token || '',
    password: '',
  })

  const { loading, error, handlePasswordReset } = usePasswordForget()

  async function passwordResetHandler() {
    handlePasswordReset(inputs.email, clearForm)
  }

  return (
    <AppAccessPageStyles>
      <div className='tab-name'>
        <h2>Reset Your Password</h2>
      </div>
      <GenericBgStyles>
        <Form
          error={error}
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
            uniqueName='hidden'
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
