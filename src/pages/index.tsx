import AudioGear from "@/components/AudioGear/AudioGear";
import CategoryRow from "@/components/CategoryRow/CategoryRow";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import HomeMainCard from "@/components/HomeMainCard/HomeMainCard";
import ProductLinks from "@/components/ProductLinks/ProductLinks";
import { ProductType, fetchProducts } from "@/services/products";
import { GetStaticProps, NextPage } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const products: ProductType[] = await fetchProducts()
  return { props: { products } } 
}

const Home: NextPage = (props: {
  products?: ProductType[]
}) => {

  const markTwo = props.products?.find(product => product.slug === 'xx99-mark-two-headphones')
  const zx9 = props.products?.find(product => product.slug === 'zx9-speaker')
  const zx7 = props.products?.find(product => product.slug === 'zx7-speaker')
  const yx1 = props.products?.find(product => product.slug === 'yx1-earphones')

  return (
    <>
      <Header />
      <HomeMainCard productName={markTwo?.name} slug={markTwo?.slug} />
      <CategoryRow />
      <ProductLinks firstProduct={zx9} secondProduct={zx7} thirdProduct={yx1} />
      <AudioGear />
      <Footer />
    </>
  )
}

export default Home