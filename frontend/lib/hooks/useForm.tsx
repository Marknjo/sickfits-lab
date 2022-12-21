import { FormEvent, SyntheticEvent, useState } from 'react'

// interface FormInputsOptions {
//   [key: string]: string | number | boolean | File
// }

// export interface FormOutputs<T> {
//   inputs: T
//   inputChangeHandler: (event: HTMLInputElement) => void
//   textAreaChangeHandler: (event: HTMLTextAreaElement) => void
//   resetForm: () => void
//   clearForm: () => void
// }

function useForm<T extends object>(options: T) {
  const [inputs, setInputs] = useState<T>(options || {})

  function formInputHandler<E>(event: FormEvent<E>): void {
    // @ts-ignore
    let { value, name, type } = event.currentTarget

    if (type === 'number') {
      // @ts-ignore
      value = parseInt(value, 10)
    }

    if (type === 'file') {
      // @ts-ignore
      value = event.currentTarget.files[0]
    }

    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  function inputChangeHandler(event: FormEvent<HTMLInputElement>): void {
    formInputHandler<HTMLInputElement>(event)
  }

  function textAreaChangeHandler(event: FormEvent<HTMLTextAreaElement>): void {
    formInputHandler<HTMLTextAreaElement>(event)
  }

  function onInputBlur<I>(event: FormEvent<I>): void {
    // @ts-ignore
    const { name } = event.currentTarget

    const updatedInputs = Object.fromEntries(
      Object.entries(inputs).map(([inputName, inputValue]) => {
        if (inputName === name) {
          return [inputName, '']
        }
        return [inputName, inputValue]
      })
    )
    setInputs({
      ...inputs,
      ...(updatedInputs as T),
    })
  }

  function blurInputHandler(event: FormEvent<HTMLInputElement>) {
    onInputBlur(event)
  }

  function blurTextAreaHandler(event: FormEvent<HTMLTextAreaElement>) {
    onInputBlur(event)
  }

  const resetForm = () => {
    setInputs(options)
  }

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, _]) => [key, ''])
    )

    setInputs(blankState as T)
  }

  return {
    inputs,
    inputChangeHandler,
    textAreaChangeHandler,
    blurTextAreaHandler,
    blurInputHandler,
    resetForm,
    clearForm,
  }
}

export default useForm
