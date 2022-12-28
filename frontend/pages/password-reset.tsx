import Head from 'next/head'
import PasswordReset from '../components/users/PasswordReset'

export default function PasswordResetPage() {
  return (
    <main>
      <Head>
        <title>Sickfits | Password Reset Page</title>
      </Head>
      <PasswordReset />
    </main>
  )
}
