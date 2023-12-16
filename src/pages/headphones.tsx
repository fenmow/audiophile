import Header from "@/components/Header/Header"
import { ProductType, fetchProducts } from "@/services/products"
import { GetStaticProps, NextPage } from "next"
import Style from "../styles/ProductsPage.module.scss"
import ProductCard from "@/components/ProductCard/ProductCard"
import CategoryRow from "@/components/CategoryRow/CategoryRow"
import AudioGear from "@/components/AudioGear/AudioGear"
import Footer from "@/components/Footer/Footer"

export const getStaticProps: GetStaticProps = async () => {
  const products: ProductType[] = await fetchProducts()
  const headphones = products.filter(product => product.category === 'headphones')
  headphones.reverse()

  return { props: { headphones } }
}

const Headphones: NextPage = (props: {
  headphones?: ProductType[]
}) => {
  return (
    <>
      <Header />
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
    </>
  )
}

export default Headphones