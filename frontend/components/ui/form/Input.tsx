import { FormInputProps } from '../../../types'
import { LabelWithNestedInput } from './LabelWithNestedInput'

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
    <LabelWithNestedInput uniqueName={uniqueName}>
      <input
        required={isRequired || !!isRequired}
        aria-required={isRequired || !!isRequired}
        id={uniqueName}
        type={type || 'text'}
        name={uniqueName}
        onChange={onChangeHandler}
        {...(type === 'file' ? {} : { value })}
        {...(type === 'file' ? {} : { placeholder: placeholder || uniqueName })}
        {...options}
      />
    </LabelWithNestedInput>
  )
}
