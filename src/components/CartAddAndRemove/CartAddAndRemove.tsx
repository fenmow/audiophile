import { FaMinus } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import Style from "./CartAddAndRemove.module.scss"
import { cartEntry } from "../CartComponent/Cart";
import { useCart } from "@/hooks/useCart";

type CartAddAndRemoveProps = {
  entry: cartEntry
}

const CartAddAndRemove: React.FC<CartAddAndRemoveProps> = (props: {
  entry: cartEntry
}) => {
  const { addProduct, removeProduct } = useCart()
  return (
    <div className={Style.btn}>
      <div className={Style.icon} onClick={() => removeProduct(props.entry.product.id)}>
        <FaMinus />
      </div>
      <div>
        {props.entry.quantity}
      </div>
      <div className={Style.icon} onClick={() => addProduct(props.entry.product)}>
        <GoPlus />
      </div>
    </div>
  )
}

export default CartAddAndRemove