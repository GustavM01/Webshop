import React from "react";
import "./NavBar.css";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function NavBar() {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          Webshop
        </Link>
        <div className="navbar-right">
          <input placeholder="Search" className="search-bar" type="text" />
          <Link to="/cart" className="cart">
            {totalItems != 0 && <div className="cart-items">{totalItems}</div>}
            <ShoppingCart color="var(--text-secondary)" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
