/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { OrderItemStyles } from '../../components/styles'
import { DisplayError } from '../../components/ui'
import { formatMoney } from '../../lib/formatMoney'
import { useOrders } from '../../lib/graphql'
import { OrderInterface, OrderItemsInterface } from '../../types'

const OrderUI = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  grid-gap: 4rem;
`

const OrdersHeader = styled.div`
  padding: 0 4rem 2rem;
`

function countItemsInAnOrder(order: OrderInterface) {
  return order.items.reduce(
    (tally: number, item: OrderItemsInterface) => tally + item.quantity,
    0
  )
}

export default function OrdersPage() {
  const { orders, loading, error } = useOrders()

  if (error && !loading) {
    return <DisplayError error={error} />
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (!orders && !loading) {
    return (
      <main>
        <OrdersHeader>
          <h2>Your Orders</h2>
          <p>Oops! Looks like you've not ordered any product in our store!</p>
          <p>Click the link below to place your orders</p>
          <Link href='/products'>See All Products</Link>
        </OrdersHeader>
      </main>
    )
  }

  return (
    <main>
      <OrdersHeader>
        <h2>Your Orders</h2>
        <p>So far you've ordered {orders!.length} products from our store</p>
      </OrdersHeader>
      <OrderUI>
        {orders!.map(order => (
          <OrderItemStyles key={order.id}>
            <Link href={`/orders/${order.id}`}>
              <div className='order-meta'>
                <p>{order.total}</p>
                <p>{countItemsInAnOrder(order)}</p>
                <p>
                  {order.items.length} Product
                  {order.items.length === 1 ? '' : 's'}
                </p>
                <p>{formatMoney(order.total)}</p>
              </div>
              <div className='images'>
                {order.items.map(item => (
                  <Image
                    key={item.photo.image.id}
                    src={item.photo.image.url}
                    alt={item.photo.altText}
                    height={120}
                    width={120}
                    quality={70}
                  />
                ))}
              </div>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUI>
    </main>
  )
}
