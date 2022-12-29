import { useMutation } from '@apollo/client'
import { PASSWORD_FORGET_MUTATION } from '../types'

export function usePasswordForget() {
  const [resetUserPassword, { loading, error }] = useMutation(
    PASSWORD_FORGET_MUTATION
  )

  async function handlePasswordForget(
    email: string,
    clearFormInputs: () => void
  ) {
    const res = await resetUserPassword({
      variables: {
        email,
      },
    })

    /// @TODO: Implement proper feedback after successful email password reset request
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
    handlePasswordForget,
    error,
    loading,
  }
}
