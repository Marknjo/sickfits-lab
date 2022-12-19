import { GetServerSideProps } from 'next'
import { productsPaginationConfig } from '../graphql/hooks/useProducts'
import { ALL_PRODUCTS_QUERY } from '../graphql/types'
import { addApolloState, initializeApollo } from '../lib/apolloClient'

export { default } from './products'

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
