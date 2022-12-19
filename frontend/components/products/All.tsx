import { gql, useQuery } from '@apollo/client'
import styled from 'styled-components'
import { ProductsInterface } from './ProductTypes'

const ALL_PRODUCTS_QUERY = gql`
  query GetAllProducts {
    products {
      id
      name
      description
      price
      photo {
        id
        altText
        image {
          id
          url
        }
      }
    }
  }
`

const ProductsListStyles = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 6rem;
`

/// FetchAllProducts
const Products = () => {
  const { data, error, loading } =
    useQuery<ProductsInterface>(ALL_PRODUCTS_QUERY)

  console.log(data, error, loading, !!data?.products)

  if (loading) {
    return <p>Loading...</p>
  }

  if (data?.products.length === 0) {
    return <p>No Products in the Collection</p>
  }

  return (
    <ProductsListStyles>
      <h2>All Products</h2>
      {data?.products.map(product => (
        <article key={product.id}>
          <h3>{product.name}</h3>
        </article>
      ))}
    </ProductsListStyles>
  )
}

export default Products
