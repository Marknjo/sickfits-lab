import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { formatMoney } from '../../lib/formatMoney'
import { useUser } from '../../lib/graphql'
import { ProductInterface } from '../../types'
import AddToCartBtn from '../orders/AddToCartBtn'
import { Item, PriceTag, Title } from '../styles'
import { DeleteProductBtn } from '../ui'

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

const Product = ({ id, name, photo, price }: ProductInterface) => {
  const { user } = useUser()

  let canEditBtn: JSX.Element = <></>
  if (user?.role.name === 'Admin' || user?.role.name === 'Editor') {
    canEditBtn = (
      <div>
        <Link
          href={{
            pathname: `/sell/${id}/update`,
          }}
        >
          Edit ✏️
        </Link>
      </div>
    )
  }

  let canDeleteBtn: JSX.Element = <></>
  if (user?.role.name === 'Admin' || user?.role.name === 'Editor') {
    canDeleteBtn = (
      <div>
        <DeleteProductBtn id={id} />
      </div>
    )
  }

  return (
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
          <Link href={`/products/${id}`}>{name}</Link>
        </Title>
      </TitleBoxStyle>
      <PriceTag>{formatMoney(price)}</PriceTag>

      {user && (
        <div className='button-list'>
          {canEditBtn}
          <div>
            <AddToCartBtn productId={id} productName={name} />
          </div>
          {canDeleteBtn}
        </div>
      )}
    </Item>
  )
}

export default Product
