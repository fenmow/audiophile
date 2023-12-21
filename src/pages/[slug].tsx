import Header from "@/components/Header/Header";
import { ProductType, fetchProduct, fetchProducts } from "@/services/products";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Style from "../styles/ProductPage.module.scss"
import Image from "next/image";
import AddAndRemoveBtn from "@/components/AddAndRemoveBtn/AddAndRemoveBtn";
import { useState } from "react";
import CategoryRow from "@/components/CategoryRow/CategoryRow";
import AudioGear from "@/components/AudioGear/AudioGear";
import Footer from "@/components/Footer/Footer";
import { useCart } from "@/hooks/useCart";

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug
  if (typeof slug === 'string') {
    const product: ProductType = await fetchProduct(slug)
    return { props: { product } }
  }

  return { redirect: { destination: "/", permanent: false } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products: ProductType[] = await fetchProducts()
  const paths = products.map(product => {
    return { params: { slug: product.slug.toString() } }
  })

  return { paths, fallback: false }
}

type productPageType = {
  product: ProductType
}

const ProductPage: NextPage<productPageType> = (props: {
  product: ProductType
}) => {
  const { addProducts } = useCart()
  const [productsList, setProductsList] = useState<ProductType[]>([props.product!])
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false)
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  return (
    <>
      <Header cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <div className={Style.header_background}></div>

      <main className={`${Style.page_container} ${cartIsOpen ? `${Style.cart_is_open}` : ''} ${menuIsOpen ? `${Style.menu_is_open}` : ''}`}>
      <div className={Style.back_link_container}>
        <div className={Style.back_link}>
          <Link href={`/${props.product?.category}`} legacyBehavior>
            <a className={Style.back_link_content}>Go Back</a>
          </Link>
        </div>
      </div>

      <div className={Style.product_card_container}>
        <div className={Style.product_card}>
          <div className={Style.image_container}>
            <picture>
              <source media="(min-width: 1024px)" srcSet={props.product?.image?.desktop!}/>
              <Image className={Style.image} src={props.product?.image?.tablet!} width={500} height={500} alt="product image"></Image>
            </picture>
          </div>
          <div className={Style.product_content_container}>
              { props.product?.new && (<h1 className={Style.is_new_product}>new product</h1>) }
              <h1 className={Style.product_name}>{props.product?.name}</h1>
              <p className={Style.product_description}>{props.product?.description}</p>
              <p className={Style.product_price}>$ {props.product?.price.toLocaleString().replace('.', ',')}</p>
              <div className={Style.interaction_buttons}>
                <AddAndRemoveBtn qtd={productsList.length} setQtd={setProductsList} product={props.product!} />
                <button onClick={() => {
                  addProducts(productsList)
                  setProductsList([props.product])
                }}>add to cart</button>
              </div>
          </div>

          <div className={Style.product_features}>
            <h1>features</h1>
            <p>{props.product?.features}</p>
          </div>
          <div className={Style.product_in_the_box}>
            <h1>in the box</h1>
            <div className={Style.in_the_box_container}>
              { props.product?.includes.map(include => (
                <div className={Style.include_item} key={include.item}>
                  <span className={Style.quantity}>{include.quantity}x</span>
                  <span className={Style.item}>{include.item}</span>
                </div>
              )) }
            </div>
          </div>

          <div className={Style.images_section}>
            <div className={Style.image_container}>
              <Image className={Style.image} src={props.product?.gallery?.first?.desktop!} alt="image" width={200} height={200}></Image>
            </div>
            <div className={`${Style.image_container} ${Style.second_image}`}>
            <Image className={Style.image} src={props.product?.gallery?.second?.desktop!} alt="image" width={200} height={200}></Image>
            </div>
            <div className={`${Style.image_container} ${Style.third_image}`}>
            <Image className={Style.image} src={props.product?.gallery?.third?.desktop!} alt="image" width={200} height={200}></Image>
            </div>
          </div>

          <div className={Style.others}>
              <h1>you may also like</h1>
              <div className={Style.others_grid}>
                { props.product?.others.map(other => (
                  <div className={Style.other} key={other.slug}>
                    <Image className={Style.image} src={other.image.desktop} alt={other.name} width={350} height={330}></Image>
                    <h1>{other.name}</h1>
                    <Link href={`/${other.slug}`}>
                      <button>see product</button>
                    </Link>
                  </div>
                )) }
              </div>
          </div>
        </div>
        <CategoryRow />

        <AudioGear />
      </div>
      <Footer />
      </main>
    </>
  )
}

export default ProductPage