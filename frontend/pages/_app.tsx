import { AppProps } from 'next/app'
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client'
import nProgress from 'nprogress'
import { Router } from 'next/router'

/// Local

import '../components/styles/nprogress.css'

import Page from '../components/layouts/Page'
import { useApollo } from '../lib/apolloClient'
import { NextComponentType, NextPageContext } from 'next'

Router.events.on('routeChangeStart', () => nProgress.start())
Router.events.on('routeChangeComplete', () => nProgress.done())
Router.events.on('routeChangeError', () => nProgress.done())

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  )
}

export default App
