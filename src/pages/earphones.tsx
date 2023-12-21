import AudioGear from "@/components/AudioGear/AudioGear";
import CategoryRow from "@/components/CategoryRow/CategoryRow";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ProductCard from "@/components/ProductCard/ProductCard";
import { ProductType, fetchProducts } from "@/services/products";
import { GetStaticProps, NextPage } from "next";
import Style from "../styles/ProductsPage.module.scss"
import { useState } from "react";

export const getStaticProps: GetStaticProps = async () => {
  const products = await fetchProducts()
  const earphones = products.filter(product => product.category === 'earphones')

  return { props: { earphones } }
}

const Earphones: NextPage = (props: {
  earphones?: ProductType[]
}) => {
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false)
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  return (
    <>
      <Header cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <main className={`${Style.page_container} ${cartIsOpen ? `${Style.cart_is_open}` : ''} ${menuIsOpen ? `${Style.menu_is_open}` : ''}`}>
        <div className={Style.title_container}>
          <h1>earphones</h1>
        </div>
        <div className={Style.products_container}>
        { props.earphones?.map((earphone, index) => (
            <div key={earphone.slug}>
              <ProductCard product={earphone} index={index} />
            </div>
          )) }
        </div>
        <CategoryRow />
        <AudioGear />
        <Footer />
      </main>
    </>
  )
}

export default Earphones