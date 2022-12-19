import { ProductInterface } from './ProductTypes'

const ProductItem = ({ id, name }: ProductInterface) => (
  <article key={id}>
    <h3>{name}</h3>
  </article>
)

export default ProductItem
