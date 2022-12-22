import { uppercaseFirstLetter } from '../../../lib'
import { FormTextAreaProps } from '../../../types'

export function Textarea({
  isRequired,
  uniqueName,
  value,
  placeholder,
  onChangeHandler,
  options,
}: FormTextAreaProps) {
  const generatedPlaceholder = placeholder || uniqueName

  return (
    <label>
      {uppercaseFirstLetter(uniqueName)}
      <textarea
        required={isRequired || !!isRequired}
        aria-required={isRequired || !!isRequired}
        id={uniqueName}
        name={uniqueName}
        value={value}
        placeholder={generatedPlaceholder}
        onChange={onChangeHandler}
        {...options}
      >
        {generatedPlaceholder}
      </textarea>
    </label>
  )
}
