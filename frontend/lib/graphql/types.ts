import { gql } from '@apollo/client'

const PRODUCT_IMAGE_DETAILS_FRAGMENT = gql`
  fragment ImageDetails on ProductImage {
    id
    altText
    image {
      id
      url
    }
  }
`

const SLIM_PRODUCT_DETAILS_FRAGMENT = gql`
  fragment SlimProductDetails on Product {
    id
    name
    description
    price
  }
`

export const GET_SINGLE_PRODUCT_QUERY = gql`
  ${PRODUCT_IMAGE_DETAILS_FRAGMENT}
  ${SLIM_PRODUCT_DETAILS_FRAGMENT}
  query GetSingleProducts($id: ID) {
    product(where: { id: $id }) {
      ...SlimProductDetails
      status
      photo {
        ...ImageDetails
      }
    }
  }
`

export const ALL_PRODUCTS_QUERY = gql`
  ${PRODUCT_IMAGE_DETAILS_FRAGMENT}
  ${SLIM_PRODUCT_DETAILS_FRAGMENT}
  query GetAllProducts {
    products {
      ...SlimProductDetails
      photo {
        ...ImageDetails
      }
    }
  }
`

export const CREATE_PRODUCT = gql`
  mutation CreateProductMutation(
    $name: String
    $description: String
    $price: Int
    $image: Upload!
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        status: "AVAILABLE"
        price: $price
        photo: { create: { image: { upload: $image }, altText: $name } }
      }
    ) {
      id
    }
  }
`

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProductContent(
    $id: ID!
    $name: String
    $description: String
    $price: Int
    $status: String
  ) {
    updateProduct(
      where: { id: $id }
      data: {
        name: $name
        description: $description
        price: $price
        status: $status
      }
    ) {
      id
    }
  }
`
