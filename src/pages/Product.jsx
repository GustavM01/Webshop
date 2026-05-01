import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import "./Product.css";
import Button from "../components/ui/Button";

function Product() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  if (!product) return <p className="product-page-loading">Loading...</p>;

  return (
    <>
      <div className="product-page-wrapper">
        <div className="product-container">
          <div className="product-page-img-wrapper">
            <img className="product-page-img" src={product.image} />
          </div>
          <div className="product-page-text-container">
            <div className="product-page-text">
              <h2 className="product-page-name">{product.name}</h2>
              <p className="product-page-price">{product.price} kr</p>
            </div>
            <p className="product-page-description">{product.description}</p>
            <Button
              onClick={() => addToCart(product)}
              style={{ marginTop: 25 }}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
