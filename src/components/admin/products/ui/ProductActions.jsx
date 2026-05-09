import { Edit3, Trash2 } from "lucide-react";
import React from "react";
import "./ProductActions.css";

function ProductActions({ onEditClick, onDeleteClick }) {
  return (
    <div className="flex-row" style={{ gap: 5 }}>
      <div onClick={onEditClick} className="product-action-box">
        <Edit3 size={18} strokeWidth={2.2} />
      </div>
      <div onClick={onDeleteClick} className="product-action-box">
        <Trash2 size={18} strokeWidth={2.2} color="tomato" />
      </div>
    </div>
  );
}

export default ProductActions;
