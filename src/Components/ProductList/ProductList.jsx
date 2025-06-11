import React, { useContext } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductList.css'
import { ProductContext } from '../../Context/ProductContextProvider'
import { UserContext } from '../../Context/UserContextProvider'

const ProductList = () => {
  const { products, loading, error } = useContext(ProductContext)
  const { userInfo } = useContext(UserContext)

  const isAdmin = userInfo?.rol === 'admin'

  if (loading) return <h2>Cargando...</h2>
  if (error) return <h2>{error}</h2>
  if (!products.length) return <h2>No hay obras disponibles</h2>

  return (
    <div className={`product-list-container ${isAdmin ? 'admin' : ''}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          is_admin={isAdmin}
        />
      ))}
    </div>
  )
}

export default ProductList
