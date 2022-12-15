import { AppProps } from 'next/app'
import nProgress from 'nprogress'
import { Router } from 'next/router'
import Page from '../components/layouts/Page'
import '../components/styles/nprogress.css'

Router.events.on('routeChangeStart', () => nProgress.start())
Router.events.on('routeChangeComplete', () => nProgress.done())
Router.events.on('routeChangeError', () => nProgress.done())

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  )
}
