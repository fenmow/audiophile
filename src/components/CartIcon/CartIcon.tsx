import { AiOutlineShoppingCart } from "react-icons/ai";

type cartIconProps = {
  setCartIsOpen: (isOpen: any) => void
  setMenuIsOpen: (isOpen: any) => void
}

const CartIcon: React.FC<cartIconProps> = (props: {
  setCartIsOpen: (isOpen: any) => void
  setMenuIsOpen: (isOpen: any) => void
}) => {
  return (
    <div className="cart_icon" style={{ color: '#ffff', fontSize: '25px', cursor: 'pointer' }} onClick={() => {
      props.setMenuIsOpen(false)
      props.setCartIsOpen((current: any) => !current)
    }}>
      <AiOutlineShoppingCart />
    </div>
  )
}

export default CartIcon