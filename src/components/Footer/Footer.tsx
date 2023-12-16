/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import Style from "./Footer.module.scss"
import Image from "next/image"
import Logo from "/public/logo.svg"
import IconsRow from "../IconsRow/IconsRow"

const Footer: React.FC = () => {
  return (
    <footer className={Style.footer}>
      <div className={Style.footer_container}>
        <div className={Style.links_row}>
          <div className={Style.logo_container}>
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
        </div>

        <div className={Style.footer_grid}>
          <div className={Style.text_content}>
            <p>Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.</p>
          </div>
          <IconsRow />
          <p className={Style.copy}>Copyright 2021. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer