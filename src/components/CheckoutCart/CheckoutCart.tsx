import Image from "next/image"
import { cartEntry } from "../CartComponent/Cart"
import Style from "./CheckoutCart.module.scss"

const CheckoutCart = (props: {
  entry?: cartEntry
}) => {
  return (
    <div className={Style.product_row}>
      <div className={Style.product_details}>
        <Image className={Style.image} src={props.entry?.product?.image?.desktop!} alt="product" height={60} width={60}></Image>
        <div className={Style.product_content}>
          <span className={Style.product_name}>{props.entry?.product.name}</span>
          <span className={Style.product_price}>$ {props.entry?.product?.price?.toLocaleString().replace('.', ",")}</span>
        </div>
      </div>
      <div className={Style.product_quantity}>
        x{ props.entry?.quantity }
      </div>
    </div>
  )
}

export default CheckoutCart