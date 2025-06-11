import React, { useContext } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { UserContext } from '../../Context/UserContextProvider'

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const isAuthenticated = !!userInfo
  const navigate = useNavigate()

  const isActiveCallback = ({ isActive }) =>
    isActive ? 'link link-seleccionado' : 'link'

  const handleLogout = () => {
    setUserInfo(null)
    navigate('/')
  }

  return (
    <header className="navbar-header">
      <h2 className="navbar-title">Sistema de Seguimiento de Obras</h2>

      <nav className="navbar-nav">
        <NavLink to="/" className={isActiveCallback}>
          Inicio
        </NavLink>
        <NavLink to="/contact" className={isActiveCallback}>
          Contacto
        </NavLink>
        <>
          <NavLink to="/login" className={isActiveCallback}>
            Login
          </NavLink>
          <NavLink to="/registro" className={isActiveCallback}>
            Registro
          </NavLink>
        </>


        {isAuthenticated && (
          <>
            <Link to="/obra/new" className="link">
              Crear Obra
            </Link>
            <button onClick={handleLogout} className="logout-button">
              Cerrar sesión
            </button>
          </>
        )}
      </nav>

      {isAuthenticated && (
        <span className="navbar-user">
          Bienvenido {userInfo.nombre}, perfil: {userInfo.rol}
        </span>
      )}
    </header>
  )
}

export default Navbar
