import Head from 'next/head'
import { useRouter } from 'next/router'
import UpdateProduct from '../../../components/sell/UpdateProduct'
import { DisplayError } from '../../../components/ui'
import PleaseSignIn from '../../../components/users/PleaseSignIn'
import { useProduct } from '../../../lib/graphql'

function UpdateProductPage() {
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
      <PleaseSignIn isAdminOnly={true}>
        <Head>
          <meta name='description' content={product.description} />
          <title>Sick Fits | Update {product.name}</title>
        </Head>
        <h2>Update {product.name}</h2>
        <UpdateProduct product={product} />
      </PleaseSignIn>
    </main>
  )
}

export default UpdateProductPage
