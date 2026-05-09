import React from "react";
import "./OrderRow.css";
import StatusBadge from "./StatusBadge";
import OrderItems from "./OrderItems";
import { ChevronRight } from "lucide-react";

function OrderRow({ order, setData, data }) {
  return (
    <div className="admin-order-row">
      <div style={{ flex: 0.1 }}>
        <input className="admin-order-checkbox" type="checkbox" />
      </div>
      <div style={{ flex: 1.2 }}>
        <p>{order.customer?.name || "Guest"}</p>
        <p className="label">{order.customer?.email || "\u2012"}</p>
      </div>
      <div style={{ flex: 0.75 }}>
        <p>
          {order.createdAt.toDate().toLocaleDateString("sv-SE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="label">
          {order.createdAt.toDate().toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <StatusBadge status={order.status} />
      <div style={{ flex: 1 }}>
        <OrderItems items={order.items} />
      </div>
      <div style={{ flex: 0.8 }}>
        <p>{(order.amount / 100 || order.totalAmount) + " SEK"}</p>
      </div>
      <div
        onClick={() => {
          data != order ? setData(order) : setData(null);
        }}
        style={{
          flex: 0.2,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          height: "100%",
        }}
      >
        <ChevronRight strokeWidth={1.5} />
      </div>
    </div>
  );
}

export default OrderRow;
