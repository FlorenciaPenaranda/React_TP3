import React, { useState } from 'react'; 
import ProductCard from '../../Components/Product/ProductCard.jsx';
import NuevoProducto from '../../Components/NuevoProducto/NuevoProducto.jsx';
import { useProducts } from '../../Context/ProductsProvider/ProductsProvider.jsx'; 

/**
 * Componente que muestra una pantalla de productos.
 * Incluye un botón para abrir un panel lateral (drawer) para añadir nuevos productos.
 * Utiliza el contexto de productos para obtener la lista de productos y su estado de carga/error.
 *
 * @returns {React.ReactElement} El elemento JSX de la pantalla de productos.
 */
function ProductsScreen() {
    const { products, isLoadingProducts, productsError, refreshProducts } = useProducts(); 
    const [isNuevoProductoDrawerOpen, setIsNuevoProductoDrawerOpen] = useState(false);

    const handleOpenNuevoProductoDrawer = () => {
        setIsNuevoProductoDrawerOpen(true);
    };

    const handleCloseNuevoProductoDrawer = () => {
        setIsNuevoProductoDrawerOpen(false);
    };

    const handleProductAdded = () => {
        refreshProducts(); 
    };

    if (isLoadingProducts) { 
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Cargando productos...</p>
            </div>
        );
    }

    if (productsError) { 
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                <p>Error al cargar: {productsError}</p>
            </div>
        );
    }
    
    if (products.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-screen p-6">
                <p className="mb-4 text-gray-700">No hay productos disponibles en este momento.</p>
                <button
                    onClick={handleOpenNuevoProductoDrawer} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors cursor-pointer"
                >
                    + Añadir el primer producto
                </button>

                <NuevoProducto
                    isOpen={isNuevoProductoDrawerOpen}
                    onClose={handleCloseNuevoProductoDrawer}
                    onProductAdded={handleProductAdded} 
                    side="right" 
                />
            </div>
        );
    }

    return (
        <div className='flex flex-col p-6'>
            <strong
                className='flex justify-end w-auto cursor-pointer text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                onClick={handleOpenNuevoProductoDrawer}
            >
                + Agregar nuevo producto
            </strong>
            <div className="flex flex-wrap justify-start">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <NuevoProducto
                isOpen={isNuevoProductoDrawerOpen} 
                onClose={handleCloseNuevoProductoDrawer} 
                onProductAdded={handleProductAdded} 
                side="right"
            />
        </div>
    );
}

export default ProductsScreen;