import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { GET_USER_CREDENTIALS, SIGNUP_USER_MUTATION } from '../types'

interface SignupInputs {
  name: string
  email: string
  password: string
}

export function useSignUp() {
  const router = useRouter()
  const [signupUser, { error, loading }] = useMutation(SIGNUP_USER_MUTATION, {
    refetchQueries: [{ query: GET_USER_CREDENTIALS }],
  })

  /// @TODO: Handle errors in a cleaner manner
  async function handleUserSignup(
    inputs: SignupInputs,
    clearInputs: () => void
  ) {
    await signupUser({
      variables: {
        ...inputs,
      },
    })

    if (!error) {
      /// Success clear form inputs and send use to the products order page
      clearInputs()

      router.push('/products')
    }
  }

  return {
    handleUserSignup,
    error,
    loading,
  }
}
