import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductCard.css'

const ProductCard = ({
  img,
  nombre,
  monto_convenio = 0,
  localidad,
  estado,
  fecha_inicio,
  is_admin,
  id
}) => {
  const [isBought, setIsBought] = useState(false)

  const handleClickBuyButton = () => {
    alert('Tramitación iniciada!')
    setIsBought(true)
  }

  const fecha =
    fecha_inicio?.toDate?.().toLocaleDateString?.() || 'Sin fecha'

  return (
    <div className={`product-info ${is_admin ? 'admin' : ''}`}>
      <img src={img} alt={nombre} className="product-img" />
      <h3>{nombre}</h3>

      <div className="product-details">
        <p><strong>Localidad:</strong> {localidad}</p>
        <p><strong>Fecha de Inicio:</strong> {fecha}</p>
        <p><strong>Estado:</strong> {estado}</p>
        <p><strong>Monto Convenio:</strong> ${Number(monto_convenio).toLocaleString('es-AR')}</p>
      </div>

      {
        isBought ? (
          <button disabled>Tramitación Exitosa</button>
        ) : (
          <button onClick={handleClickBuyButton}>Iniciar Tramitación</button>
        )
      }

      <Link to={`/product/${id}`}>Ver detalle</Link>
    </div>
  )
}

export default ProductCard
