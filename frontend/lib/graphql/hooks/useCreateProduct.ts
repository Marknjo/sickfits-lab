import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { ALL_PRODUCTS_QUERY, CREATE_PRODUCT } from '../types'

export function useCreateProduct<T extends object>(inputs: T) {
  const Router = useRouter()

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  )

  const handleProductCreate = async (clearForm: () => void) => {
    const response = await createProduct()

    // Create form
    clearForm()

    // Redirect To
    Router.push({
      pathname: `/products/${response.data?.createProduct.id}`,
    })
  }

  return {
    handleProductCreate,
    loading,
    error,
    data,
  }
}
