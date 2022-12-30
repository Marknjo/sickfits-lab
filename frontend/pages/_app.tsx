// import { AppInitialProps, AppProps } from 'next/app'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import nProgress from 'nprogress'
import { Router } from 'next/router'

/// Local
import { useApollo } from '../lib/graphql/apolloClient'
import '../components/styles/nprogress.css'
import Page from '../components/layouts/Page'
import { CartStateProvider } from '../lib'
// import { NextPage, NextPageContext } from 'next'

Router.events.on('routeChangeStart', () => nProgress.start())
Router.events.on('routeChangeComplete', () => nProgress.done())
Router.events.on('routeChangeError', () => nProgress.done())

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  )
}

// App.getInitialProps = async function ({
//   Component,
//   ctx,
// }: {
//   Component: NextPage
//   ctx: NextPageContext
// }) {
//   let pageProps: any = {}
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx)
//   }
//   pageProps.query = ctx.query
//   const headers = ctx.req?.headers

//   return { pageProps, headers }
// }

export default App
