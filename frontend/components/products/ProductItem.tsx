import { ProductInterface } from '../../types/ProductTypes'

const Product = ({ id, name }: ProductInterface) => (
  <article key={id}>
    <h3>{name}</h3>
  </article>
)

export default Product
