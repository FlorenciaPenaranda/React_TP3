import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { getProductsService } from '../../Services/ProductServices.js'; 


export const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);

  const fetchAllProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    setProductsError(null); 
    try {
      const data = await getProductsService();
      setProducts(data);
    } catch (err) {
      console.error("Error al obtener los productos:", err);
      setProductsError("No se pudieron cargar los productos. Intenta de nuevo más tarde.");
    } finally {
      setIsLoadingProducts(false);
    }
  }, []); 

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const contextValue = {
    products,
    isLoadingProducts,
    productsError,
    refreshProducts: fetchAllProducts,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};