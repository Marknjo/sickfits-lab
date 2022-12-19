import type { GetServerSideProps } from 'next'
import Products from '../components/products/AllProducts'
import { productsPaginationConfig } from '../graphql/hooks/useProducts'

import { ALL_PRODUCTS_QUERY } from '../graphql/types'
import { addApolloState, initializeApollo } from '../lib/apolloClient'

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_PRODUCTS_QUERY,
    variables: productsPaginationConfig,
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}

const ProductsPage = () => {
  return (
    <main>
      <Products />
    </main>
  )
}

export default ProductsPage
