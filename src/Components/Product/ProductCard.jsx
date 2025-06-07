import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente que representa una tarjeta de producto.
 *
 * Recibe un objeto con las siguientes propiedades:
 * - id: identificador del producto.
 * - nombre: nombre del producto.
 * - imagen: URL de la imagen del producto.
 * - precio: precio base del producto (precio original).
 * - porcentajeOferta: porcentaje de descuento.
 * - cantidadDisponible: cantidad de productos disponibles.
 *
 * El componente muestra una tarjeta con la imagen del producto, el nombre, el
 * precio final calculado, el porcentaje de descuento y la cantidad disponible.
 * Si el usuario hace clic en el botón de compra, decrementa la cantidad disponible
 * y muestra un mensaje de "Agotado" si no hay más productos disponibles.
 */
function ProductCard({ product }) {
  const {
    id,
    nombre,
    imagen,
    precio,
    porcentajeOferta,
    cantidadDisponible,
  } = product;

  const [cantidad, setCantidad] = useState(cantidadDisponible);

  const precioConOferta = precio - (precio * porcentajeOferta) / 100;

  const handleCompra = (e) => {
    e.stopPropagation(); 
    e.preventDefault();  

    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div className="relative m-6 w-full max-w-[240px] overflow-hidden rounded-lg bg-white shadow-md flex flex-col">
      <Link to={`/product/${id}`} className="h-48 w-full overflow-hidden flex justify-center">
        <img
          className="object-contain h-full w-full p-2" 
          src={imagen}
          alt={nombre}
        />
      </Link>
      <div className="absolute top-1 left-1 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded">
        -{porcentajeOferta}%
      </div>

      <div className="flex flex-col justify-between flex-grow mt-3 px-4 pb-4">
        <div>
          <Link to={`/product/${id}`}>

            <h5 className="text-lg font-semibold tracking-tight text-slate-900">
              {nombre}
            </h5>
          </Link>
        </div>

        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
          {cantidad > 0 ? (
            <span>{cantidad} unidades disponibles</span>
          ) : (
            <span>Agotado</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3">
          <p>
            <span className="text-2xl font-bold text-slate-900">
              ${Math.floor(precioConOferta)}
            </span>
            <span className="text-xs text-slate-900 line-through ml-1">
              ${precio}
            </span>
          </p>

          <button
            onClick={handleCompra}
            disabled={cantidad <= 0}
            className={`flex items-center rounded-md px-3 py-1.5 text-center text-xs font-medium cursor-pointer
              ${cantidad <= 0
                ? "bg-slate-300 text-white cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              }`}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;