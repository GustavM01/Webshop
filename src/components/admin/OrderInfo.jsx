import React, { useEffect, useState } from "react";
import "./OrderInfo.css";
import StatusBadge from "./StatusBadge";
import { Truck, User, Wallet, X } from "lucide-react";
import EditBtn from "../ui/EditBtn";
import { useOrders } from "../../context/OrderContext";

function OrderInfo({ order, setSelected }) {
  const { updateOrder } = useOrders();
  const [activeTab, setActiveTab] = useState("overview");
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    customer: {
      name: order.customer?.name || "",
      email: order.customer?.email || "",
      phone: order.customer?.phone || "",
    },

    shippingAddress: {
      line1: order.shippingAddress?.line1 || "",
      postalCode: order.shippingAddress?.postalCode || "",
      city: order.shippingAddress?.city || "",
      country: order.shippingAddress?.country || "",
    },
  });

  useEffect(() => {
    setEditValues({
      customer: {
        name: order.customer?.name || "",
        email: order.customer?.email || "",
        phone: order.customer?.phone || "",
      },

      shippingAddress: {
        line1: order.shippingAddress?.line1 || "",
        postalCode: order.shippingAddress?.postalCode || "",
        city: order.shippingAddress?.city || "",
        country: order.shippingAddress?.country || "",
      },
    });

    setEditing(false);
  }, [order]);

  console.log(editValues);

  const handleSave = () => {
    const cleanedUpdates = {
      customer: {
        name: editValues.customer.name || null,
        email: editValues.customer.email || null, // OSV fortsätt
        phone: editValues.customer.phone || null,
      },
    };
  };

  return (
    <div className="order-info-container">
      <div className="order-info-top">
        <div className="flex-start-end">
          <h3>Order details</h3>
          <X
            onClick={() => setSelected("")}
            className="order-info-close"
            style={{ marginRight: 10 }}
          />
        </div>
        <div style={{ gap: 16, marginBottom: "20px" }} className="flex-start">
          <StatusBadge style={{ width: "fit-content" }} status={order.status} />
          <p style={{ margin: 0 }} className="label">
            {order.createdAt.toDate().toLocaleDateString("sv-SE", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
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
              <EditBtn
                editing={editing}
                onClick={() => setEditing((prev) => !prev)}
              />
            </div>
            <div className="info-tab-row">
              {editing ? (
                <input
                  placeholder="Name"
                  value={editValues.customer.name}
                  onChange={(e) =>
                    setEditValues((prev) => ({
                      ...prev,
                      customer: {
                        ...prev.customer,
                        name: e.target.value,
                      },
                    }))
                  }
                />
              ) : (
                <p>{order.customer?.name || "No name"}</p>
              )}
            </div>
            {editing ? (
              <input
                placeholder="Phone number"
                value={editValues.customer.phone}
                onChange={(e) =>
                  setEditValues((prev) => ({
                    ...prev,
                    customer: {
                      ...prev.customer,
                      phone: e.target.value,
                    },
                  }))
                }
              />
            ) : (
              <>
                {order.customer?.phone && (
                  <div className="info-tab-row">
                    <p>{order.customer.phone}</p>
                  </div>
                )}
              </>
            )}

            <div className="info-tab-row">
              {editing ? (
                <input
                  placeholder="Email"
                  value={editValues.customer.email}
                  onChange={(e) =>
                    setEditValues((prev) => ({
                      ...prev,
                      customer: {
                        ...prev.customer,
                        email: e.target.value,
                      },
                    }))
                  }
                />
              ) : (
                <p>{order.customer?.email || "No email"}</p>
              )}
            </div>
          </div>

          <div className="order-info-section">
            <div className="info-tab-header">
              <div className="info-tab-row">
                <Truck />
                <p style={{ fontWeight: 600 }}>Shipping address</p>
              </div>
              {/* <EditBtn onClick={() => setEditing((prev) => (prev = !prev))} /> */}
            </div>
            {editing ? (
              <>
                <div className="info-tab-row">
                  <input
                    placeholder="Line 1"
                    value={editValues.shippingAddress.line1 || ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        shippingAddress: {
                          ...prev.shippingAddress,
                          line1: e.target.value,
                        },
                      }))
                    }
                  />
                </div>

                <div className="info-tab-row">
                  <input
                    placeholder="Postal code"
                    value={editValues.shippingAddress.postalCode || ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        shippingAddress: {
                          ...prev.shippingAddress,
                          postalCode: e.target.value,
                        },
                      }))
                    }
                  />

                  <input
                    placeholder="City"
                    value={editValues.shippingAddress.city || ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        shippingAddress: {
                          ...prev.shippingAddress,
                          city: e.target.value,
                        },
                      }))
                    }
                  />
                </div>

                <div className="info-tab-row">
                  <input
                    placeholder="Country"
                    value={editValues.shippingAddress.country || ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        shippingAddress: {
                          ...prev.shippingAddress,
                          country: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </>
            ) : order.shippingAddress ? (
              <>
                <div className="info-tab-row">
                  <p>{order.shippingAddress.line1}</p>
                </div>

                <div className="info-tab-row">
                  <p>
                    {order.shippingAddress.postalCode}{" "}
                    {order.shippingAddress.city}
                  </p>
                </div>

                <div className="info-tab-row">
                  <p>{order.shippingAddress.country}</p>
                </div>
              </>
            ) : (
              <div className="info-tab-row">
                <p className="label">No shipping address</p>
              </div>
            )}
          </div>

          <div
            className="order-info-section"
            style={{ border: "none", paddingBottom: 0 }}
          >
            <div className="info-tab-header">
              <div className="info-tab-row">
                <Wallet />
                <p style={{ fontWeight: 600 }}>Payment</p>
              </div>
              {/* <EditBtn onClick={() => setEditing((prev) => (prev = !prev))} /> */}
            </div>
            <div className="info-tab-row flex-start-end">
              <p>Payment status</p>

              <StatusBadge
                style={{ width: "fit-content", margin: 0 }}
                status={order.status}
              />
            </div>
            <div className="info-tab-row flex-start-end">
              <p className="label">Amount</p>
              <p className="label">
                {order.amount
                  ? (order.amount / 100).toLocaleString("sv-SE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) + " SEK"
                  : "No payment"}
              </p>
            </div>
            {order.currency && order.amount && (
              <div className="info-tab-row flex-start-end">
                <p className="label">Currency</p>
                <p style={{ textTransform: "uppercase" }} className="label">
                  {order?.currency}
                </p>
              </div>
            )}
          </div>
        </>
      )}
      {activeTab === "items" && (
        <>
          {order.items.map((item, index) => (
            <div className="info-tab-item" key={index}>
              <img src={item.image} />
              <div className="info-tab-box">
                <p style={{ fontWeight: 600 }}>{item.name}</p>
                <div className="info-tab-price">
                  <p style={{ color: "var(--text-secondary)" }}>
                    {item.price + " x " + item.quantity}
                  </p>
                  <p style={{ fontWeight: 500 }}>{item.total + " SEK"}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="info-tab-item-summary">
            <div className="flex-start-end">
              <p>Subtotal</p>
              <p>
                {order.totalAmount.toLocaleString("sv-SE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + " SEK"}
              </p>
            </div>
            {order.amount && (
              <div className="flex-start-end">
                <p>Shipping</p>
                <p>
                  {(order.amount / 100 - order.totalAmount).toLocaleString(
                    "sv-SE",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    },
                  ) + " SEK"}
                </p>
              </div>
            )}
            <div
              style={{ paddingTop: 8, marginTop: 10 }}
              className="flex-start-end total"
            >
              <p style={{ color: "black", fontWeight: 500 }}>Total</p>
              <p style={{ color: "black", fontWeight: 500 }}>
                {order.amount
                  ? (order.amount / 100).toLocaleString("sv-SE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) + " SEK"
                  : order.totalAmount.toLocaleString("sv-SE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) + " SEK"}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderInfo;
