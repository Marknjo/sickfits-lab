import { useMutation } from '@apollo/client'
import { GET_USER_CREDENTIALS, LOGOUT_MUTATION } from '../types'

export function useLogout() {
  const [handleLogout, { error }] = useMutation(LOGOUT_MUTATION, {
    refetchQueries: [{ query: GET_USER_CREDENTIALS }],
  })

  function logoutHandler() {
    handleLogout()
  }

  return {
    logoutHandler,
    error,
  }
}
