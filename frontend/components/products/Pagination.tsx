import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { perPage } from '../../config'
import { useProductCount } from '../../lib/graphql'
import { PaginationStyles } from '../styles'

const PaginationBoxStyles = styled.section`
  display: flex;
  justify-content: center;
`

function Pagination({ page }: { page: number }) {
  const { productsCount, error, loading } = useProductCount()

  if (error) {
    return (
      <p>
        <small>Pagination Error!</small>
      </p>
    )
  }

  if (loading) {
    return <p>Loading...</p>
  }

  const totalPages = Math.ceil(productsCount / perPage)

  return (
    <PaginationBoxStyles>
      <PaginationStyles>
        <Head>
          <title>
            Sick Fits - Page {page} of {totalPages}
          </title>
        </Head>

        <Link href={`/products/page/${page - 1}`} aria-disabled={page <= 1}>
          &#8672; Prev
        </Link>
        <p>
          Page {page || 1} of {totalPages}
        </p>
        <p>{productsCount} Products Found</p>
        <Link
          href={`/products/page/${totalPages === page ? page : page + 1}`}
          aria-disabled={page >= totalPages}
        >
          {' '}
          Next &#8674;
        </Link>
      </PaginationStyles>
    </PaginationBoxStyles>
  )
}

export default Pagination
