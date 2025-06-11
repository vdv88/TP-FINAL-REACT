import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, updateProductById } from '../../services/product'
import Navbar from '../../Components/Navbar/Navbar'
import { UserContext } from '../../Context/UserContextProvider'

const EditObraScreen = () => {
  const { product_id } = useParams()
  const navigate = useNavigate()
  const { isAdmin } = useContext(UserContext)

  const [obra, setObra] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchObra = async () => {
      try {
        const obraData = await getProductById(product_id)
        if (!obraData) throw new Error('Obra no encontrada')
        setObra(obraData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchObra()
  }, [product_id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setObra((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const updatedObra = {
        ...obra,
        monto_convenio: Number(obra.monto_convenio), 
      }

      await updateProductById(product_id, updatedObra)
      alert('Obra actualizada con éxito')
      navigate(`/product/${product_id}`)
    } catch (err) {
      alert('Error al guardar los cambios')
      console.error(err)
    }
  }

  if (!isAdmin) return <h2 style={{ color: 'red' }}>No autorizado</h2>
  if (loading) return <h2>Cargando...</h2>
  if (error) return <h2 style={{ color: 'red' }}>{error}</h2>

  return (
    <div>
      <Navbar />
      <div className="product-detail-container">
        <h1>Editar Obra</h1>
        <form onSubmit={handleSubmit}>
          <label>Localidad:</label>
          <input name="localidad" value={obra.localidad || ''} onChange={handleChange} />

          <label>Estado:</label>
          <input name="estado" value={obra.estado || ''} onChange={handleChange} />

          <label>Monto Convenio:</label>
          <input
            name="monto_convenio"
            type="number"
            value={obra.monto_convenio || ''}
            onChange={handleChange}
          />

          <label>Descripción:</label>
          <textarea name="descripcion" value={obra.descripcion || ''} onChange={handleChange} />

          <label>Esquema de desembolsos:</label>
          <input
            name="esquema_desembolsos"
            value={obra.esquema_desembolsos || ''}
            onChange={handleChange}
          />

          <label>Entidad:</label>
          <input name="entidad" value={obra.entidad || ''} onChange={handleChange} />

          <button type="submit">Guardar cambios</button>
        </form>
      </div>
    </div>
  )
}

export default EditObraScreen
