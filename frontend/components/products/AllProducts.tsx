import styled from 'styled-components'
import Product from './ProductItem'
import { useProducts } from '../../graphql/hooks/useProducts'

const ProductsListStyles = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 6rem;
`

/// FetchAllProducts
const Products = () => {
  const { products, loading } = useProducts()

  if (loading) {
    return <p>Loading...</p>
  }

  if (products.length === 0) {
    return <p>No Products in the Collection</p>
  }

  return (
    <ProductsListStyles>
      <h2>All Products</h2>
      {products.map(product => (
        <Product key={product.id} {...product} />
      ))}
    </ProductsListStyles>
  )
}

export default Products
