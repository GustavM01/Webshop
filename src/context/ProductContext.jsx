import { createContext, useContext, useEffect, useState } from "react";
import {
  addProductService,
  deleteProductService,
  getProducts,
  updateProductService,
} from "../services/productService";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async (product) => {
    setLoading(true);
    await addProductService(product);
    await loadProducts();
  };

  const updateProduct = async (id, updates) => {
    setLoading(true);
    await updateProductService(id, updates);
    await loadProducts();
  };

  const deleteProduct = async (id) => {
    await deleteProductService(id);
    await loadProducts();
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
