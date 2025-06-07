import { getProductsService } from "./ProductServices.js"; // Asegúrate de la extensión .js

/**
 * Función que obtiene los productos y actualiza los estados de carga, error y productos.
 *
 * @param {Function} setLoading - Función setter de useState para el estado de carga.
 * @param {Function} setError - Función setter de useState para el estado de error.
 * @param {Function} setProducts - Función setter de useState para el estado de los productos.
 */
const getProducts = async (setLoading, setError, setProducts) => {
    setLoading(true);
    setError(null);

    try {
        const fetchedProducts = await getProductsService(); 
        
        if (fetchedProducts === null) {
            throw new Error("No se pudieron cargar los productos.");
        }

        setProducts(fetchedProducts);
        
    } catch (err) {
        console.error("Error en getProducts", err);
        setError(err);
    } finally {
        setLoading(false);
    }
};

export { getProducts };