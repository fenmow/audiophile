import { FaBars } from "react-icons/fa";
import Style from "./BarsIcon.module.scss"

type barsIconType = {
  setCartIsOpen: (isOpen: boolean) => void
  setMenuIsOpen: (isOpen: boolean) => void
}

const BarsIcon: React.FC<barsIconType> = (props: {
  setCartIsOpen: (isOpen: any) => void
  setMenuIsOpen: (isOpen: any) => void
}) => {
  return (
    <div className={Style.bars_icon} onClick={() => {
      props.setMenuIsOpen((current: any) => !current)
      props.setCartIsOpen(false)
    }}>
      <FaBars />
    </div>
  )
}

export default BarsIcon