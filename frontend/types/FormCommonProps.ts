export interface FormCommonProps {
  isRequired?: boolean
  uniqueName: string
  value?: string
  placeholder?: string
  onChangeHandler: (event: any) => void
  options?: object
}
