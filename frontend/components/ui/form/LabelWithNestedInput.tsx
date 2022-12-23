import { uppercaseFirstLetter } from '../../../lib'
import { GenericInputsProps } from '../../../types'

export function LabelWithNestedInput({
  uniqueName,
  children,
  label,
  type,
}: GenericInputsProps) {
  return (
    <label>
      {type !== 'hidden' ? label || uppercaseFirstLetter(uniqueName) : ''}
      {children}
    </label>
  )
}
