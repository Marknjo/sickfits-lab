import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import SingleProduct from '../../components/products/SingleProduct'
import DisplayError from '../../components/ui/ErrorMessage'
import { useProduct } from '../../lib/graphql/hooks/useProduct'

const ProductPage: NextPage = () => {
  const router = useRouter()

  const {
    query: { pid },
  } = router

  const productId = (pid as string) || ''

  const { product, loading, error } = useProduct(productId)

  if (error) {
    return <DisplayError error={error} />
  }

  if (loading) {
    return <p></p>
  }

  if (!product) {
    router.push('/404')
    return <p>Product ${productId} not found!</p>
  }

  return (
    <main>
      <Head>
        <meta name='description' content={product.description} />
        <title>Sick Fits | {product.name}</title>
      </Head>
      <SingleProduct product={product} />
    </main>
  )
}

export default ProductPage
