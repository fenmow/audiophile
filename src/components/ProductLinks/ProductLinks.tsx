import Image from "next/image"
import Style from "./ProductLinks.module.scss"
import SpeakerImage from "public/home/desktop/image-speaker-zx9.png"
import EarphoneImage from "public/home/desktop/image-earphones-yx1.jpg"
import { ProductType } from "@/services/products"
import PatternCircles from "public/home/desktop/pattern-circles.svg"
import Link from "next/link"

type ProductLinkProps = {
  firstProduct: ProductType | undefined
  secondProduct: ProductType | undefined
  thirdProduct: ProductType | undefined
}

const ProductLinks: React.FC<ProductLinkProps> = (props: {
  firstProduct?: ProductType | undefined
  secondProduct?: ProductType | undefined
  thirdProduct?: ProductType | undefined
}) => {
  return (
    <section className={Style.product_links}>
      <div className={Style.product_links_container}>
        <div className={`${Style.product_row} ${Style.first_product}`} style={{ backgroundImage: `url(${PatternCircles.src})` }}>
          <div className={Style.image_column}>
            <Image className={Style.image} src={SpeakerImage.src} height={450} width={350} alt="ZX9 SPEAKER"></Image>
          </div>

          <div className={Style.text_content}>
            <h1>{props.firstProduct?.name}</h1>
            <p>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
            <Link href={`/${props.firstProduct?.slug.toString()}`}>
              <button>see product</button>
            </Link>
          </div>
        </div>
        <div className={`${Style.product_row} ${Style.second_product}`}>
          <div className={Style.text_content}>
            <h1>{props.secondProduct?.name}</h1>
            <Link href={`/${props.secondProduct?.slug.toString()}`}>
                <button>see product</button>
            </Link>
          </div>
        </div>
        <div className={`${Style.product_row} ${Style.third_product}`}>
          <div className={Style.image_column}>
            <Image className={Style.image} src={EarphoneImage.src} alt="earphone" height={300} width={500}></Image>
          </div>
          <div className={Style.text_content}>
            <h1>{props.thirdProduct?.name}</h1>
            <Link href={`/${props.secondProduct?.slug.toString()}`}>
                <button>see product</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductLinks