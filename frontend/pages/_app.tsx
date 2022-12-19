/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import nProgress from 'nprogress'
import { Router } from 'next/router'

/// Local
import Page from '../components/layouts/Page'
import '../components/styles/nprogress.css'
import { useApollo } from '../lib/apolloClient'

Router.events.on('routeChangeStart', () => nProgress.start())
Router.events.on('routeChangeComplete', () => nProgress.done())
Router.events.on('routeChangeError', () => nProgress.done())

export default function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  )
}
