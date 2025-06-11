import React, { useState } from 'react'
import LoginScreen from '../LoginScreen/LoginScreen.jsx'
import RegistroScreen from '../RegistroScreen/RegistroScreen.jsx'
import './LoginRegistroScreen.css'

const LoginRegistroScreen = ({ onLogin }) => {
  const [mostrarLogin, setMostrarLogin] = useState(true)

  const handleAdminLogin = () => {
    const adminUser = {
      nombre: 'Administrador',
      email: 'admin@sistema.com',
      rol: 'admin'
    }
    onLogin(adminUser)
  }

  return (
    <div className="login-registro-page">
      <div className="form-container">
        {mostrarLogin ? (
          <>
            
            <LoginScreen onLogin={onLogin} />
            <p style={{ marginTop: '10px', textAlign: 'center' }}>
              ¿No tenés cuenta?{' '}
              <button onClick={() => setMostrarLogin(false)} className="link-button">
                Registrate acá
              </button>
            </p>
          </>
        ) : (
          <>
          
            <RegistroScreen onRegister={onLogin} />
            <p style={{ marginTop: '10px', textAlign: 'center' }}>
              ¿Ya tenés cuenta?{' '}
              <button onClick={() => setMostrarLogin(true)} className="link-button">
                Iniciá sesión
              </button>
            </p>
          </>
        )}

        <section className="admin-section">
          <button onClick={handleAdminLogin} className="admin-button">
            Entrar como administrador
          </button>
        </section>
      </div>
    </div>
  )
}

export default LoginRegistroScreen
