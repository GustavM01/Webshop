import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import "./Product.css";
import Button from "../components/ui/Button";
import { Loader2 } from "lucide-react";

function Product() {
  const { id } = useParams();
  const { products } = useProducts();
  const { cart, addToCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(1);

  const numbers = [...Array(11).keys()];

  const product = products.find((p) => p.id === id);

  const cartProduct = cart.find((p) => p.id === id);

  const isSame = cartProduct?.quantity === selected;

  useEffect(() => {
    if (cartProduct) {
      setSelected(cartProduct.quantity);
    }
  }, [cartProduct]);

  useEffect(() => {
    if (!cartProduct && selected === 0) {
      setSelected(1);
      return;
    }
  }, [selected]);

  if (!product) return <p className="product-page-loading">Loading...</p>;

  const handleAddToCart = () => {
    if (isSame) return;
    // if (!cartProduct && selected === 0) {
    //   setSelected(1);
    //   return;
    // }

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

            <select
              value={selected}
              onChange={(e) => setSelected(+e.target.value)}
              style={{ width: "fit-content" }}
            >
              {numbers.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            {/* <p>{selected === cartProduct?.quantity && `${selected} in cart`}</p> */}
            <Button
              variant={isSame ? "disabled" : "primary"}
              loading={loading}
              onClick={handleAddToCart}
              style={{ marginTop: 25 }}
            >
              {cartProduct ? "Update cart" : "Add to cart"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
