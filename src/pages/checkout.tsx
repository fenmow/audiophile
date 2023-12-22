/* eslint-disable react/no-unescaped-entities */
import { NextPage } from "next";
import Style from "../styles/Checkout.module.scss"
import Header from "@/components/Header/Header";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { cartEntry } from "@/components/CartComponent/Cart";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import CashImage from "public/checkout/icon-cash-on-delivery.svg"
import CheckoutModal from "@/components/CheckoutModal/CheckoutModal";
import CheckoutCart from "@/components/CheckoutCart/CheckoutCart";

const Checkout: NextPage = () => {
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
  const [cartEntries, setCartEntries] = useState<cartEntry[]>([])
  const { cart } = useCart()
  const cartTotal = cart.reduce((total, product) => total + product.price, 0)
  const vat = Math.floor(((20 * cartTotal) / 100)).toLocaleString().replace('.', ',')

  const [nameContainerState, setNameContainerState] = useState<boolean>(false)
  const nameRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const [emailContainerState, setEmailContainerState] = useState<boolean>(false)
  const emailRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const [phoneContainerState, setPhoneContainerState] = useState<boolean>(false)
  const phoneRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const [addressContainerState, setAddressContainerState] = useState<boolean>(false)
  const addressRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const [zipContainerState, setZipContainerState] = useState<boolean>(false)
  const zipRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const [cityContainerState, setCityContainerState] = useState<boolean>(false)
  const cityRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const [countryContainerState, setCountryContainerState] = useState<boolean>(false)
  const countryRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const [emoneyContainerState, setEmoneyContainerState] = useState<boolean>(false)
  const emoneyRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const [pinContainerState, setPinContainerState] = useState<boolean>(false)
  const pinRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const [showHeader, setShowHeader] = useState<boolean>(true)


  const validateFormValues = () => {
    setNameContainerState(false), setEmailContainerState(false), setPhoneContainerState(false),  setAddressContainerState(false)
    setZipContainerState(false), setCityContainerState(false), setCountryContainerState(false), setEmoneyContainerState(false),
    setPinContainerState(false)
    
    if (nameRef.current.value.trim() == '') {
      setNameContainerState(true)
    } else if (!emailRef.current.value.trim().match(/(^\w{3,20}@(?=([a-zA-Z]{1,10}\.(?=([a-z]{3})))))/)) {
      setEmailContainerState(true)
    } else if (!phoneRef.current.value.trim().match(/(^\+\d{1,2}\s\(\d{2,3}\)\s\d{3,5}\-\d{4})/)) {
      setPhoneContainerState(true)
    } else if (addressRef.current.value.trim() === '') {
      setAddressContainerState(true)
    } else if (!zipRef.current.value.trim().match(/(^\d{5}(?=(\-\d{3})))/)) {
      setZipContainerState(true)
    } else if (cityRef.current.value.trim() === '') {
      setCityContainerState(true)
    } else if (countryRef.current.value.trim() === '') {
      setCountryContainerState(true)
    } else if (paymentMethod) {
        if (!emoneyRef.current.value.trim().match(/(^\d{9}$)/)) {
          setEmoneyContainerState(true)
        } else if (!pinRef.current.value.trim().match(/(^\d{4}$)/)) {
          setPinContainerState(true)
        } else {
        setShowModal(true)
        setShowHeader(false)
        }
      } else {
        setShowModal(true)
        setShowHeader(false)
      }
    }



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
      { showHeader && (
      <>
        <Header cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <div className={Style.header_background}></div>
      </>) }

      <main className={`${Style.page_container} ${cartIsOpen ? `${Style.cart_is_open}` : ''} ${showModal ? `${Style.modal_is_open}` : ''} ${menuIsOpen ? `${Style.menu_is_open}` : ''}`}>
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
                  <div className={`${Style.input_container} ${nameContainerState ? `${Style.show_message}` : ''}`}>
                    <div className={Style.message_container}>
                      <label htmlFor="name" className={Style.label}>Name</label>
                      <span>Can't be empty</span>
                    </div>
                    <input ref={nameRef} type="name" className={Style.input} name="name" id="name" placeholder="Name" />
                  </div>

                  <div className={`${Style.input_container} ${emailContainerState ? `${Style.show_message}` : ''}`}>
                    <div className={Style.message_container}>
                      <label htmlFor="email" className={Style.label}>Email Address</label>
                      <span>Wrong format</span>
                    </div>
                    <input ref={emailRef} type="email" className={Style.input} name="email" id="email" placeholder="Email" />
                  </div>

                  <div className={`${Style.input_container} ${phoneContainerState ? `${Style.show_message}` : ''}`}>
                    <div className={Style.message_container}>
                      <label htmlFor="phone" className={Style.label}>Phone Number</label>
                      <span>Wrong format</span>
                    </div>
                    <input ref={phoneRef} type="tel" className={Style.input} name="phone" id="phone" placeholder="Phone Number" />
                  </div>
                </div>
                <h2>shipping info</h2>
                <div className={Style.input_grid}>
                  <div className={`${Style.input_container} ${Style.address_input} ${addressContainerState ? `${Style.show_message}` : ''}`}>
                    <div className={Style.message_container}>
                      <label htmlFor="address" className={Style.label}>Address</label>
                      <span>Can't be empty</span>
                    </div>
                    <input ref={addressRef} type="text" className={Style.input} name="address" id="address" placeholder="Address" />
                  </div>

                  <div className={`${Style.input_container} ${zipContainerState ? `${Style.show_message}` : ''}`}>
                    <div className={Style.message_container}>
                      <label htmlFor="zipCode" className={Style.label}>ZIP Code</label>
                      <span>Wrong format</span>
                    </div>
                    <input ref={zipRef} type="text" className={Style.input} name="zipCode" id="zipCode" placeholder="ZIP Code" />
                  </div>

                  <div className={`${Style.input_container} ${cityContainerState ? `${Style.show_message}` : ''}`}>
                    <div className={Style.message_container}>
                      <label htmlFor="city" className={Style.label}>City</label>
                      <span>Can't be empty</span>
                    </div>
                    <input ref={cityRef} type="text" className={Style.input} name="city" id="city" placeholder="City" />
                  </div>
                  <div className={`${Style.input_container} ${countryContainerState ? `${Style.show_message}` : ''}`}>
                    <div className={Style.message_container}>
                      <label htmlFor="country" className={Style.label}>Country</label>
                      <span>Can't be empty</span>
                    </div>
                    <input ref={countryRef} type="text" className={Style.input} name="country" id="country" placeholder="Country" />
                  </div>
                </div>
                <h2>payment details</h2>
                <div className={`${Style.input_container} ${Style.payment_methods_container}`}>
                    <h3>Payment Method</h3>
                    <div className={Style.payment_methods}>
                      <label htmlFor="eMoney" className={Style.payment_method} onClick={() => setPaymentMethod(true)}>
                        <input type="radio" id="eMoney" name="payment_method" value={`eMoney`} checked max={9}/>
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
                    <div className={`${Style.input_container} ${emoneyContainerState ? `${Style.show_message}` : ''}`}>
                      <div className={Style.message_container}>
                        <label htmlFor="emoney-number" className={Style.label}>e-Money Number</label>
                        <span>Wrong format</span>
                      </div>
                      <input ref={emoneyRef} type="text" className={Style.input} name="emoney-number" id="emoney-number" placeholder="E-money Number" />
                    </div>

                    <div className={`${Style.input_container} ${pinContainerState ? `${Style.show_message}` : ''}`}>
                      <div className={Style.message_container}>
                        <label htmlFor="emoney-pin" className={Style.label}>e-Money PIN</label>
                        <span>Wrong format</span>
                      </div>
                      <input ref={pinRef} type="text" className={Style.input} name="emoney-pin" id="emoney-pin" placeholder="E-money PIN" />
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
                <button onClick={() => validateFormValues()}>continue & pay</button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
      <CheckoutModal order={cartEntries} total={cartTotal} showModal={showModal} />
    </>
  )
}

export default Checkout