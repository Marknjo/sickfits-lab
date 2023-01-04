import { useUser } from '../../lib/graphql'
import { GenericProps } from '../../types'
import Signin from './Signin'

export default function PleaseSignIn({ children }: GenericProps) {
  const { user } = useUser()

  if (!user)
    return (
      <main>
        <h2>Please Sign In</h2>
        <Signin />
      </main>
    )
  return <>{children}</>
}
