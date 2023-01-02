import Head from 'next/head'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { OrderStyles } from '../../components/styles'
import { formatMoney } from '../../lib/formatMoney'
import { useSingleOrder } from '../../lib/graphql'

export default function SingleOrderPage() {
  const params = useSearchParams()
  const orderId = params.get('id')

  const { order, loading, error } = useSingleOrder(orderId)

  if (error || !order) {
    return <p>Something happened on the db, could not fetch your order</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  const orderedItems = order.items

  return (
    <OrderStyles>
      <Head>
        <meta name='description' content={`Successful order`} />
        <title>Sick fits | Successfully ordered {order.id}</title>
      </Head>

      <p>
        <span>Order Id:</span>
        <span>{order.id}</span>
      </p>

      <p>
        <span>Charge Id:</span>
        <span>{order.charge}</span>
      </p>

      <p>
        <span>Items Count:</span>
        <span>{order.itemsCount}</span>
      </p>

      <p>
        <span>Order Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>

      <div className='items'>
        {orderedItems.map(item => (
          <div className='order-item' key={item.id}>
            <Image
              src={item.photo.image.url}
              alt={item.photo.altText}
              width={120}
              height={80}
            />
            <div className='item-details'>
              <h2>{item.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description.slice(0, 100)}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  )
}
