import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockData from '../../Services/mock_data.json';

/**
 * Pantalla de detalles de un producto.
 *
 * Muestra la imagen, nombre, precio final y detalles técnicos del
 * producto seleccionado.
 *
 * @returns {React.ReactElement} Elemento JSX de la pantalla de detalles
 * del producto.
 */
function ProductDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = mockData.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Producto no encontrado.</p>;
  }

  return (
    <div className="relative max-w-5xl mx-auto mt-10 flex flex-col md:flex-row bg-white rounded-lg overflow-hidden">

      {/* Botón volver */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-5 left-5 text-sm text-blue-600 hover:underline flex items-center"
      >
        ← Volver a productos
      </button>

      {/* Imagen a la izquierda */}
      <div className="w-full md:w-1/3 p-4 flex items-center justify-center bg-white dark:bg-gray-800 mt-10 md:mt-0">
        <img
          className="object-contain h-60 w-full"
          src={product.imagen}
          alt={product.nombre}
        />
      </div>

      {/* Detalles a la derecha */}
      <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{product.nombre}</h2>
          
          <div className="mb-4">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              ${product.precioFinal}
              <span className="text-sm text-gray-500 line-through ml-3">${product.precioReal}</span>
            </p>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              {product.cantidadDisponible > 0
                ? `${product.cantidadDisponible} unidades disponibles`
                : 'Agotado'}
            </p>
          </div>

          {product.detalles && (
            <div className="mt-6 space-y-2 text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Detalles técnicos</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Caja:</strong> {product.detalles.caseSize}</li>
                <li><strong>Pantalla:</strong> {product.detalles.retina}</li>
                <li><strong>Chip:</strong> {product.detalles.chip}</li>
                <li><strong>Salud:</strong> {product.detalles.heartRate}</li>
                <li><strong>Batería:</strong> {product.detalles.battery}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailScreen;
