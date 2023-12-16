import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Style from "./IconsRow.module.scss"
import Link from "next/link";

const IconsRow: React.FC = () => {
  return (
    <div className={Style.icons_row}>
      <Link href="https://facebook.com" target="_blank">
        <span><FaFacebookSquare /></span>
      </Link>
      <Link href="https://x.com" target="_blank">
        <span><FaTwitter /></span>
      </Link>
      <Link href="https://instagram.com" target="_blank">
        <span><FaInstagram /></span>
      </Link>
    </div>
  )
}

export default IconsRow