import { useDeleteProduct } from '../../lib/graphql'

export const DeleteProductBtn = ({ id }: { id: string }) => {
  const { error, loading, handleProductDelete } = useDeleteProduct(id)

  return (
    <button
      type='button'
      onClick={() => {
        const confirmResponse = confirm(
          'Are sure you want to delete this product?'
        )
        confirmResponse && handleProductDelete()
      }}
    >
      {error || loading ? (error ? 'Delete ⛔!' : 'Deleting...') : 'Delete 🗑️'}
    </button>
  )
}
