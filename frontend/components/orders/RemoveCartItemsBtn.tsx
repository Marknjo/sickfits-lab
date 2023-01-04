import styled from 'styled-components'
import { useRemoveCartItem } from '../../lib/graphql'

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`

export default function RemoveCartItemsBtn({
  id,
  name,
}: {
  id: string
  name: string
}) {
  const { removeCartItemsHandler, loading } = useRemoveCartItem()

  async function onClickHandler() {
    /// Handle messages
    const resMessage = await removeCartItemsHandler(id, name)
  }

  return (
    <BigButton
      type='button'
      title={`Remove all ${name}(s) from the Cart`}
      onClick={onClickHandler}
    >
      &times;
    </BigButton>
  )
}
