import Link from 'next/link'
import { BtnText } from '../styles'

export function PasswordResetExtras() {
  return (
    <>
      <p>
        <small>
          Do not have an account, yet?
          <BtnText type='button'>
            <Link href='/app-access?type=signup'>Sign Up</Link>
          </BtnText>
        </small>
      </p>
      <p>
        <small className='password-reset'>
          Already with Account?
          <BtnText type='button'>
            <Link href='/app-access'>Sign In</Link>
          </BtnText>
        </small>
      </p>
    </>
  )
}
