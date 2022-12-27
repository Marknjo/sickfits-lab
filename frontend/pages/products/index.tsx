// import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Products from '../../components/products/AllProducts'
import Pagination from '../../components/products/Pagination'
import { ssrProducts } from '../../lib/ssrProducts'

export const getServerSideProps: GetServerSideProps = async () => {
  return ssrProducts()
}

const ProductsPage = () => {
  const router = useRouter()

  const { query } = router
  const pageQueryResults = query.page || 1
  const currentPage = parseInt(pageQueryResults as string, 10)

  return (
    <main>
      <Pagination page={currentPage} />
      <Products page={currentPage} />
      <Pagination page={currentPage} />
    </main>
  )
}

export default ProductsPage
