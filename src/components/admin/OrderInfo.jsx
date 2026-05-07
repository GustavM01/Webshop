import React, { useState } from "react";
import "./OrderInfo.css";
import StatusBadge from "./StatusBadge";
import { Truck, User } from "lucide-react";
import EditBtn from "../ui/EditBtn";

function OrderInfo({ order }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="order-info-container">
      <div className="order-info-top">
        <h3>Order</h3>
        <div style={{ gap: 16 }} className="flex-start">
          <StatusBadge style={{ width: "fit-content" }} status={order.status} />
          {order.createdAt.toDate().toLocaleDateString("sv-SE", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </div>
        <div>
          <div
            style={{ justifyContent: "space-evenly" }}
            className="tab-container"
          >
            <button
              onClick={() => setActiveTab("overview")}
              className={
                activeTab === "overview"
                  ? "info-tab-btn active"
                  : "info-tab-btn"
              }
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("items")}
              className={
                activeTab === "items" ? "info-tab-btn active" : "info-tab-btn"
              }
            >
              Items
            </button>
          </div>
        </div>
      </div>
      {activeTab === "overview" && (
        <>
          <div className="order-info-section">
            <div className="info-tab-header">
              <div className="info-tab-row">
                <User />
                <p style={{ fontWeight: 600 }}>Customer</p>
              </div>
              <EditBtn />
            </div>
            <div className="info-tab-row">
              <p>{order.customer?.name || "No name"}</p>
            </div>
            {order.customer?.phone && (
              <div className="info-tab-row">
                <p>{order.customer?.phone}</p>
              </div>
            )}
            <div className="info-tab-row">
              <p>{order.customer?.email || "No email"}</p>
            </div>
          </div>
          <div className="order-info-section">
            <div className="info-tab-header">
              <div className="info-tab-row">
                <Truck />
                <p style={{ fontWeight: 600 }}>Shipping</p>
              </div>
              <EditBtn />
            </div>
            <div className="info-tab-row">
              <p>{order.shippingAddress?.line1 || "No Shipping address"}</p>
            </div>
            <div className="info-tab-row">
              <p>{order.shippingAddress?.postalCode}</p>
              <p>{order.shippingAddress?.city}</p>
            </div>
          </div>
        </>
      )}
      {activeTab === "items" && (
        <>
          <p>items</p>
        </>
      )}
    </div>
  );
}

export default OrderInfo;
