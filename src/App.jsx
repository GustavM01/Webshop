import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Cart from "./pages/Cart";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Product from "./pages/Product";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import Admin from "./pages/admin/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import Success from "./pages/Success";
import { OrderProvider } from "./context/OrderContext";

function App() {
  const [searchInput, setSearchInput] = useState("");

  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/admin");
  return (
    <>
      {!hideNavbar && (
        <NavBar searchInput={searchInput} setSearchInput={setSearchInput} />
      )}

      <Routes>
        <Route path="/" element={<Home searchInput={searchInput} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/admin"
          element={
            <OrderProvider>
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            </OrderProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
