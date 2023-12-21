import { ProductType } from "@/services/products"
import Style from "./ProductCard.module.scss"
import Image from "next/image"
import Link from "next/link"

type ProductCardProps = {
  product: ProductType
  index: number
}

const ProductCard: React.FC<ProductCardProps> = (props: {
  product?: ProductType
  index?: number
}) => {
  return (
    <>
      { props.index! % 2 === 0 ? (
        <div className={Style.product_card_container}>
        <div className={Style.product_card}>
          <div className={Style.image_container}>
            <picture>
              <source media="(min-width: 1024px)" srcSet={props.product?.image?.desktop!}/>
              <source media="(min-width: 640px)" srcSet={props.product?.image?.tablet!}/>
              <Image className={Style.image} src={props.product?.categoryImage?.mobile!} width={500} height={500} alt="product image"></Image>
            </picture>
          </div>
          <div className={Style.product_content_container}>
              { props.product?.new && (<h1 className={Style.is_new_product}>new product</h1>) }
              <h1 className={Style.product_name}>{props.product?.name}</h1>
              <p className={Style.product_description}>{props.product?.description}</p>
              <Link className={Style.product_link} href={`/${props.product?.slug}`}>
                <button>see product</button>
              </Link>
          </div>
        </div>
      </div>
      ) : (
      <div className={Style.product_card_container}>
        <div className={`${Style.product_card} ${Style.product_card_reverse}`}>
          <div className={Style.product_content_container}>
              { props.product?.new && (<h1 className={Style.is_new_product}>new product</h1>) }
              <h1 className={Style.product_name}>{props.product?.name}</h1>
              <p className={Style.product_description}>{props.product?.description}</p>
              <Link className={Style.product_link} href={`/${props.product?.slug}`}>
                <button>see product</button>
              </Link>
          </div>

          <div className={Style.image_container} style={{ justifyContent: 'end' }}>
            <picture>
              <source media="(min-width: 1024px)" srcSet={props.product?.image?.desktop!}/>
              <source media="(min-width: 640px)" srcSet={props.product?.image?.tablet!}/>
              <Image className={Style.image} src={props.product?.categoryImage?.mobile!} width={500} height={500} alt="product image"></Image>
            </picture>
          </div>
        </div>
      </div>
      ) }
    </>
  )
}

export default ProductCard