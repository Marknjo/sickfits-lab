import styled from 'styled-components'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements } from '@stripe/react-stripe-js'
import { SickButton } from '../styles'

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;

  button {
    margin-top: 0.5rem;
  }
`

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || '')

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutFormStyles>
        <CardElement />
        <SickButton>Check out Now</SickButton>
      </CheckoutFormStyles>
    </Elements>
  )
}

export default Checkout
