import Head from 'next/head'
import PasswordForget from '../components/users/PasswordForget'

export default function PasswordForgetPage() {
  return (
    <main>
      <Head>
        <title>Sickfits | Password Reset Page</title>
      </Head>
      <PasswordForget />
    </main>
  )
}
