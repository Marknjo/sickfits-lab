import { AppProps } from "next/app";
import Page from "../components/layouts/Page";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
