import React, { useState } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);

  const { cart, addToCart } = useCart();
  const cartProduct = cart.find((p) => p.id === product.id);
  const quantity = cartProduct?.quantity ?? 0;

  const handleAddToCart = () => {
    setLoading(true);
    addToCart(product, 1);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="product-card">
        <img
          className="product-card-img"
          alt={product.name}
          src={product.image}
        />
        <div className="product-card-text">
          <p className="product-card-name">{product.name}</p>
          <p className="product-card-price">{product.price} kr</p>
          <div className="add-to-cart-btn">
            <Button
              loading={loading}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              {quantity > 0 ? `${quantity} in cart` : "Add to cart"}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
