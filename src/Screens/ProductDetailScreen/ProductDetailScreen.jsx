import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../../services/product'
import Navbar from '../../Components/Navbar/Navbar'
import { UserContext } from '../../Context/UserContextProvider'
import './ProductDetailScreen.css'

const ProductDetailScreen = () => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { product_id } = useParams()
  const { isAdmin } = useContext(UserContext)
  const navigate = useNavigate()

  const getProductDetail = async () => {
    try {
      setLoading(true)
      setError(null)

      const productDetail = await getProductById(product_id)

      if (productDetail) {
        setProduct(productDetail)
      } else {
        setError('Producto no encontrado.')
      }
    } catch (err) {
      setError('Error al cargar el producto.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductDetail()
  }, [])

  const fecha = product?.fecha_inicio?.toDate?.().toLocaleDateString?.() || 'Sin fecha'

  let content
  if (loading) {
    content = <h2>Cargando...</h2>
  } else if (error) {
    content = <h2 style={{ color: 'red' }}>{error}</h2>
  } else if (!product) {
    content = <h2>No se encontró la obra.</h2>
  } else {
    content = (
      <div className="product-detail-container">
        <h1>{product.nombre}</h1>
        <p><strong>Localidad:</strong> {product.localidad}</p>
        <p><strong>Fecha de Inicio:</strong> {fecha}</p>
        <p><strong>Estado:</strong> {product.estado}</p>
        <p><strong>Monto Convenio:</strong> ${Number(product.monto_convenio || 0).toLocaleString('es-AR')}</p>

        <hr />

        <p><strong>Descripción de la obra:</strong> {product.descripcion || 'No disponible'}</p>
        <p><strong>Esquema de desembolsos:</strong> {product.esquema_desembolsos || 'No especificado'}</p>
        <p><strong>Entidad:</strong> {product.entidad || 'Sin datos'}</p>

        {isAdmin && (
          <div style={{ marginTop: '20px' }}>
            <button onClick={() => navigate(`/obra/edit/${product.id}`)}>
              Editar obra
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      {content}
    </div>
  )
}

export default ProductDetailScreen
