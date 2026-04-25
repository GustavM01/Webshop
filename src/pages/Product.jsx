import React from "react";
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();
  return (
    <div>
      <p>Product page</p>
    </div>
  );
}

export default Product;
