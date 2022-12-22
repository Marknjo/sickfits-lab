import Image from 'next/image'
import styled from 'styled-components'
import { formatMoney } from '../../lib/formatMoney'
import { ProductInterface } from '../../types/ProductTypes'
import { SickButton } from '../styles'

const ProductStyles = styled.section`
  padding-top: 2.4rem;
  padding-bottom: 2.4rem;
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

function SingleProduct({ product }: { product: ProductInterface }) {
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
