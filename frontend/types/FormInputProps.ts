import { DetailedHTMLProps, FormEvent, InputHTMLAttributes } from 'react'

export interface FormInputProps {
  isRequired?: boolean
  uniqueName: string
  type?: string
  value?: string
  placeholder?: string
  onChangeHandler: (event: FormEvent<HTMLInputElement>) => void
  options?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
}
