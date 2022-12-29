import { useForm } from '../../lib'
import { usePasswordForget } from '../../lib/graphql'
import { AppAccessPageStyles, GenericBgStyles } from '../styles'
import { Form, Input } from '../ui'
import { PasswordResetExtras } from './PasswordResetExtras'

export default function PasswordForget() {
  const { inputs, clearForm, inputChangeHandler } = useForm({
    email: '',
  })

  const { loading, error, handlePasswordForget } = usePasswordForget()

  async function passwordForgetHandler() {
    handlePasswordForget(inputs.email, clearForm)
  }

  return (
    <AppAccessPageStyles>
      <div className='tab-name'>
        <h2>Enter Your Email</h2>
      </div>
      <GenericBgStyles>
        <Form
          error={error}
          onSubmitHandler={passwordForgetHandler}
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

          <button>Send Request &rarr;</button>
        </Form>

        <div className='extras'>
          <PasswordResetExtras />
        </div>
      </GenericBgStyles>
    </AppAccessPageStyles>
  )
}
