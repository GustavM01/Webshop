import React from "react";
import "./NavBar.css";
import { ShoppingCart } from "lucide-react";

function NavBar() {
  return (
    <div className="navbar">
      <div className="nav-container">
        <div className="logo">WebShop</div>
        <div className="cart">
          <div className="cart-items">1</div>
          <ShoppingCart color="gray" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
