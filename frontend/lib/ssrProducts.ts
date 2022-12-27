// import { productsPaginationConfig } from './graphql/hooks/useProducts'
import { PRODUCTS_PAGINATION_QUERY } from './graphql/types'
import { addApolloState, initializeApollo } from './graphql/apolloClient'
import { perPage } from '../config'

export async function ssrProducts<T extends object>(
  headers?: { [key: string]: any },
  props?: T
) {
  const apolloClient = initializeApollo(headers)

  await apolloClient.query({
    query: PRODUCTS_PAGINATION_QUERY,
    variables: {
      skip: 0,
      take: perPage,
    },
  })

  return addApolloState(apolloClient, {
    props: {
      ...(props ? props : {}),
    },
  })
}
