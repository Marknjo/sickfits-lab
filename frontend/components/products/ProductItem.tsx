import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { formatMoney } from '../../lib/formatMoney'
import { ProductInterface } from '../../types'
import { Item, PriceTag, Title } from '../styles'

const ImageBoxStyle = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;

  grid-column: 1 / -1;
  grid-row: 1 / -1;
  z-index: 4;
`

const TitleBoxStyle = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / -1;
  align-self: end;
  z-index: 5;
`

const Product = ({ id, name, photo, price }: ProductInterface) => (
  <Item key={id}>
    <ImageBoxStyle>
      <Image
        src={photo.image.url}
        alt={photo.altText}
        // quality={75}
        sizes='(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw'
        fill={true}
        priority
      />
    </ImageBoxStyle>

    <TitleBoxStyle>
      <Title>
        <Link href={`./products/${id}`}>{name}</Link>
      </Title>
    </TitleBoxStyle>
    <PriceTag>{formatMoney(price)}</PriceTag>

    <div className='button-list'>
      <div>
        <Link
          href={{
            pathname: `sell/${id}/update`,
          }}
        >
          Edit ✏️
        </Link>
      </div>
      <div>
        <Link
          href={{
            pathname: 'sell',
            query: {
              id,
            },
          }}
        >
          Delete 🗑️
        </Link>
      </div>
    </div>
  </Item>
)

export default Product
