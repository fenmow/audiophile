import { ProductType } from "@/services/products";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type cartContextType = {
  cart: ProductType[]
  addProduct: (product: ProductType) => void
  addProducts: (products: ProductType[]) => void
  removeProduct: (productId: number) => void
  clearCart: () => void
}

const cartContext = createContext<cartContextType>({} as cartContextType)

export const CartContextProvider = (props: {
  children?: ReactNode
}) => {
  const [cart, setCart] = useState<ProductType[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem('shopping-cart')
    const cart = storedCart ? JSON.parse(storedCart) : []
    setCart(cart)
  }, [])

  const addProduct = (product: ProductType) => {
    const updatedCart = [...cart, product]
    localStorage.setItem('shopping-cart', JSON.stringify(updatedCart))
    setCart(updatedCart)
  }

  const addProducts = (products: ProductType[]) => {
    const updatedCart = [...cart, ...products]
    localStorage.setItem('shopping-cart', JSON.stringify(updatedCart))
    setCart(updatedCart)
  }

  const removeProduct = (productId: number) => {
    const productIndex = cart.findIndex(product => product.id === +productId)
    if (productIndex !== -1) {
      const updatedCart = [...cart]
      updatedCart.splice(productIndex, 1)
      localStorage.setItem('shopping-cart', JSON.stringify(updatedCart))
      setCart(updatedCart)
    }
  }

  const clearCart = () => {
    localStorage.setItem('shopping-cart', JSON.stringify([]))
    setCart([])
  }

  return (
    <cartContext.Provider value={{ cart, addProduct, addProducts, removeProduct, clearCart }}>
      { props.children }
    </cartContext.Provider>
  )
}

export const useCart = () => useContext(cartContext)