import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import "./Product.css";
import Button from "../components/ui/Button";
import { Loader2 } from "lucide-react";
import NumberInput from "../components/ui/NumberInput";

function Product() {
  const { id } = useParams();
  const { products } = useProducts();
  const { cart, addToCart, removeFromCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(1);

  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  const product = products.find((p) => p.id === id);

  const cartProduct = cart.find((p) => p.id === id);

  const isSame = cartProduct?.quantity === selected;

  useEffect(() => {
    if (cartProduct) {
      setSelected(cartProduct.quantity);
    } else {
      setSelected(1);
    }
  }, [cartProduct]);

  if (!product) return <p className="product-page-loading">Loading...</p>;

  const handleAddToCart = () => {
    if (isSame) return;

    setLoading(true);
    addToCart(product, selected);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

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

            <NumberInput
              value={selected}
              onIncrease={() => setSelected((prev) => prev + 1)}
              onDecrease={() => setSelected((prev) => Math.max(1, prev - 1))}
            />
            <div className="product-page-btn-container">
              <Button
                variant={isSame ? "disabled" : "primary"}
                loading={loading}
                onClick={handleAddToCart}
              >
                {cartProduct ? "Update cart" : "Add to cart"}
              </Button>
              {cartProduct && (
                <Button
                  onClick={() => {
                    removeFromCart(product.id);
                    setSelected(1);
                  }}
                  variant="remove"
                ></Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
