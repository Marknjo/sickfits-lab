export interface ProductImageInterface {
  id: string
  altText: string
  image: {
    id: string
    filesize: number
    width: number
    height: number
    extension: 'jpg' | 'png' | 'webp' | 'gif'
    url: string
  }
  product: ProductInterface
}

export interface ProductInterface {
  id: string
  name: string
  description: string
  status: ProductStatusesEnum
  price: number
  photo: ProductImageInterface
}

export interface ProductsInterface {
  products: Array<ProductInterface>
}

export interface SingleProductInterface {
  product: ProductInterface
}

export interface ProductFormOutputs {
  id?: string
  name: string
  price: number
  description: string
  image?: any
  status?: ProductStatusesEnum
}

export enum ProductStatusesEnum {
  Available = 'AVAILABLE',
  Unavailable = 'UNAVAILABLE',
  Draft = 'DRAFT',
}

export type CartItemProduct = Pick<
  ProductInterface,
  'id' | 'name' | 'price' | 'photo'
>

export type CartItem = {
  id: string
  quantity: number
  product: CartItemProduct
}

export interface OrderInterface {
  id: string
  label: string
  total: number
  items: [
    {
      id: string
      name: string
      description: string
      photo: {
        id: string
        altText: string
        image: {
          id: string
          url: string
        }
      }
      price: number
      quantity: number
    }
  ]
  itemsCount: number
  customer: {
    id: string
    name: string
    email: string
  }
  charge: string
}

export interface CheckoutInterface {
  checkout: OrderInterface
}
