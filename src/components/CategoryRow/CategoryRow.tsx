import Link from "next/link"
import Styles from "./CategoryRow.module.scss"
import HeadphoneImage from "public/Category/image-category-thumbnail-headphones.png"
import SpeakersImage from "public/Category/image-category-thumbnail-speakers.png"
import EarphonesImage from "public/Category/image-category-thumbnail-earphones.png"
import Image from "next/image"
import ChevronIcon from "../ChevronIcon/ChevronIcon"

const CategoryRow: React.FC = () => {
  return (
    <section className={Styles.category_row}>
      <div className={Styles.category_container}>
        <Link href="/" className={Styles.category_link}>
          <div className={Styles.category_column}>
            <Image className={Styles.category_image} src={HeadphoneImage.src} width={220} height={210} alt="headphones"></Image>
            <h1>headphones</h1>
            <p>shop</p><ChevronIcon />
          </div>
        </Link>
        <Link href="/" className={Styles.category_link}>
          <div className={Styles.category_column}>
            <Image className={Styles.category_image} src={SpeakersImage.src} width={220} height={210} alt="speakers"></Image>
            <h1>speakers</h1>
            <p>shop</p><ChevronIcon />
          </div>
        </Link>
        <Link href="/" className={Styles.category_link}>
          <div className={Styles.category_column}>
            <Image className={Styles.category_image} src={EarphonesImage.src} width={220} height={210} alt="earphones"></Image>
            <h1>earphones</h1>
            <p>shop</p><ChevronIcon />
          </div>
        </Link>
      </div>
    </section>
  )
}

export default CategoryRow