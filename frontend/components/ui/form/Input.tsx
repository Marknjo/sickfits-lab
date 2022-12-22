import { uppercaseFirstLetter } from '../../../lib'
import { FormInputProps } from '../../../types'

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
