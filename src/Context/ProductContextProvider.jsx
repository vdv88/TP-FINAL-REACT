import React, { createContext, useEffect, useState } from 'react'
import { getProducts } from '../services/product'

export const ProductContext = createContext()

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getProductsList = async () => {
    try {
      setLoading(true)
      const response = await getProducts()

      if (response) {
        setProducts(response)
        setError(null)
      } else {
        setError('Error al obtener productos')
      }
    } catch (err) {
      setError('Error de red o servidor')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductsList()
  }, [])

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        reloadProducts: getProductsList,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider
