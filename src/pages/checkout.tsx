import { NextPage } from "next";
import Style from "../styles/Checkout.module.scss"
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { cartEntry } from "@/components/CartComponent/Cart";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import CashImage from "public/checkout/icon-cash-on-delivery.svg"

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

  const [paymentMethod, setPaymentMethod] = useState<boolean>(true)
  
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
              <form className={Style.checkout_form} action="POST">
                <h2>billing details</h2>
                <div className={Style.input_grid}>
                  <div className={Style.input_container}>
                    <div className={Style.message_container}>
                      <label htmlFor="name" className={Style.label}>Name</label>
                    </div>
                    <input type="name" className={Style.input} name="name" id="name" placeholder="Name" />
                  </div>

                  <div className={Style.input_container}>
                    <div className={Style.message_container}>
                      <label htmlFor="email" className={Style.label}>Email Address</label>
                    </div>
                    <input type="email" className={Style.input} name="email" id="email" placeholder="Email" />
                  </div>

                  <div className={Style.input_container}>
                    <div className={Style.message_container}>
                      <label htmlFor="phone" className={Style.label}>Phone Number</label>
                    </div>
                    <input type="tel" className={Style.input} name="phone" id="phone" placeholder="Phone Number" />
                  </div>
                </div>
                <h2>shipping info</h2>
                <div className={Style.input_grid}>
                  <div className={`${Style.input_container} ${Style.address_input}`}>
                    <div className={Style.message_container}>
                      <label htmlFor="address" className={Style.label}>Address</label>
                    </div>
                    <input type="text" className={Style.input} name="address" id="address" placeholder="Address" />
                  </div>

                  <div className={Style.input_container}>
                    <div className={Style.message_container}>
                      <label htmlFor="zipCode" className={Style.label}>ZIP Code</label>
                    </div>
                    <input type="text" className={Style.input} name="zipCode" id="zipCode" placeholder="ZIP Code" />
                  </div>

                  <div className={Style.input_container}>
                    <div className={Style.message_container}>
                      <label htmlFor="city" className={Style.label}>City</label>
                    </div>
                    <input type="text" className={Style.input} name="city" id="city" placeholder="City" />
                  </div>
                  <div className={Style.input_container}>
                    <div className={Style.message_container}>
                      <label htmlFor="country" className={Style.label}>Country</label>
                    </div>
                    <input type="text" className={Style.input} name="country" id="country" placeholder="Country" />
                  </div>
                </div>
                <h2>payment details</h2>
                <div className={`${Style.input_container} ${Style.payment_methods_container}`}>
                    <h3>Payment Method</h3>
                    <div className={Style.payment_methods}>
                      <label htmlFor="eMoney" className={Style.payment_method} onClick={() => setPaymentMethod(true)}>
                        <input type="radio" id="eMoney" name="payment_method" value={`eMoney`} checked/>
                        <label htmlFor="eMoney">e-Money</label>
                      </label>
                      <label htmlFor="cash" className={Style.payment_method} onClick={() => setPaymentMethod(false)}>
                        <input type="radio" id="cash" name="payment_method" value={`cash`}/>
                        <label htmlFor="cash">Cash on Delivery</label>
                      </label>
                    </div>
                </div>
                { paymentMethod === true ? (
                  <div className={`${Style.emoney_container} ${Style.input_grid}`}>
                    <div className={Style.input_container}>
                      <div className={Style.message_container}>
                        <label htmlFor="emoney-number" className={Style.label}>e-Money Number</label>
                      </div>
                      <input type="text" className={Style.input} name="emoney-number" id="emoney-number" placeholder="E-money Number" />
                    </div>

                    <div className={Style.input_container}>
                      <div className={Style.message_container}>
                        <label htmlFor="emoney-pin" className={Style.label}>e-Money PIN</label>
                      </div>
                      <input type="text" className={Style.input} name="emoney-pin" id="emoney-pin" placeholder="E-money PIN" />
                    </div>
                  </div>
                ) : (
                  <div className={Style.cash_container}>
                    <div className={Style.image_container}>
                      <Image src={CashImage.src} width={50} height={50} alt="pay on delivery"></Image>
                    </div>
                    <div className={Style.text_content}>
                      <p>The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.</p>
                    </div>
                  </div>
                ) }
              </form>
            </div>

            <div className={Style.summary}>
                <h1>summary</h1>
                { cartEntries.map(entry => <CheckoutCart key={entry.product.name} entry={entry} />) }
                <div className={Style.total_container}>
                  <span className={Style.text_content}>total</span>
                  <span className={Style.value_content}>$ {cartTotal.toLocaleString().replace(".", ",")}</span>
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
      <Footer />
    </>
  )
}

export default Checkout