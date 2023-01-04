import { GetServerSideProps } from 'next'
import { useSearchParams } from 'next/navigation'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Signin, { SignInExtras } from '../components/users/Signin'
import { ssrProducts } from '../lib/ssrProducts'
import Signup, { SignUpExtras } from '../components/users/SignUp'
import { AppAccessPageStyles, GenericBgStyles } from '../components/styles'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async () => {
  return ssrProducts()
}

enum FormType {
  SIGNIN = 'signin',
  SIGNUP = 'signup',
}

interface UserFormStatus {
  type: FormType
}

export default function UserAppAccessPage() {
  const query = useSearchParams()

  const requestType = query.get('type') as FormType
  const requestedFormType: FormType = requestType || FormType.SIGNIN

  const [userFormType, setUserFormType] = useState<UserFormStatus>({
    type: FormType.SIGNIN,
  })

  /// Set default form type
  useEffect(() => {
    let defaultTypes = requestedFormType

    const types = [FormType.SIGNIN, FormType.SIGNUP]

    /// Any other url search param provided should be overwritten to signin form type
    if (!types.includes(defaultTypes)) {
      defaultTypes = FormType.SIGNIN
    }

    setUserFormType(prev => {
      if (prev.type === FormType.SIGNIN && defaultTypes) {
        return {
          type: FormType.SIGNUP,
        }
      }
      return {
        type: FormType.SIGNIN,
      }
    })
  }, [requestedFormType])

  function formTypeHandler() {
    setUserFormType(prev => {
      if (prev.type === FormType.SIGNIN) {
        return {
          type: FormType.SIGNUP,
        }
      }
      return {
        type: FormType.SIGNIN,
      }
    })
  }

  const titleDetails =
    userFormType.type === FormType.SIGNIN
      ? 'Sickfits | Sign In'
      : 'Sickfits | Sign Up'
  const isLoginRequest = userFormType.type === FormType.SIGNIN ? true : false

  return (
    <>
      <Head>
        <meta name='description' content='Sickfits Signin page' />
        <title>{titleDetails}</title>
      </Head>
      <AppAccessPageStyles>
        <div className='tab-name'>
          {/* if it's signup, Show signin button */}
          {isLoginRequest && <h2>Fill Your Details To Sign In</h2>}

          {/* if it's signin, Show signup button */}
          {isLoginRequest || <h2>Fill Your Details to Join Sickfits</h2>}
        </div>
        <GenericBgStyles>
          {/* if it's signin show signin form */}
          {isLoginRequest && <Signin />}

          {/* if it's not signin show signup form */}
          {isLoginRequest || <Signup />}

          <div className='extras'>
            {isLoginRequest && (
              <SignInExtras onClickHandler={formTypeHandler} />
            )}
            {isLoginRequest || (
              <SignUpExtras onClickHandler={formTypeHandler} />
            )}
          </div>
        </GenericBgStyles>
      </AppAccessPageStyles>
    </>
  )
}
