import Link from "next/link"
import Style from "./HomeMainCard.module.scss"

type HomeMainCardProps = {
  productName: string | undefined
  slug: string | undefined
}

const HomeMainCard: React.FC<HomeMainCardProps> = (props: {
  productName?: string | undefined
  slug?: string | undefined
}) => {

  return (
    <section className={Style.main_card}>
      <div className={Style.main_card_container}>
        <h1 className={Style.new_product}>new product</h1>
        <h1 className={Style.productName}>{props.productName}</h1>
        <p className={Style.text_content}>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
        <Link href={`/${props.slug}`}>
        <button className={Style.product_link}>see product</button>
        </Link>
      </div>
    </section>
  )
}

export default HomeMainCard