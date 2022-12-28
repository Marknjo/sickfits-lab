import { GetServerSideProps } from 'next'
import { useSearchParams } from 'next/navigation'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Signin from '../components/users/Signin'
import { ssrProducts } from '../lib/ssrProducts'
import Signup from '../components/users/SignUp'
import { AppAccessPageLayout } from '../components/styles'

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

    setUserFormType({
      type: defaultTypes,
    })
  }, [requestedFormType])

  const titleDetails =
    userFormType.type === FormType.SIGNIN
      ? 'Sickfits | Sign In'
      : 'Sickfits | Sign Up'
  const isLoginRequest = userFormType.type === FormType.SIGNIN ? true : false

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

  return (
    <>
      <Head>
        <meta name='description' content='Sickfits Signin page' />
        <title>{titleDetails}</title>
      </Head>
      <AppAccessPageLayout>
        <div className='tab-name'>
          {/* if it's signup, Show signin button */}
          {isLoginRequest || (
            <button type='button' onClick={formTypeHandler}>
              Sign In
            </button>
          )}

          {/* if it's signin, Show signup form */}
          {isLoginRequest && (
            <button type='button' onClick={formTypeHandler}>
              Sign Up
            </button>
          )}
        </div>
        <div className='tab-content'>
          {/* if it's signin show signin form */}
          {isLoginRequest && <Signin />}

          {/* if it's not signin show signup form */}
          {isLoginRequest || <Signup />}
        </div>
      </AppAccessPageLayout>
    </>
  )
}
