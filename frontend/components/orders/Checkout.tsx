import styled from 'styled-components'
import { loadStripe, StripeCardElement, StripeError } from '@stripe/stripe-js'
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { SickButton } from '../styles'
import { FormEvent, useState } from 'react'
import { start, done } from 'nprogress'
import { useCartCheckout } from '../../lib/graphql'
import { off } from 'process'
import { useRouter } from 'next/navigation'
import Cart from './Cart'
import { useCart } from '../../lib'

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

  .error-message {
    font-size: 1.4rem;
    border-left: 0.4rem solid var(--red);
    padding: 0.2rem 0.8rem;
    color: var(--red);
  }
`

// const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || '')

function CheckoutForm() {
  const [error, setError] = useState<
    | {
        message: string
      }
    | StripeError
  >({ message: '' })
  const [loading, setLoading] = useState<boolean>()
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  const { checkoutHandler, checkErrors } = useCartCheckout()

  const { closeCart } = useCart()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()
      setLoading(true)
      console.log('Checking out...🥰🥰')

      if (!stripe && !elements) {
        return
      }

      // 1). Start the page transition
      start()

      // 2) Create the payment method via stripe (Token comes back here if successful)
      const cardElement = elements!.getElement(CardElement) as StripeCardElement
      const payment = await stripe?.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })

      // 3). Handle any error from stripe
      if (!payment) {
        throw new Error(
          JSON.stringify({ message: 'Stripe payment setup error' })
        )
      }

      const { error, paymentMethod } = payment

      if (error) {
        throw new Error(JSON.stringify(error))
      }

      // 4). Send the token from step 3 to our keystone server, via a custom mutation!
      const order = await checkoutHandler(paymentMethod.id)

      if (order?.status === 'error') {
        throw new Error(JSON.stringify({ message: order.message }))
      }

      if (order?.orders) {
        // 5). Change the page to view the order
        router.replace('/orders')
        // 6). Close the cart
        closeCart()
        // 7). Turn the loader off
        done()

        // 8). Clear Stripes Elements fields
        cardElement.clear()
      }
    } catch (error) {
      const err = error as unknown as { message: string }
      const resErr = JSON.parse(err.message) as
        | StripeError
        | { message: string }

      setError(resErr)
    } finally {
      setLoading(false)
      done()
    }
  }

  const errorJsx = (errorMsg: string) => {
    return (
      <p className='error-message'>
        <small>{errorMsg}</small>
      </p>
    )
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {(error || checkErrors) && errorJsx(error.message!)}
      <CardElement />
      <SickButton>Check out Now</SickButton>
    </CheckoutFormStyles>
  )
}

export default function Checkout() {
  const [stripePromise] = useState(() =>
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || '')
  )

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}
