import Head from 'next/head'
import Signin from '../components/users/Signin'

export default function SigninPage() {
  return (
    <>
      <Head>
        <meta name='description' content='Sickfits Signin page' />
        <title>Sign In</title>
      </Head>
      <Signin />
    </>
  )
}
