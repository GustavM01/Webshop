import React from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import NumberInput from "../components/ui/NumberInput";

function Cart() {
  const { cart, clearCart, removeFromCart, addToCart } = useCart();
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    const res = await fetch(
      "http://127.0.0.1:5001/webshop-dev-43378/us-central1/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      },
    );

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }

    // console.log(data);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-list">
        {cart.map((product) => (
          <div className="checkout-item" key={product.id}>
            <Link
              style={{ flex: 1 }}
              className="checkout-img"
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
        <div className="checkout-summary">
          <p>
            Totalt <strong>{totalPrice}</strong> kr
          </p>
          <Button onClick={handleCheckout}>Go to checkout</Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
