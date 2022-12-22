import { FormEvent } from 'react'
import { BasicProps } from '../../../types/BasicProps'
import { FormStyles } from '../../styles'
import DisplayError from '../ErrorMessage'

interface FormPropsInterface extends BasicProps {
  onSubmitHandler: (event: FormEvent<HTMLFormElement>) => void
  error?: any
  method?: 'POST' | 'GET'
  loading?: boolean
}

export function Form({
  method,
  onSubmitHandler,
  error,
  children,
  loading,
}: FormPropsInterface) {
  /// Handler submission
  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmitHandler(event)
  }

  return (
    <FormStyles method={method || 'POST'} onSubmit={submitHandler}>
      {error && <DisplayError error={error} />}
      <fieldset disabled={!!loading} aria-busy={!!loading}>
        {children}
      </fieldset>
    </FormStyles>
  )
}
