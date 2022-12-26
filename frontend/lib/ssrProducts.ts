import { productsPaginationConfig } from './graphql/hooks/useProducts'
import { PRODUCTS_PAGINATION_QUERY } from './graphql/types'
import { addApolloState, initializeApollo } from './graphql/apolloClient'

export async function ssrProducts<T extends object>(props?: T) {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: PRODUCTS_PAGINATION_QUERY,
    variables: productsPaginationConfig,
  })

  return addApolloState(apolloClient, {
    props: {
      ...(props ? props : {}),
    },
  })
}
