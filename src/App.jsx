import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen/HomeScreen.jsx'
import ProductDetailScreen from './Screens/ProductDetailScreen/ProductDetailScreen.jsx'
import ContactScreen from './Screens/ContactScreen/ContactScreenControlada.jsx'
import CreateObraScreen from './Screens/CreateObraScreen/CreateObraScreen.jsx'
import UserContextProvider, { UserContext } from './Context/UserContextProvider'
import LoginRegistroScreen from './Screens/LoginRegistroScren/LoginRegistroScreen.jsx'
import LoginScreen from './Screens/LoginScreen/LoginScreen.jsx'
import RegistroScreen from './Screens/RegistroScreen/RegistroScreen.jsx'
import EditObraScreen from './Screens/EditObraScreen/EditObraScreen.jsx'


const AppContent = () => {
  const { userInfo, setUserInfo, isAdmin } = useContext(UserContext)
  const isAuthenticated = !!userInfo

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path="*" element={<LoginRegistroScreen onLogin={setUserInfo} />} />
      ) : (
        <>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/product/:product_id" element={<ProductDetailScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/registro" element={<RegistroScreen />} />
          <Route path="/obra/new" element={<CreateObraScreen />} />
          <Route path="/obra/edit/:product_id" element={isAdmin ? <EditObraScreen /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  )
}

const App = () => (
  <UserContextProvider>
    <div className="App">
      <AppContent />
    </div>
  </UserContextProvider>
)

export default App
