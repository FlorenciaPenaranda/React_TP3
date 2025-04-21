import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente que representa una tarjeta de producto.
 *
 * Recibe un objeto con las siguientes propiedades:
 * - id: identificador del producto.
 * - nombre: nombre del producto.
 * - imagen: URL de la imagen del producto.
 * - precioReal: precio real del producto.
 * - precioFinal: precio final del producto después de aplicar la oferta.
 * - porcentajeOferta: porcentaje de descuento.
 * - cantidadDisponible: cantidad de productos disponibles.
 *
 * El componente muestra una tarjeta con la imagen del producto, el nombre, el
 * precio final, el porcentaje de descuento y la cantidad disponible. Si el
 * usuario hace clic en el botón de compra, decrementa la cantidad disponible
 * y muestra un mensaje de "Agotado" si no hay más productos disponibles.
 */
function ProductCard({ product }) {
  const {
    id,
    nombre,
    imagen,
    precioReal,
    precioFinal,
    porcentajeOferta,
    cantidadDisponible,
  } = product;

  const [comprado, setComprado] = useState(false);
  const [cantidad, setCantidad] = useState(cantidadDisponible);

  const handleCompra = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
      setComprado(true);
    }
  };

  return (
    <div className="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md flex flex-col">
      {/* Enlace a la pantalla de detalles del producto */}
      <Link to={`/product/${id}`} className="h-60 w-full overflow-hidden flex justify-center">
        <img
          className="object-contain h-full w-full"
          src={imagen}
          alt={nombre}
        />
      </Link>
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
        -{porcentajeOferta}%
      </div>

      {/* Contenido que empuja el footer al fondo */}
      <div className="flex flex-col justify-between flex-grow mt-4 px-5 pb-5">
        <div>
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-slate-900">
              {nombre}
            </h5>
          </a>
        </div>

        {/* Mostrar cantidad disponible */}
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {cantidad > 0 ? (
            <span>{cantidad} unidades disponibles</span>
          ) : (
            <span>Agotado</span>
          )}
        </div>

        {/* Footer siempre abajo */}
        <div className="flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              ${precioFinal}
            </span>
            <span className="text-sm text-slate-900 line-through ml-2">
              ${precioReal}
            </span>
          </p>

          {/* Botón de compra */}
          <button
            onClick={handleCompra}
            disabled={cantidad <= 0}
            className={`flex items-center rounded-md  px-5 py-2.5 text-center text-sm font-medium
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
