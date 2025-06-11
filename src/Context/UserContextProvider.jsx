import React, { createContext, useState } from 'react'

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null)

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        isAuthenticated: !!userInfo,
        isAdmin: userInfo?.role === 'admin',
        saludo_default: 'hola',
        idioma: 'español'
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
