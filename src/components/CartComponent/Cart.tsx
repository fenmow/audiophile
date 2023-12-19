import { useCart } from "@/hooks/useCart"
import Style from "./Cart.module.scss"
import { ProductType } from "@/services/products"
import { useEffect, useState } from "react"
import Image from "next/image"
import CartAddAndRemove from "../CartAddAndRemove/CartAddAndRemove"
import Link from "next/link"

export type cartEntry = {
  product: ProductType
  quantity: number
}

export const CartRow = (props: {
  entry: cartEntry
}) => {
  return (
    <div className={Style.product_row}>
      <div className={Style.product_details}>
        <Image className={Style.image} src={props.entry.product?.image?.desktop} alt="product" height={60} width={60}></Image>
        <div className={Style.product_content}>
          <span className={Style.product_name}>{props.entry.product.name}</span>
          <span className={Style.product_price}>$ {props.entry.product?.price?.toLocaleString().replace('.', ",")}</span>
        </div>
      </div>
      <CartAddAndRemove entry={props.entry} />
    </div>
  )
}

const Cart: React.FC = () => {
  const [cartEntries, setCartEntries] = useState<cartEntry[]>([])
  const { cart, clearCart } = useCart()
  const cartTotal = cart.reduce((total, product) => total + product.price, 0)

  useEffect(() => {
    const entriesList = cart.reduce((list, product) => {
      const entry = list.findIndex(entry => entry.product.id === +product.id)

      if (entry === -1) {
         return [
          ...list,
          {
            product,
            quantity: 1
          }
         ]
      }

      list[entry].quantity++
      return list
    }, [] as cartEntry[])

    entriesList.sort((a, b) => a.product.id - b.product.id)
    setCartEntries(entriesList)
  }, [cart])

  return (
    <div className={Style.cart_container}>
      <div className={Style.cart}>
        <div className={Style.title_row}>
          <h1>cart ({cartEntries.length})</h1>
          <span onClick={() => clearCart()}>Remove all</span>
        </div>
        { cartEntries.map(entry => (
          <CartRow key={entry.product.name} entry={entry} />
        )) }
        <div className={Style.total_row}>
          <span className={Style.total_title}>total</span>
          <span className={Style.total}>$ {cartTotal.toLocaleString().replace('.', ',')}</span>
        </div>
        <Link className={Style.checkout_link} href='/checkout'>
          <button>checkout</button>
        </Link> 
      </div>
    </div>
  )
}

export default Cart