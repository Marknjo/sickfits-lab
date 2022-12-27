import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { SIGNIN_USER_MUTATION } from '../types'

interface UserSignInDetails {
  email: string
  password: string
}

export function useUser() {
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
    })

    if (res.data) {
      clearForm()

      /// Redirect user to homepage
      // router.back()
      router.push('/')
    }
  }

  return {
    handleSignIn,
    error,
    data,
    loading,
  }
}
