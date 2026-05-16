import React from "react";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";

function Success() {
  const { clearCart } = useCart();
  return (
    <div className="center-col">
      <h2>Thank you for your order!</h2>

      <Button onClick={clearCart} to={"/"}>
        Back to home
      </Button>
    </div>
  );
}

export default Success;
