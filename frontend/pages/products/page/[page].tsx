import { ssrProducts } from '../../../lib/ssrProducts'

export { default } from '../'

export const getServerSideProps = async () => {
  return ssrProducts()
}
