import React, { useState } from 'react'
import './loginScreen.css'

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Por favor, completá todos los campos.')
      return
    }

    const userData = {
      nombre: 'Usuario Demo',
      email,
      rol: 'usuario'
    }

    console.log('Usuario logueado:', userData)
    onLogin(userData)
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Iniciar sesión</h2>
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
      <button type="submit">Acceder</button>
    </form>
  )
}

export default LoginScreen
