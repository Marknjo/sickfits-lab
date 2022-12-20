import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import nProgress from 'nprogress'
import { Router } from 'next/router'

/// Local
import { useApollo } from '../lib/graphql/apolloClient'
import '../components/styles/nprogress.css'
import Page from '../components/layouts/Page'

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
