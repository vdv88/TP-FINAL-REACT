import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProductList from '../../Components/ProductList/ProductList'
import ProductContextProvider from '../../Context/ProductContextProvider'

const HomeScreen = () => {
  return (
    <ProductContextProvider>
      <div>
        <Navbar />
        <h2>Listado de Obras:</h2>
        <ProductList />
      </div>
    </ProductContextProvider>
  )
}

export default HomeScreen
