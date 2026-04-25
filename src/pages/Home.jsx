import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Home.css";
import { useProducts } from "../context/ProductContext";

function Home() {
  const { products, loading } = useProducts();

  return (
    <>
      <div className="container">
        <div className="products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
