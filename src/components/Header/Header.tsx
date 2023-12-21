import Image from "next/image"
import Style from "./Header.module.scss"
import Logo from "public/logo.svg"
import Link from "next/link"
import CartIcon from "../CartIcon/CartIcon"
import Cart from "../CartComponent/Cart"
import ChevronIcon from "../ChevronIcon/ChevronIcon"
import HeadphoneImage from "public/shared/desktop/image-category-thumbnail-headphones.png"
import SpeakersImage from "public/shared/desktop/image-category-thumbnail-speakers.png"
import EarphonesImage from "public/shared/desktop/image-category-thumbnail-earphones.png"
import BarsIcon from "../BarsIcon/BarsIcon"

type headerProps = {
  cartIsOpen: boolean
  setCartIsOpen: (isOpen: boolean) => void
  menuIsOpen: boolean
  setMenuIsOpen: (isOpen: boolean) => void
}

export const HeaderMenu: React.FC = () => {
  return (
    <div className={Style.category_row}>
      <div className={Style.category_container}>
        <Link href="/headphones" className={Style.category_link}>
          <div className={Style.category_column}>
            <Image className={Style.category_image} src={HeadphoneImage.src} width={160} height={160} alt="headphones"></Image>
            <h1>headphones</h1>
            <p>shop</p><ChevronIcon />
          </div>
        </Link>
        <Link href="/speakers" className={Style.category_link}>
          <div className={Style.category_column}>
            <Image className={Style.category_image} src={SpeakersImage.src} width={160} height={160} alt="speakers"></Image>
            <h1>speakers</h1>
            <p>shop</p><ChevronIcon />
          </div>
        </Link>
        <Link href="/earphones" className={Style.category_link}>
          <div className={Style.category_column}>
            <Image className={Style.category_image} src={EarphonesImage.src} width={160} height={160} alt="earphones"></Image>
            <h1>earphones</h1>
            <p>shop</p><ChevronIcon />
          </div>
        </Link>
      </div>
    </div>
  )
}

const Header: React.FC<headerProps> = (props: {
  cartIsOpen: boolean
  setCartIsOpen: (isOpen: boolean) => void
  menuIsOpen: boolean
  setMenuIsOpen: (isOpen: boolean) => void
}) => {

  return (
    <>
      <header className={`${Style.header} ${props.cartIsOpen ? `${Style.header_cart_is_open}` : ''} ${props.menuIsOpen ? `${Style.menu_is_open}` : ''}`}>
      <div className={Style.header_container}>
        <div className={Style.logo_container}>
          <BarsIcon setCartIsOpen={props.setCartIsOpen} setMenuIsOpen={props.setMenuIsOpen}/>
          <Link href="/">
            <Image className={Style.logo} src={Logo} alt="audiophile" height={28} width={150}></Image>
          </Link>
        </div>

        <nav className={Style.nav_bar}>
          <Link href="/" legacyBehavior>
            <a className={Style.nav_link}>home</a>
          </Link>
          <Link href="/headphones" legacyBehavior>
            <a className={Style.nav_link}>headphones</a>
          </Link>
          <Link href="/speakers" legacyBehavior>
            <a className={Style.nav_link}>speakers</a>
          </Link>
          <Link href="/earphones" legacyBehavior>
            <a className={Style.nav_link}>earphones</a>
          </Link>
        </nav>

        <CartIcon setCartIsOpen={props.setCartIsOpen} setMenuIsOpen={props.setMenuIsOpen} />
        { props.cartIsOpen && <Cart /> }
      </div>
      { props.menuIsOpen && <HeaderMenu /> }
    </header>
    </>
  )
}

export default Header