import { FormInputProps } from '../../../types'
import { LabelWithNestedInput } from './LabelWithNestedInput'

export function Input({
  isRequired,
  uniqueName,
  type,
  value,
  placeholder,
  onChangeHandler,
  label,
  options,
}: FormInputProps) {
  const useType = type || 'text'

  return (
    <LabelWithNestedInput label={label} uniqueName={uniqueName} type={useType}>
      <input
        required={isRequired || !!isRequired}
        aria-required={isRequired || !!isRequired}
        id={uniqueName}
        type={useType}
        name={uniqueName}
        onChange={onChangeHandler}
        {...(type === 'file' ? {} : { value })}
        {...(type === 'file' ? {} : { placeholder: placeholder || uniqueName })}
        {...options}
      />
    </LabelWithNestedInput>
  )
}
