import {
  DetailedHTMLProps,
  FormEvent,
  TextareaHTMLAttributes,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from 'react'
import { GenericProps } from './GenericProps'

export interface FormCommonProps {
  label?: string
  isRequired?: boolean
  uniqueName: string
  value?: string
  placeholder?: string
  onChangeHandler: (event: any) => void
  options?: object
}

export interface GenericInputsProps extends GenericProps {
  uniqueName: string
  label?: string
  type: HTMLInputTypeAttribute
}

export interface FormPropsInterface extends GenericProps {
  onSubmitHandler: (event: FormEvent<HTMLFormElement>) => void
  error?: any
  method?: 'POST' | 'GET'
  loading?: boolean
}

export interface FormInputProps extends FormCommonProps {
  type?: HTMLInputTypeAttribute

  onChangeHandler: (event: FormEvent<HTMLInputElement>) => void

  options?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
}

export interface FormTextAreaProps extends FormCommonProps {
  onChangeHandler: (event: FormEvent<HTMLTextAreaElement>) => void
  options?: DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
}
