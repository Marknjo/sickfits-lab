import { GetServerSideProps } from 'next'
import { useSearchParams } from 'next/navigation'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Signin from '../components/users/Signin'
import { ssrProducts } from '../lib/ssrProducts'
import Signup from '../components/users/SignUp'

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

const UserPageTab = styled.div`
  margin: 0 auto;
  max-width: 60vw;
  display: flex;
  flex-direction: column;

  & > {
    width: 100%;
  }

  .tab-name {
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    text-align: left;

    button,
    input[type='button'] {
      box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
      width: auto;
      /* background: red;
      color: white; */
      color: red;
      background: rgba(0, 0, 0, 0.02);
      border: 0;
      font-size: 2rem;
      font-weight: 600;
      padding: 0.5rem 1.2rem;
      cursor: pointer;
      border-top: 5px solid white;
      border-right: 5px solid white;
      border-left: 5px solid white;
      transition: all 0.3 ease-out;

      &:hover {
        /* background-color: #e00000; */
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
`

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
      <UserPageTab>
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
      </UserPageTab>
    </>
  )
}
