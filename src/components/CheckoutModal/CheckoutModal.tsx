import Icon from "public/checkout/icon-order-confirmation.svg"
import Style from "./CheckoutModal.module.scss"
import Image from "next/image"
import { cartEntry } from "../CartComponent/Cart"
import CheckoutCart from "../CheckoutCart/CheckoutCart"
import Link from "next/link"
import { useCart } from "@/hooks/useCart"


type checkoutModalProps = {
  order: cartEntry[]
  total: number
  showModal: boolean
}

const CheckoutModal: React.FC<checkoutModalProps> = (props: {
  order: cartEntry[]
  total: number
  showModal: boolean
}) => {

  const { clearCart } = useCart()

  return (
    <div className={`${Style.checkout_modal_container} ${props.showModal ? `${Style.show}` : ''}`}>
      <div className={Style.checkout_modal}>
        <Image className={Style.image} src={Icon.src} alt="order confirmation" width={55} height={55}></Image>
        <h1>thank you <br /> for your order</h1>
        <p>You will receive an email confirmation shortly.</p>

        <div className={Style.order_details}>
          <div className={Style.order_info}>
            <CheckoutCart entry={props.order[0]} />
            <p>and {props.order.length-1} other item(s)</p>
          </div>
          <div className={Style.order_total}>
              <span className={Style.total}>grand total</span>
              <span className={Style.total_value}>$ {(props.total+50).toLocaleString().replace('.', ',')}</span>
          </div>
        </div>
        <Link href="/">
          <button onClick={() => clearCart()}>back to home</button>
        </Link>
      </div>
    </div>
  )
}

export default CheckoutModal