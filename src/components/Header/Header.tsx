import Image from "next/image"
import Style from "./Header.module.scss"
import Logo from "public/logo.svg"
import Link from "next/link"
import CartIcon from "../CartIcon/CartIcon"

const Header: React.FC = () => {
  return (
    <header className={Style.header}>
      <div className={Style.header_container}>
        <div className={Style.logo_container}>
          <Link href="/">
            <Image className={Style.logo} src={Logo} alt="audiophile" height={28} width={150}></Image>
          </Link>
        </div>

        <nav className={Style.nav_bar}>
          <Link href="/" legacyBehavior>
            <a className={Style.nav_link}>home</a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className={Style.nav_link}>headphones</a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className={Style.nav_link}>speakers</a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className={Style.nav_link}>earphones</a>
          </Link>
        </nav>

        <CartIcon />
      </div>
    </header>
  )
}

export default Header