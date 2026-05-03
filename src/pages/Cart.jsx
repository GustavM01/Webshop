import React from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import NumberInput from "../components/ui/NumberInput";

function Cart() {
  const { cart, clearCart, removeFromCart } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <div style={{ marginInline: 150 }} className="cart-container">
      <div className="cart-list">
        {cart.map((product) => (
          <div className="cart-item" key={product.id}>
            <Link
              style={{ flex: 1 }}
              className="cart-img"
              to={`/product/${product.id}`}
            >
              <img src={product.image} alt={product.name} />
            </Link>
            <p style={{ flex: 1 }}>{product.name}</p>
            <p style={{ flex: 1 }}>{product.price} kr</p>
            <NumberInput
              value={product.quantity}
              onIncrease={() => addToCart(product, product.quantity + 1)}
              onDecrease={() => addToCart(product, product.quantity - 1)}
            />
            <Button
              style={{ marginRight: 10, marginLeft: 15 }}
              onClick={() => removeFromCart(product.id)}
              variant="remove"
            />
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Totalt: {totalPrice} kr</p>
      </div>
    </div>
  );
}

export default Cart;
