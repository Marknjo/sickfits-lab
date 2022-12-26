import styled from 'styled-components'
import Product from './ProductItem'
import { useProducts } from '../../lib/graphql'
import { perPage } from '../../config'
import { ProductInterface } from '../../types'

const ProductsListStyles = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 6rem;
`

/// FetchAllProducts
const Products = ({ products }: { products: ProductInterface[] }) => {
  return (
    <ProductsListStyles>
      {products.map(product => (
        <Product key={product.id} {...product} />
      ))}
    </ProductsListStyles>
  )
}

export default Products
