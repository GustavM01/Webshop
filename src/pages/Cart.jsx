import React from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, clearCart, removeFromCart } = useCart();

  return (
    <div className="cart-container">
      <div className="cart-list">
        {cart.map((product) => (
          <div className="cart-item" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img
                className="cart-img"
                src={product.image}
                alt={product.name}
              />
            </Link>
            <p>{product.name}</p>
            <p>{product.quantity} st</p>
            <button
              className="cart-btn"
              onClick={() => removeFromCart(product.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
