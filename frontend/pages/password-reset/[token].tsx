import Head from 'next/head'
import { useSearchParams, useRouter } from 'next/navigation'
import PasswordReset from '../../components/users/PasswordReset'

export default function PasswordResetPage() {
  return (
    <>
      <Head>
        <title>Sickfits | Password Reset</title>
      </Head>
      <main>
        <PasswordReset />
      </main>
    </>
  )
}
