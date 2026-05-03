import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Home.css";
import { useProducts } from "../context/ProductContext";

function Home({ searchInput }) {
  const { products, loading } = useProducts();

  const getScore = (product, input) => {
    const words = input.toLowerCase().split(" ");
    const name = product.name.toLowerCase();
    const description = product.description.toLowerCase();

    let score = 0;

    words.forEach((word) => {
      if (name === word) score += 10;
      else if (name.startsWith(word)) score += 8;
      else if (name.includes(word)) score += 6;
      else if (description.includes(word)) score += 4;
    });

    return score;
  };

  const filteredProducts = products
    .map((product) => ({
      ...product,
      score: getScore(product, searchInput),
    }))
    .filter((product) => product.score > 0)
    .sort((a, b) => b.score - a.score);

  // const filteredProducts = products.filter((item) =>
  //   (item.name + item.description)
  //     .toLowerCase()
  //     .includes(searchInput.toLowerCase()),
  // );

  if (filteredProducts.length === 0)
    return (
      <p
        style={{
          margin: "0 auto",
          width: "50%",
          textAlign: "center",
          marginTop: "10vh",
        }}
      >
        No items matching your search...
      </p>
    );
  return (
    <>
      <div className="container">
        <div className="products">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
