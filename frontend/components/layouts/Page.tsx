import styled from 'styled-components'
import { GenericProps } from '../../types'
import { GlobalStyles } from '../styles/GlobalStyles'
import Header from '../ui/Header'

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`

export default function Page({ children }: GenericProps) {
  return (
    <>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </>
  )
}
