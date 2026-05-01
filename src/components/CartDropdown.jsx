import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./CartDropdown.css";
import Button from "./ui/Button";
import { Trash2 } from "lucide-react";

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
            <p className="cart-item-name">{product.name}</p>
            <p>{product.price} kr</p>
            <p>{product.quantity}</p>
            <Button
              style={{ marginRight: 10 }}
              onClick={() => removeFromCart(product.id)}
              variant="remove"
            />
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-summary-container">
          <p>Total</p>
          <p style={{ fontWeight: 700 }}>{totalPrice} kr</p>
        </div>
        <div className="cart-summary-container">
          <p>Total items</p>
          <p style={{ fontWeight: 700 }}>{totalItems}</p>
        </div>
        <Button>Go to checkout</Button>
      </div>
    </div>
  );
}
export default CartDropdown;
