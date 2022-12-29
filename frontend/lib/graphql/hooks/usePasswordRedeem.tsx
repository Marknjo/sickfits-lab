import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { GET_USER_CREDENTIALS, PASSWORD_REDEEM_MUTATION } from '../types'

interface RedeemPasswordInputs {
  email: string
  token: string
  password: string
}

export function usePasswordRedeem() {
  const router = useRouter()
  const [redeemPassword, { error, loading }] = useMutation(
    PASSWORD_REDEEM_MUTATION
  )

  async function handlePasswordRedeem(
    inputs: RedeemPasswordInputs,
    clearFormInputs: () => void
  ) {
    const res = await redeemPassword({
      variables: {
        ...inputs,
      },
    })

    const code = res.data.redeemUserPasswordResetToken?.code

    if (!code) {
      clearFormInputs()
      router.replace('/app-access')
    }

    if (
      code === 'FAILURE' ||
      code === 'TOKEN_EXPIRED' ||
      code === 'TOKEN_REDEEMED'
    ) {
      return {
        message:
          'Password reset failed. Please check your details before trying to reset again!',
      }
    }
  }

  return {
    handlePasswordRedeem,
    loading,
    error,
  }
}
