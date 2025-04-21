import React from 'react';
import mockData from '../../Services/mock_data.json';
import ProductCard from '../../Components/Product/ProductCard.jsx';

/**
 * Componente que muestra una pantalla de productos.
 *
 * Muestra una grilla de todos los productos en la base de datos.
 *
 * @returns {React.ReactElement} El elemento JSX de la pantalla de
 * productos.
 */
function ProductsScreen() {
  return (
      <div className="flex flex-wrap justify-start">
        {mockData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

  );
}

export default ProductsScreen;
