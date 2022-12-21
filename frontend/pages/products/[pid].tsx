import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import SingleProduct from '../../components/products/SingleProduct'

const ProductPage: NextPage = () => {
  const {
    query: { pid },
  } = useRouter()

  return (
    <main>
      <Head>
        <title>Sick Fits | Products Page</title>
      </Head>
      <SingleProduct />
    </main>
  )
}

export default ProductPage
