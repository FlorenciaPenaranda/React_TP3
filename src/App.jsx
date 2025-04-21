import React from 'react';
import NavBar  from './Components/NavBar/NavBar.jsx';
import AppRoutes from './AppRoutes/AppRoutes.jsx';

/**
 * Componente principal de la aplicación.
 *
 * Renderiza la barra de navegación superior y las rutas de la
 * aplicación.
 *
 * @returns {React.ReactElement} El elemento JSX de la aplicación.
 */
function App() {
  return (
    <>
      <NavBar></NavBar>
      <AppRoutes></AppRoutes>    
    </>
  )
}

export default App
