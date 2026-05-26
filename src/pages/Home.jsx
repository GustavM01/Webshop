import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Home.css";
import { useProducts } from "../context/ProductContext";
import { AnimatePresence, easeIn, motion } from "motion/react";
import SkeletonProductCard from "../components/SkeletonProductCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      ease: "easeOut",
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function Home({ searchInput }) {
  const { products, loading } = useProducts();

  const getScore = (product, input) => {
    const words = input.toLowerCase().split(" ").filter(Boolean);
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

  const filteredProducts = searchInput.trim()
    ? products
        .map((product) => ({
          ...product,
          score: getScore(product, searchInput),
        }))
        .filter((product) => product.score > 0)
        .sort((a, b) => b.score - a.score)
    : products;

  // if (filteredProducts.length === 0)
  //   return (
  //     <p
  //       style={{
  //         margin: "0 auto",
  //         width: "50%",
  //         textAlign: "center",
  //         marginTop: "10vh",
  //       }}
  //     >
  //       No items matching your search...
  //     </p>
  //   );

  return (
    <>
      <div className="container">
        <motion.div
          key="initial-load"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="products"
        >
          {!loading
            ? filteredProducts.map((product) => (
                <motion.div
                  whileTap={{ y: -3, scale: 0.95 }}
                  key={product.id}
                  variants={childVariants}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            : Array.from({ length: 8 }).map((_, index) => (
                <SkeletonProductCard key={index} />
              ))}
        </motion.div>
      </div>
    </>
  );
}

export default Home;
