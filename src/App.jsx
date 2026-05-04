import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Cart from "./pages/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import Admin from "./pages/admin/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <BrowserRouter>
      <NavBar searchInput={searchInput} setSearchInput={setSearchInput} />

      <Routes>
        <Route path="/" element={<Home searchInput={searchInput} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
