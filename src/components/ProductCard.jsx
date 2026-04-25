import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link className="product-link" to={`/product/${product.id}`}>
      <div className="product-card">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price} kr</p>
        <img className="product-img" alt={product.name} src={product.image} />
      </div>
    </Link>
  );
}

export default ProductCard;
