import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { GET_USER_CREDENTIALS, SIGNIN_USER_MUTATION } from '../types'

interface UserSignInDetails {
  email: string
  password: string
}

export function useSignin() {
  const router = useRouter()
  const [signinUser, { loading, error, data }] =
    useMutation(SIGNIN_USER_MUTATION)

  async function handleSignIn(
    signInInputs: UserSignInDetails,
    clearForm: () => void
  ) {
    const res = await signinUser({
      variables: {
        ...signInInputs,
      },
      refetchQueries: [{ query: GET_USER_CREDENTIALS }],
    })

    const {
      authenticateUserWithPassword: { message },
      authenticateUserWithPassword: { item: user },
    } = res.data

    /// Handle case of error
    if (message) {
      return { message }
    }

    if (user) {
      clearForm()

      /// Redirect user to homepage
      // router.back()
      router.push('/')
    }
  }

  return {
    handleSignIn,
    error,
    loading,
  }
}
