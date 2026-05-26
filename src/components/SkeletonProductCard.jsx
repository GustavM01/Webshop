import React from "react";
import "./SkeletonProductCard.css";

function SkeletonProductCard() {
  return (
    <>
      <div className="product-card">
        <div className="skeleton-card-img skeleton" />
        <div className="skeleton-card-text">
          <div className="skeleton-card-name skeleton" />
          <div className="skeleton-card-price skeleton" />
        </div>
      </div>
    </>
  );
}

export default SkeletonProductCard;
