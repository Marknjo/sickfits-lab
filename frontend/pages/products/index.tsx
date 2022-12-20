import Head from 'next/head'
import Products from '../../components/products/AllProducts'
import { ssrProducts } from '../../lib/ssrProducts'

export const getServerSideProps = async () => {
  return ssrProducts()
}

const ProductsPage = () => {
  return (
    <main>
      <Head>
        <title>Sick Fits | Products Page</title>
      </Head>
      <Products />
    </main>
  )
}

export default ProductsPage
