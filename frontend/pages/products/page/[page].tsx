import { GetServerSideProps } from 'next'
import { ssrProducts } from '../../../lib/ssrProducts'

export { default } from '../'

export const getServerSideProps: GetServerSideProps = async () => {
  return ssrProducts()
}
