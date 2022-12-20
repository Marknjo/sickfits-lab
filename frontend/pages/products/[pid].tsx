import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const ProductPage: NextPage = () => {
  const {
    query: { pid },
  } = useRouter()

  return (
    <main>
      <Head>
        <title>Sick Fits | Products Page</title>
      </Head>
      <p>ID: {pid}</p>
    </main>
  )
}

export default ProductPage
