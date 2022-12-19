import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import nProgress from 'nprogress'
import { Router } from 'next/router'

/// Local

import '../components/styles/nprogress.css'

import Page from '../components/layouts/Page'
import { useApollo } from '../lib/apolloClient'

Router.events.on('routeChangeStart', () => nProgress.start())
Router.events.on('routeChangeComplete', () => nProgress.done())
Router.events.on('routeChangeError', () => nProgress.done())

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  )
}
