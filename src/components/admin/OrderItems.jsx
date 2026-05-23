import React from "react";
import "./OrderItems.css";

function OrderItems({ items }) {
  return (
    <div className="order-item-container">
      {items.slice(0, 2).map((item) => (
        <div key={item.id} className="order-item-picture">
          <img src={item.image} alt={item.name} />
        </div>
      ))}

      <div className="order-item-number">
        <p>{items.length}</p>
      </div>
    </div>
  );
}

export default OrderItems;
