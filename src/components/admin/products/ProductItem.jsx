import React from "react";
import "./ProductItem.css";

function ProductItem({ product }) {
  return (
    <div className="product-item">
      <img
        className="product-item-img"
        src={product.image}
        alt={product.name}
      />
      <div className="product-item-text-section">
        <p className="header">{product.name}</p>
        <p className="label" style={{ fontSize: 13 }}>
          ID: {product.id}
        </p>
      </div>
    </div>
  );
}

export default ProductItem;
