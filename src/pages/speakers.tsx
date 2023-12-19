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
  const speakers = products.filter(product => product.category === 'speakers')
  speakers.reverse()

  return { props: { speakers } }
}

const Speakers: NextPage = (props: {
  speakers?: ProductType[]
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  return (
    <>
      <Header menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <div className={Style.title_container}>
        <h1>speakers</h1>
      </div>
      <div className={Style.products_container}>
      { props.speakers?.map((speaker, index) => (
          <div key={speaker.slug}>
            <ProductCard product={speaker} index={index} />
          </div>
        )) }
      </div>
      <CategoryRow />
      <AudioGear />
      <Footer />
    </>
  )
}

export default Speakers