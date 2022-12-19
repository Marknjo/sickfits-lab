import { gql, useQuery } from '@apollo/client'
import { NextPage } from 'next'
import styled from 'styled-components'

interface ProductImageInterface {
  id: string
  altText: string
  image: {
    id: string
    filesize: number
    width: number
    height: number
    extension: 'jpg' | 'png' | 'webp' | 'gif'
    url: string
  }
  product: ProductInterface
}

interface ProductInterface {
  id: string
  name: string
  description: string
  status: string
  price: number
  photo: ProductImageInterface
}

interface ProductsInterface {
  products: Array<ProductInterface>
}

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
