import { FormEvent } from 'react'
import { GenericProps } from './GenericProps'

export interface FormPropsInterface extends GenericProps {
  onSubmitHandler: (event: FormEvent<HTMLFormElement>) => void
  error?: any
  method?: 'POST' | 'GET'
  loading?: boolean
}
