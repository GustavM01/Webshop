import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import "./Product.css";

function Product() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <div className="product-container">
        <img className="product-page-img" src={product.image} />
        <div className="product-page-text-container">
          <div className="product-page-text">
            <h2 className="product-page-name">{product.name}</h2>
            <p className="product-page-price">{product.price} kr</p>
          </div>
          <p className="product-page-description">{product.description}</p>
          <button
            className="product-page-btn"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}

export default Product;
