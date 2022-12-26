import styled from 'styled-components'
import Product from './ProductItem'
import { useProducts } from '../../lib/graphql'
import { perPage } from '../../config'

const ProductsListStyles = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 6rem;
`

/// FetchAllProducts
const Products = ({ page }: { page: number }) => {
  const skip = perPage * (page - 1)
  console.table({ skip, perPage, page })

  const { products, loading, fetchMore } = useProducts(skip)

  if (loading) {
    return <p>Loading...</p>
  }

  /* @ts-ignore */
  if (products?.length === 0) {
    return <p>No Products in the Collection</p>
  }

  return (
    <ProductsListStyles>
      {/* @ts-ignore */}
      {products.map(product => (
        <Product key={product.id} {...product} />
      ))}
    </ProductsListStyles>
  )
}

export default Products
