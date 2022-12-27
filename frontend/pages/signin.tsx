import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Signin from '../components/users/Signin'
import { ssrProducts } from '../lib/ssrProducts'

export const getServerSideProps: GetServerSideProps = async () => {
  return ssrProducts()
}

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
