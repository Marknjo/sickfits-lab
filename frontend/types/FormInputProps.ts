import {
  DetailedHTMLProps,
  FormEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from 'react'
import type { FormCommonProps } from './FormCommonProps'

export interface FormInputProps extends FormCommonProps {
  type?: HTMLInputTypeAttribute

  onChangeHandler: (event: FormEvent<HTMLInputElement>) => void

  options?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
}
