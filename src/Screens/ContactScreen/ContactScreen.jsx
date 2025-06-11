import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'

const ContactScreen = () => {
  const [formValues, setFormValues] = useState(null)

  const fields = {
    NOMBRE_COMPLETO: 'nombre_completo',
    MENSAJE: 'mensaje',
    EMAIL: 'email'
  }

  const handleSubmitContactForm = (event) => {
    event.preventDefault()

    const contactFormData = new FormData(event.target)
    const contactFormValues = {}

    for (let field in fields) {
      contactFormValues[fields[field]] = contactFormData.get(fields[field])
    }

    setFormValues(contactFormValues)
    alert('Consulta enviada con éxito.')
  }

  return (
    <div>
      <Navbar />
      <h1>Contactanos</h1>
      <form onSubmit={handleSubmitContactForm} className="form">
        <div>
          <label htmlFor="nombre_completo">Nombre completo:</label>
          <input
            type="text"
            placeholder="Joe Doe"
            maxLength={30}
            id="nombre_completo"
            name={fields.NOMBRE_COMPLETO}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="joedoe@mail.com"
            id="email"
            name={fields.EMAIL}
            required
          />
        </div>

        <div>
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            placeholder="Escribe tu mensaje..."
            id="mensaje"
            name={fields.MENSAJE}
            required
          />
        </div>

        <button type="submit">Enviar consulta</button>
      </form>
    </div>
  )
}

export default ContactScreen
