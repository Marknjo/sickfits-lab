import { gql } from '@apollo/client'

/// Handle Products CRUD
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

export const PRODUCTS_PAGINATION_QUERY = gql`
  ${PRODUCT_IMAGE_DETAILS_FRAGMENT}
  ${SLIM_PRODUCT_DETAILS_FRAGMENT}
  query GetAllProducts($limit: Int, $offset: Int) {
    products(take: $limit, skip: $offset, orderBy: { name: asc }) {
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

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProductMutation($id: ID) {
    deleteProduct(where: { id: $id }) {
      id
      name
    }
  }
`

export const PRODUCTS_COUNT_QUERY = gql`
  query getAllProductsCount {
    productsCount
  }
`

/// Products Search
export const PRODUCTS_SEARCH_QUERY = gql`
  ${PRODUCT_IMAGE_DETAILS_FRAGMENT}
  ${SLIM_PRODUCT_DETAILS_FRAGMENT}

  query SearchProductsByNameDescription($searchTerm: String) {
    searchTerms: products(
      where: {
        OR: [
          { name: { contains: $searchTerm, mode: insensitive } }
          { description: { contains: $searchTerm, mode: insensitive } }
        ]
      }
    ) {
      ...SlimProductDetails
      status
      photo {
        ...ImageDetails
      }
    }
  }
`

/// Handle USER Authentication (CRU)
export const SIGNIN_USER_MUTATION = gql`
  mutation SigninUser($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
        }
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`

export const GET_USER_CREDENTIALS = gql`
  ${PRODUCT_IMAGE_DETAILS_FRAGMENT}
  ${SLIM_PRODUCT_DETAILS_FRAGMENT}
  query GetUserCredentials {
    authenticatedItem {
      ... on User {
        id
        name
        email
        cart {
          id
          quantity
          product {
            ...SlimProductDetails
            photo {
              ...ImageDetails
            }
          }
        }
      }
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation LogoutUser {
    endSession
  }
`

export const SIGNUP_USER_MUTATION = gql`
  mutation SignUpUser($name: String, $email: String, $password: String) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
    }
  }
`

export const PASSWORD_FORGET_MUTATION = gql`
  mutation ForgetUserPassword($email: String!) {
    sendUserPasswordResetLink(email: $email)
  }
`

export const PASSWORD_REDEEM_MUTATION = gql`
  mutation ResetUserPassword(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`

/// CART & Orders
export const ADD_TO_CART_MUTATION = gql`
  mutation IncreaseCartItems($productId: ID) {
    addToCart(productId: $productId) {
      id
      quantity
    }
  }
`
