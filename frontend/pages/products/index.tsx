// import Head from 'next/head'
import { useRouter } from 'next/router'
import Products from '../../components/products/AllProducts'
import Pagination from '../../components/products/Pagination'
import { perPage } from '../../config'
import { useProducts } from '../../lib/graphql'
import { ssrProducts } from '../../lib/ssrProducts'

export const getServerSideProps = async () => {
  return ssrProducts()
}

const ProductsPage = () => {
  const router = useRouter()

  const { query } = router
  const pageQueryResults = query.page || 1
  const currentPage = parseInt(pageQueryResults as string, 10)
  const skip = perPage * (currentPage - 1)
  const { products, loading } = useProducts(skip)

  if (loading) {
    return <p>Loading...</p>
  }

  if (products?.length === 0) {
    return <p>No Products in the Collection</p>
  }

  return (
    <main>
      <Pagination page={currentPage} />
      <Products products={products} />
      <Pagination page={currentPage} />
    </main>
  )
}

export default ProductsPage
