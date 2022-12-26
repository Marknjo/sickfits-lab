// import Head from 'next/head'
import Products from '../../components/products/AllProducts'
import Pagination from '../../components/products/Pagination'
import { ssrProducts } from '../../lib/ssrProducts'

export const getServerSideProps = async () => {
  return ssrProducts()
}

const ProductsPage = () => {
  return (
    <main>
      <Pagination page={1} />
      <Products />
      <Pagination page={1} />
    </main>
  )
}

export default ProductsPage
