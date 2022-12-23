export const DeleteProductBtn = () => {
  return (
    <button
      type='button'
      onClick={() => {
        const confirmResponse = confirm(
          'Are sure you want to delete this product?'
        )
        /// @TODO: Delete Product
        console.table({ confirmResponse })
      }}
    >
      Delete 🗑️
    </button>
  )
}
