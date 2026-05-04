import { ProductProvider } from "../context/ProductContext";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>{children}</CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
