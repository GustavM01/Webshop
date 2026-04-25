import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
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
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
