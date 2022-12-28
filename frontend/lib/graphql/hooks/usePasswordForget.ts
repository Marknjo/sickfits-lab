import { useMutation } from '@apollo/client'
import { PASSWORD_FORGET_MUTATION } from '../types'

export function usePasswordForget() {
  const [resetUserPassword, { loading, error }] = useMutation(
    PASSWORD_FORGET_MUTATION
  )

  async function handlePasswordReset(
    email: string,
    clearFormInputs: () => void
  ) {
    const res = await resetUserPassword({
      variables: {
        email,
      },
    })

    console.log(res)

    if (res.data?.sendUserPasswordResetLink) {
      clearFormInputs()

      return {
        message: 'A password token was sent to your email',
      }
    }
    /// Anything beyond here is errors
    /// @TODO: implement proper error handling for emails which cannot be found
  }

  return {
    handlePasswordReset,
    error,
    loading,
  }
}
