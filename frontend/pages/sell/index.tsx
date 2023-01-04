import CreateProduct from '../../components/sell/CreateProduct'
import PleaseSignIn from '../../components/users/PleaseSignIn'

export default function SellPage() {
  return (
    <main>
      <PleaseSignIn>
        <CreateProduct />
      </PleaseSignIn>
    </main>
  )
}
