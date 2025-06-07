import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../Context/ProductsProvider/ProductsProvider.jsx';


/**
 * Componente que muestra la pantalla de detalles de un producto.
 *
 * Recibe como parámetro el id del producto a mostrar.
 *
 * Muestra una pantalla con la imagen del producto, el nombre, el precio final
 * calculado según la oferta, la cantidad disponible y los detalles técnicos
 * del producto.
 *
 * Si el producto no existe o no se puede cargar, muestra un mensaje de error.
 *
 * Si el usuario hace clic en el botón de volver, redirige a la pantalla de productos.
 *
 * @returns {React.ReactElement} El elemento JSX de la pantalla de detalles del
 * producto.
 */
function ProductDetailScreen() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [product, setProduct] = useState(null);
  const { products, isLoadingProducts, productsError } = useProducts();

  useEffect(() => {
    if (!isLoadingProducts && !productsError && products.length > 0) {
      const foundProduct = products.find(p => p.id === id); 
      setProduct(foundProduct); 
    } else if (!isLoadingProducts && (productsError || products.length === 0)) {
        setProduct(null);
    }
  }, [id, products, isLoadingProducts, productsError]); 


  if (isLoadingProducts) { 
    return (
      <div className="text-center mt-10 p-4">
        <p className="text-xl text-gray-700">Cargando productos...</p>
      </div>
    );
  }

  if (productsError) { 
    return (
      <div className="text-center mt-10 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
        <p className="text-lg font-semibold mb-4">{productsError}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 hover:underline"
        >
          ← Volver a productos
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-10 p-4">
        <p className="text-lg text-gray-700">Producto no encontrado.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 hover:underline"
        >
          ← Volver a productos
        </button>
      </div>
    );
  }


  const precioOriginal = parseFloat(product.precio);
  const porcentajeOferta = parseFloat(product.porcentajeOferta || 0); 
  const precioFinalCalculado = precioOriginal - (precioOriginal * (porcentajeOferta / 100));


  return (
    <div className="relative max-w-5xl mx-auto mt-10 flex flex-col md:flex-row bg-white rounded-lg overflow-hidden">

      <button
        onClick={() => navigate('/')}
        className="absolute top-5 left-5 text-sm text-blue-600 hover:underline flex items-center"
      >
        ← Volver a productos
      </button>


      <div className="w-full md:w-1/3 p-4 flex items-center justify-center bg-white dark:bg-gray-800 mt-10 md:mt-0">
        <img
          className="object-contain h-60 w-full"
          src={product.imagen || 'https://via.placeholder.com/240x240?text=Imagen+No+Disponible'}
          alt={product.nombre || 'Imagen de Producto'}
        />
      </div>

      <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{product.nombre}</h2>
          
          <div className="mb-4">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              ${precioFinalCalculado.toFixed(2)}
              {porcentajeOferta > 0 && ( 
                <>
                  <span className="text-sm text-gray-500 line-through ml-3">${precioOriginal.toFixed(2)}</span>
                  <span className="text-green-600 text-sm ml-2">({porcentajeOferta}% OFF)</span>
                </>
              )}
            </p>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              {product.cantidadDisponible > 0
                ? `${product.cantidadDisponible} unidades disponibles`
                : 'Agotado'}
            </p>
          </div>

          <div className="mt-6 space-y-2 text-gray-700 dark:text-gray-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Detalles técnicos</h3>
            {product.detalles && (
                (typeof product.detalles === 'object' && !Array.isArray(product.detalles) && Object.keys(product.detalles).length > 0) ? (
                    <ul className="list-disc list-inside space-y-1">
                        {Object.entries(product.detalles).map(([key, value], index) => (
                            <li key={index}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}
                            </li>
                        ))}
                    </ul>
                ) : 
                (Array.isArray(product.detalles) && product.detalles.length > 0) ? (
                    <ul className="list-disc list-inside space-y-1">
                        {product.detalles.map((detail, index) => (
                            <li key={index}>{String(detail)}</li>
                        ))}
                    </ul>
                ) : 
                (
                    <p className="text-gray-500 italic">No hay información detallada disponible.</p>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailScreen;