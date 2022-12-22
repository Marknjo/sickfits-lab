import { uppercaseFirstLetter } from '../../../lib'
import { GenericInputsProps } from '../../../types'

export function LabelWithNestedInput({
  uniqueName,
  children,
}: GenericInputsProps) {
  return (
    <label>
      {uppercaseFirstLetter(uniqueName)}
      {children}
    </label>
  )
}
