import { useForm } from '../../lib'
import { usePasswordReset } from '../../lib/graphql'
import { AppAccessPageStyles, GenericBgStyles } from '../styles'
import { Form, Input } from '../ui'
import { PasswordResetExtras } from './PasswordResetExtras'

export default function PasswordReset() {
  const { inputs, clearForm, inputChangeHandler } = useForm({
    email: '',
  })

  const { loading, error, handlePasswordReset } = usePasswordReset()

  async function userSigninHandler() {
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

          <button>Reset &rarr;</button>
        </Form>

        <div className='extras'>
          <PasswordResetExtras />
        </div>
      </GenericBgStyles>
    </AppAccessPageStyles>
  )
}
