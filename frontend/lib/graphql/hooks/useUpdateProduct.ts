import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { ALL_PRODUCTS_QUERY, UPDATE_PRODUCT_MUTATION } from '../types'

export function useUpdateProduct<T extends object>(inputs: T) {
  const Router = useRouter()

  const [updateProduct, { loading, error, data }] = useMutation(
    UPDATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  )

  const handleProductUpdate = async (clearForm: () => void) => {
    const response = await updateProduct()

    // Create form
    clearForm()

    // Redirect To
    Router.push({
      pathname: `/products/${response.data?.updateProduct.id}`,
    })
  }

  return {
    handleProductUpdate,
    loading,
    error,
    data,
  }
}
