import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import type { NormalizedCacheObject } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import {
  concatPagination,
  offsetLimitPagination,
} from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash.isequal'
import { endpoint, prodEndpoint } from '../../config'
import { paginationField } from './paginationField'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject>

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

// this uses apollo-link-http under the hood, so all the options here come from that package

const uploadLink = createUploadLink({
  uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
  fetchOptions: {
    credentials: 'include',
  },
  // pass the headers along from this request. This enables SSR with logged in state
  // headers,
  credentials: 'same-origin',
})

// const httpLink = new HttpLink({
//   uri: 'http://localhost:3000/api/graphql', // Server URL (must be absolute)
//   credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
// })

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // link: from([errorLink, httpLink]),
    link: from([errorLink, uploadLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // @ts-ignore
            products: paginationField(),
          },
        },
      },
    }),
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]

  const store = useMemo(() => initializeApollo(state), [state])

  return store
}
