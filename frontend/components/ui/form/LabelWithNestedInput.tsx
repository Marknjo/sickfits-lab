import { uppercaseFirstLetter } from '../../../lib'
import { GenericProps } from '../../../types'

interface GenericInputsProps extends GenericProps {
  uniqueName: string
}

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
