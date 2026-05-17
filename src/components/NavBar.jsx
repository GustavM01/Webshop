import React, { useRef, useState } from "react";
import "./NavBar.css";
import { ShoppingCart } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartDropdown from "./CartDropdown";
import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

function NavBar({ setSearchInput, searchInput }) {
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const [shouldScale, setShouldScale] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setIsCartOpen(false);
  }, [location]);

  useEffect(() => {
    setShouldScale(true);

    const timeout = setTimeout(() => {
      setShouldScale(false);
    }, 120);

    return () => clearTimeout(timeout);
  }, [totalItems]);

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

  const handleNavigate = () => {
    if (location.pathname != "/") {
      navigate("/");
    }
  };

  const backToHome = () => {
    setSearchInput("");
  };

  return (
    <div className="navbar">
      <div className="nav-container">
        <Link onClick={backToHome} to="/" className="logo">
          Webshop
        </Link>
        <div className="navbar-right">
          <input
            placeholder="Search"
            className="search-bar"
            type="text"
            onKeyDown={handleNavigate}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            ref={buttonRef}
            onClick={() => setIsCartOpen((prev) => !prev)}
            className="cart"
          >
            {totalItems != 0 && (
              <div
                className={
                  shouldScale ? "cart-items cart-items-scaled" : "cart-items"
                }
              >
                {totalItems}
              </div>
            )}
            <ShoppingCart color="var(--text-secondary)" strokeWidth={2} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            ref={dropdownRef}
            className="cart-dropdown"
          >
            <CartDropdown />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavBar;
