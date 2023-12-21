import Header from "@/components/Header/Header"
import { ProductType, fetchProducts } from "@/services/products"
import { GetStaticProps, NextPage } from "next"
import Style from "../styles/ProductsPage.module.scss"
import ProductCard from "@/components/ProductCard/ProductCard"
import CategoryRow from "@/components/CategoryRow/CategoryRow"
import AudioGear from "@/components/AudioGear/AudioGear"
import Footer from "@/components/Footer/Footer"
import { useState } from "react"

export const getStaticProps: GetStaticProps = async () => {
  const products: ProductType[] = await fetchProducts()
  const headphones = products.filter(product => product.category === 'headphones')
  headphones.reverse()

  return { props: { headphones } }
}

const Headphones: NextPage = (props: {
  headphones?: ProductType[]
}) => {
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false)
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  return (
    <>
      <Header cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <main className={`${Style.page_container} ${cartIsOpen ? `${Style.cart_is_open}` : ''} ${menuIsOpen ? `${Style.menu_is_open}` : ''}`}>
        <div className={Style.title_container}>
          <h1>headphones</h1>
        </div>
        <div className={Style.products_container}>
        { props.headphones?.map((headphone, index) => (
            <div key={headphone.slug}>
              <ProductCard product={headphone} index={index} />
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

export default Headphones