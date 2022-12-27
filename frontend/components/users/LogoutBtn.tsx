import { useLogout } from '../../lib/graphql'

export default function LogoutBtn() {
  const { error, logoutHandler } = useLogout()

  if (error) {
    return <p>Internal service error, report to the administrator</p>
  }

  return (
    <button type='button' onClick={logoutHandler}>
      Logout
    </button>
  )
}
