import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from '../Screens/LoginScreen/LoginScreen'
import RegisterScreen from '../Screens/RegisterScreen/RegisterScreen' 
import ProductsScreen from '../Screens/ProductsScreen/ProductsScreen'
import ProductDetailScreen from '../Screens/ProductDetailScreen/ProductDetailScreen'

/**
 * Componente que define las rutas de la aplicación
 *
 * Aqu  se definen las rutas para:
 * - La pantalla de inicio (que muestra todos los productos)
 * - La pantalla de login
 *  * - La pantalla de Regitro
 * - La pantalla de detalles de un producto
 * 
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductsScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/product/:id" element={<ProductDetailScreen />} />
    </Routes>
  )
}

export default AppRoutes