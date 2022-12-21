import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { formatMoney } from '../../lib/formatMoney'
import { useProduct } from '../../lib/graphql/hooks/useProduct'
import { SickButton } from '../styles'
import DisplayError from '../ui/ErrorMessage'

const ProductStyles = styled.section`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;

  img {
    width: auto;
    height: auto;
    /* object-fit: contain; */
  }

  .details {
    padding: 2rem 0;
  }
`

const ImageBoxStyle = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border: 8px solid var(--red);
  box-sizing: border-box;

  /* grid-column: 1 / -1;
  grid-row: 1 / -1;
  z-index: 4; */
`

const MoneyBoxStyles = styled.p`
  background: var(--black);
  color: white;
  font-weight: 600;
  padding: 0.8rem 1rem;
  line-height: 1;
  font-size: 3rem;
  display: inline-block;
  /* box-shadow: var(--bs); */
`

const ActionBoxStyles = styled.div`
  display: flex;
  gap: 4rem;
`

function SingleProduct() {
  const router = useRouter()

  const {
    query: { pid },
  } = router

  const productId = (pid as string) || ''

  const { product, loading, error } = useProduct(productId)

  if (error) {
    return <DisplayError error={error} />
  }

  if (loading) {
    return <p></p>
  }

  if (!product) {
    router.push('/404')
    return <p>Product ${productId} not found!</p>
  }

  console.log(product)

  const { photo, price, description, name } = product

  return (
    <ProductStyles>
      <ImageBoxStyle>
        <Image
          src={photo.image.url}
          fill={true}
          alt={photo.altText}
          sizes='(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw'
          priority
        />
      </ImageBoxStyle>
      <div className='details'>
        <h2>{name}</h2>
        <p>{description}</p>

        {/* @TODO: Add Order button */}
        <ActionBoxStyles>
          <MoneyBoxStyles>{formatMoney(price)}</MoneyBoxStyles>
          <SickButton type='button'>Order Now</SickButton>
        </ActionBoxStyles>
      </div>
    </ProductStyles>
  )
}

export default SingleProduct
