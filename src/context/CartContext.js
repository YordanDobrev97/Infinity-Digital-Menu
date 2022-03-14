import { useState, createContext } from 'react'

const CartContext = createContext({
  products: [],
  setProducts: (value) => {}
})

export default CartContext