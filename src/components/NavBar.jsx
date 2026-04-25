import React from "react";
import "./NavBar.css";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          Webshop
        </Link>
        <div className="cart">
          <div className="cart-items">1</div>
          <ShoppingCart color="gray" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
