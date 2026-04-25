import React from "react";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, clearCart, removeFromCart } = useCart();

  return (
    <div>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => removeFromCart(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
