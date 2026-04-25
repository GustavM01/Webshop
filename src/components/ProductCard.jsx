import React from "react";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">{product.price} kr</p>
      <img className="product-img" alt={product.name} src={product.image} />
    </div>
  );
}

export default ProductCard;
