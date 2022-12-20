import { gql } from '@apollo/client'

export const ALL_PRODUCTS_QUERY = gql`
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

export const CREATE_PRODUCT = gql`
  mutation CreateProductMutation(
    $name: String
    $description: String
    $price: Int
    $photo: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $photo, altText: $name } }
      }
    ) {
      id
      name
      price
      status
      photo {
        id
        altText
      }
    }
  }
`
