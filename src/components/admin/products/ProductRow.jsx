import React from "react";
import "./ProductRow.css";
import ProductItem from "./ProductItem";
import ProductActions from "./ui/ProductActions";

function ProductRow({ editClick, deleteClick, product }) {
  return (
    <div className="admin-order-row">
      <div style={{ flex: 0.1 }}>
        <input className="admin-order-checkbox" type="checkbox" />
      </div>
      <div style={{ flex: 1.3, minWidth: 240 }}>
        <ProductItem product={product} />
      </div>
      <div style={{ flex: 0.8 }}>
        <p>{product.price} SEK</p>
        <p className="label"></p>
      </div>
      <div style={{ flex: 1 }}>
        <p>{product?.stock ? product.stock : "Out of stock"}</p>
      </div>
      <div style={{ flex: 0.8 }}>
        <p className={true ? "status-active" : "status-inactive"}>Active</p>
      </div>
      <div style={{ flex: 0.3, minWidth: 80 }}>
        <ProductActions onEditClick={editClick} onDeleteClick={deleteClick} />
      </div>
    </div>
  );
}

export default ProductRow;
