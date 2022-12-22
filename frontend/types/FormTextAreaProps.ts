import { DetailedHTMLProps, FormEvent, TextareaHTMLAttributes } from 'react'
import { FormCommonProps } from './FormCommonProps'

export interface FormTextAreaProps extends FormCommonProps {
  onChangeHandler: (event: FormEvent<HTMLTextAreaElement>) => void
  options?: DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
}
