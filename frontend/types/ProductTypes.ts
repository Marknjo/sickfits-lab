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
  status: string
  price: number
  photo: ProductImageInterface
}

export interface ProductsInterface {
  products: Array<ProductInterface>
}

export interface SingleProductInterface {
  product: ProductInterface
}
