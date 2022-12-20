import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { ProductInterface } from '../../types/ProductTypes'
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
  grid-row: 3 / -1;
  grid-column: 1 / -1;
  z-index: 5;
`

const Product = ({
  id,
  name,
  description,
  photo,
  price,
  status,
}: ProductInterface) => (
  <Item key={id}>
    <ImageBoxStyle>
      <Image
        src={photo.image.url}
        alt={photo.altText}
        // width={100}
        // height={400}
        // placeholder='blur'
        quality={75}
        fill={true}
      />
    </ImageBoxStyle>

    <TitleBoxStyle>
      <Title>
        <Link href={`/product/${id}`}>{name}</Link>
      </Title>
    </TitleBoxStyle>
    <PriceTag>{price}</PriceTag>
  </Item>
)

export default Product
