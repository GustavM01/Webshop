import React from "react";
import "./OrderItem.css";
import StatusBadge from "./StatusBadge";

function OrderItem({ order, number }) {
  return (
    <div className="admin-order-item-container">
      <p style={{ flex: 0, width: "fit-content", marginInline: "10px" }}>
        {number}
      </p>
      <StatusBadge status={order.status} />
      <p>{order.id}</p>
      <p>{order.customer?.name || "Guest"}</p>
      <p>{order.customer?.email || "null"}</p>
    </div>
  );
}

export default OrderItem;
