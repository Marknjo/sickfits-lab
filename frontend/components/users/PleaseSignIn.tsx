import { useUser } from '../../lib/graphql'
import { GenericProps } from '../../types'
import { PasswordResetExtras } from './PasswordResetExtras'
import Signin from './Signin'

interface PleaseSignInInterface extends GenericProps {
  isAdminOnly: boolean
}

export default function PleaseSignIn({
  children,
  isAdminOnly,
}: PleaseSignInInterface) {
  const { user } = useUser()

  if (!user) {
    return (
      <main>
        <h2>Please Sign In</h2>
        <Signin />
        <PasswordResetExtras />
      </main>
    )
  }

  if (
    isAdminOnly &&
    user?.role.name !== 'Admin' &&
    user?.role.name !== 'Editor'
  ) {
    return (
      <main>
        <h2>You are trying to view a page restricted page</h2>
      </main>
    )
  }
  return <>{children}</>
}
