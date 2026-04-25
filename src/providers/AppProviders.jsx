import { ProductProvider } from "../context/ProductContext";
import { CartProvider } from "../context/CartContext";

export default function AppProviders({ children }) {
  return (
    <ProductProvider>
      <CartProvider>{children}</CartProvider>
    </ProductProvider>
  );
}
