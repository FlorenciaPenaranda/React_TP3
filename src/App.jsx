import React from 'react';
import NavBar from './Components/NavBar/NavBar.jsx';
import AppRoutes from './AppRoutes/AppRoutes.jsx';
import { ProductsProvider } from './Context/ProductsProvider/ProductsProvider.jsx'; 


/**
 * Componente principal de la aplicación.
 *
 * Renderiza la barra de navegación superior y las rutas de la
 * aplicación, ahora con acceso global a los datos de productos.
 *
 * @returns {React.ReactElement} El elemento JSX de la aplicación.
 */
function App() {
  return (
    <ProductsProvider> 
      <NavBar />
      <AppRoutes />
    </ProductsProvider>
  );
}

export default App;