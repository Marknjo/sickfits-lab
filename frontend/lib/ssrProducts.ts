import { productsPaginationConfig } from '../graphql/hooks/useProducts'
import { ALL_PRODUCTS_QUERY } from '../graphql/types'
import { addApolloState, initializeApollo } from './apolloClient'

export async function ssrProducts<T extends object>(props?: T) {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_PRODUCTS_QUERY,
    variables: productsPaginationConfig,
  })

  return addApolloState(apolloClient, {
    props: {
      ...(props ? props : {}),
    },
  })
}
