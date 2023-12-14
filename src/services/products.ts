type includeType = {
  quantity: number
  item: string
}

type othersType = Pick<ProductType, 'name' | 'slug' | 'image'>

export type ProductType = {
  id: number
  slug: string
  name: string
  image: { mobile: string, tablet: string, desktop: string }
  category: string
  categoryImage: { mobile: string, tablet: string, desktop: string }
  new: boolean
  price: number
  description: string
  features: string
  includes: includeType[]
  gallery: { first: { mobile: string, tablet: string, desktop: string }, 
             second: { mobile: string, tablet: string, desktop: string }
             third: { mobile: string, tablet: string, desktop: string }
           }
  others: othersType[]
}

export const fetchProducts = async () => {
  const products: ProductType[] = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/products`).then(res => res.json())
  return products
}

export const fetchProduct = async (slug: string) => {
  const product: ProductType = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/products/${slug}`).then(res => res.json())
  return product
}