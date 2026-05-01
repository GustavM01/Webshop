import React, { useRef, useState } from "react";
import "./NavBar.css";
import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartDropdown from "./CartDropdown";
import { useEffect } from "react";

function NavBar() {
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setIsCartOpen(false);
  }, [location]);

  useEffect(() => {
    if (!isCartOpen) return;
    function handleClickOutside(event) {
      if (
        isCartOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsCartOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isCartOpen]);

  return (
    <div className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          Webshop
        </Link>
        <div className="navbar-right">
          <input placeholder="Search" className="search-bar" type="text" />
          <button
            ref={buttonRef}
            onClick={() => setIsCartOpen((prev) => !prev)}
            className="cart"
          >
            {totalItems != 0 && <div className="cart-items">{totalItems}</div>}
            <ShoppingCart color="var(--text-secondary)" strokeWidth={2} />
          </button>
        </div>
      </div>
      {isCartOpen && (
        <div ref={dropdownRef} className="cart-dropdown">
          <CartDropdown />
        </div>
      )}
    </div>
  );
}

export default NavBar;
