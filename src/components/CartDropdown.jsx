import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./CartDropdown.css";

function CartDropdown() {
  const { cart, clearCart, removeFromCart } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-container">
      <div className="cart-list">
        {cart.map((product) => (
          <div className="cart-item" key={product.id}>
            <Link className="cart-img" to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <p>{product.name}</p>
            <p>{product.price} kr</p>
            <p>{product.quantity} st</p>
            <button
              className="cart-btn"
              onClick={() => removeFromCart(product.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Totalt: {totalPrice} kr</p>
        <p>Totalt: {totalItems}</p>
      </div>
    </div>
  );
}
export default CartDropdown;
