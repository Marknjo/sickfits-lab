import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { PaginationStyles } from '../styles'

const PaginationBoxStyles = styled.section`
  display: flex;
  justify-content: center;
`

function Pagination({ page }: { page: number }) {
  return (
    <PaginationBoxStyles>
      <PaginationStyles>
        <Head>
          <title>Sick Fits - Page {page} of ___</title>
        </Head>

        <Link href='#'> ⬅️ Prev</Link>
        <p>Page __ of __</p>
        <p>__ Items Total</p>
        <Link href='#'> Next ➡️</Link>
      </PaginationStyles>
    </PaginationBoxStyles>
  )
}

export default Pagination
