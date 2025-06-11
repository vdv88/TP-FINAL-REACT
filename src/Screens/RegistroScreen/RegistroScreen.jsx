import React, { useState } from 'react'
import './RegistroScreen.css'

const RegistroScreen = ({ onRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()

    if (!email || !password || !passwordConfirm) {
      alert('Por favor, completá todos los campos.')
      return
    }

    if (password !== passwordConfirm) {
      alert('Las contraseñas no coinciden.')
      return
    }

    const newUser = {
      nombre: 'Nuevo Usuario',
      email,
      rol: 'usuario'
    }

    console.log('Usuario registrado:', newUser)
    onRegister(newUser)
  }

  return (
    <form className="registro-form" onSubmit={handleRegister}>
      <h2>Registrarse</h2>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        required
      />

      <button type="submit">Crear cuenta</button>
    </form>
  )
}

export default RegistroScreen
