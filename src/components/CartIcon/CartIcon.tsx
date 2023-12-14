import { AiOutlineShoppingCart } from "react-icons/ai";

const CartIcon: React.FC = () => {
  return (
    <div className="cart_icon" style={{ color: '#ffff', fontSize: '25px', cursor: 'pointer' }}>
      <AiOutlineShoppingCart />
    </div>
  )
}

export default CartIcon