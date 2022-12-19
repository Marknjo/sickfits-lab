import { ssrProducts } from '../lib/ssrProducts'

export { default } from './products'

export const getServerSideProps = async () => {
  return ssrProducts()
}
