import Image from 'next/image'
import styled from 'styled-components'
import { ProductInterface } from '../../types/ProductTypes'

const ProductStyles = styled.section`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`

function SingleProduct({
  photo,
  price,
  description,
  name,
  id,
}: ProductInterface) {
  return (
    <ProductStyles>
      <div>
        <Image src={photo.image.url} fill={true} alt={photo.altText} />
      </div>
      <div className='details'>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </ProductStyles>
  )
}

export default SingleProduct
