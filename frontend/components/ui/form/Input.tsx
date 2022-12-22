import { DetailedHTMLProps, FormEvent, InputHTMLAttributes } from 'react'
import { uppercaseFirstLetter } from '../../../lib'

interface FormInputProps {
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

export function Input({
  isRequired,
  uniqueName,
  type,
  value,
  placeholder,
  onChangeHandler,
  options,
}: FormInputProps) {
  return (
    <label>
      {uppercaseFirstLetter(uniqueName)}
      <input
        required={isRequired || !!isRequired}
        aria-required={isRequired || !!isRequired}
        id={uniqueName}
        type={type || 'text'}
        name={uniqueName}
        {...(type === 'file' ? {} : { value })}
        {...(type === 'file' ? {} : { placeholder: placeholder || uniqueName })}
        onChange={onChangeHandler}
        {...options}
      />
    </label>
  )
}
