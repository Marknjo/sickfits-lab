import styled from 'styled-components'

interface CartStylesProps {
  open: boolean
}

export const CartStyles = styled.div<CartStylesProps>`
  padding: 20px;
  position: relative;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: scroll;

  ${props => props.open && `transform: translateX(0);`};
  header {
    border-bottom: 5px solid var(--black);
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  footer {
    border-top: 10px double var(--black);
    margin-top: 2rem;
    padding-bottom: 4rem;
    padding-top: 2rem;
    align-items: center;
    font-size: 3rem;
    font-weight: 900;
    p {
      margin: 1rem 0;
    }
  }

  .checkout-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--gray);
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;
  }
`

export default CartStyles
