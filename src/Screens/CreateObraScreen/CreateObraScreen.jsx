import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import database from '../../config/firebase'
import Navbar from '../../Components/Navbar/Navbar'

const CreateObraScreen = () => {
  const initialFormState = {
    nombre: '',
    localidad: '',
    monto_convenio: 0,
    estado: '',
    img: null
  }

  const [formState, setFormState] = useState(initialFormState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (event) => {
    const { name, type, value, files } = event.target
    const newValue = type === 'file' ? files[0] : value

    setFormState((prev) => ({
      ...prev,
      [name]: newValue
    }))
  }

  const uploadImgToImgBB = async (imgFile) => {
    const API_KEY_IMGBB = 'ea7f2c286c3265764574bfcca2499bde'
    const formData = new FormData()
    formData.append('image', imgFile)

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${API_KEY_IMGBB}`,
      {
        method: 'POST',
        body: formData
      }
    )

    const data = await response.json()
    return data.data.url
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formState.img) {
      alert('Por favor seleccioná una imagen.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const imageUrl = await uploadImgToImgBB(formState.img)

      const collectionRef = collection(database, 'obras')
      await addDoc(collectionRef, {
        nombre: formState.nombre,
        monto_convenio: Number(formState.monto_convenio),
        localidad: formState.localidad,
        estado: formState.estado,
        img: imageUrl
      })

      alert('Obra creada correctamente.')
      setFormState(initialFormState)
    } catch (err) {
      setError('Error al crear la obra. Intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <h1>Crear Nueva Obra</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre de la Obra:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre de la obra"
            value={formState.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="localidad">Localidad:</label>
          <input
            type="text"
            id="localidad"
            name="localidad"
            placeholder="Nombre de la localidad"
            value={formState.localidad}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="monto_convenio">Monto:</label>
          <input
            type="number"
            id="monto_convenio"
            name="monto_convenio"
            min={0}
            value={formState.monto_convenio}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="estado">Estado:</label>
          <input
            type="text"
            id="estado"
            name="estado"
            value={formState.estado}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="img">Imagen:</label>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creando obra...' : 'Crear Obra'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

export default CreateObraScreen
