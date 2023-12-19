import { NextPage } from "next";
import Style from "../styles/Checkout.module.scss"
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { cartEntry } from "@/components/CartComponent/Cart";
import Image from "next/image";

export const CheckoutCart = (props: {
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
      <div className={Style.product_quantity}>
        x{ props.entry.quantity }
      </div>
    </div>
  )
}

const Checkout: NextPage = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
  const [cartEntries, setCartEntries] = useState<cartEntry[]>([])
  const { cart } = useCart()
  const cartTotal = cart.reduce((total, product) => total + product.price, 0)
  const vat = Math.floor(((20 * cartTotal) / 100)).toLocaleString().replace('.', ',')

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
    <>
      <Header menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <div className={Style.header_background}></div>

      <main className={Style.page_container}>
        <div className={Style.back_link_container}>
          <div className={Style.back_link}>
            <Link href={`/`} legacyBehavior>
              <a className={Style.back_link_content}>Go Back</a>
            </Link>
          </div>
        </div>

        <div className={Style.checkout_container}>
          <div className={Style.checkout_grid}>
            <div className={Style.checkout_main_grid}>
              <h1>checkout</h1>
            </div>

            <div className={Style.summary}>
                <h1>summary</h1>
                { cartEntries.map(entry => <CheckoutCart key={entry.product.name} entry={entry} />) }
                <div className={Style.total_container}>
                  <span className={Style.text_content}>total</span>
                  <span className={Style.value_content}>$ {cartTotal}</span>
                </div>
                <div className={Style.shipping_container}>
                  <span className={Style.text_content}>shipping</span>
                  <span className={Style.value_content}>$ 50</span>
                </div>
                <div className={Style.vat_container}>
                  <span className={Style.text_content}>vat (included)</span>
                  <span className={Style.value_content}>$ {vat}</span>
                </div>
                <div className={Style.grand_total_container}>
                  <span className={Style.text_content}>grand total</span>
                  <span className={Style.value_content}>$ {(cartTotal + 50).toLocaleString().replace('.', ',')}</span>
                </div>
                <button>continue & pay</button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Checkout