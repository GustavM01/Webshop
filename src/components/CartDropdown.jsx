import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./CartDropdown.css";
import Button from "./ui/Button";
import { Trash2 } from "lucide-react";
import NumberInput from "./ui/NumberInput";

function CartDropdown() {
  const { cart, clearCart, removeFromCart, addToCart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="cart-container">
      <div className="cart-list">
        {cart.map((product) => (
          <div className="cart-item" key={product.id}>
            <Link className="cart-img" to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <p className="cart-item-name">{product.name}</p>
            <p>{product.price * product.quantity} kr</p>
            <NumberInput
              value={product.quantity}
              onIncrease={() => addToCart(product, product.quantity + 1)}
              onDecrease={() => addToCart(product, product.quantity - 1)}
            />
            <Button
              style={{ marginRight: 5 }}
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
        <Link to={"/cart"}>
          <Button style={{ width: "100%", borderRadius: 9 }}>
            Go to checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
export default CartDropdown;
