import React, { useEffect, useState } from "react";
import { auth, provider } from "../../firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import OrderRow from "../../components/admin/OrderRow";
import "./OrdersPage.css";
import OrderInfo from "../../components/admin/OrderInfo";
import { ChevronLeft, ChevronRight } from "lucide-react";

function OrdersPage() {
  const { logIn, logOut, user, loading: authLoading } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 8;
  const pages = Math.ceil(orders.length / ordersPerPage);

  const startOrder = currentPage * ordersPerPage + 1;

  const endOrder = Math.min((currentPage + 1) * ordersPerPage, orders.length);

  const navigate = useNavigate();

  const splitOrders = [];

  for (let i = 0; i < orders.length; i += 8) {
    splitOrders.push(orders.slice(i, i + 8));
  }

  console.log("Curernt ", currentPage);
  console.log("Split pages length ", splitOrders.length);

  if (authLoading) return <p>Loading...</p>;

  if (!user) return <button onClick={logIn}>Login</button>;
  console.log(orders);
  return (
    <div className="admin-page-container">
      <div className="admin-container">
        <div style={{ marginLeft: 40 }}>
          <h2 style={{ marginBlock: 10 }}>Orders</h2>
          <p style={{ margin: 0 }}>Manage and track all customer orders.</p>
        </div>
        <div className="admin-order-list-container">
          <div className="admin-order-list">
            <div
              style={{ margin: 10 }}
              className="admin-order-row-top flex-start"
            >
              <input placeholder="Search orders..." type="text" />
            </div>
            <div className="admin-order-row admin-order-row-header">
              <div style={{ flex: 0.1 }}>
                <input className="admin-order-checkbox" type="checkbox" />
              </div>
              <div style={{ flex: 1.2 }}>
                <p>Customer</p>
              </div>
              <div style={{ flex: 0.75 }}>
                <p>Date</p>
              </div>
              <div>
                <p>Status</p>
              </div>
              <div style={{ flex: 1 }}>
                <p>Items</p>
              </div>
              <div style={{ flex: 0.8 }}>
                <p>Total</p>
              </div>
              <div style={{ flex: 0.2 }}></div>
            </div>
            {splitOrders[currentPage]?.map((order, index) => (
              <div
                onClick={() =>
                  setSelectedOrder((prev) => (prev === order ? null : order))
                }
                key={index}
                className="order-row"
              >
                <OrderRow key={order.id} order={order} />
              </div>
            ))}
            <div className="admin-order-row-footer flex-start-end">
              <p>
                Showing {startOrder}-{endOrder} out of {orders.length} orders
              </p>
              <div className="flex-row page-selector">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => (prev != 0 ? prev - 1 : prev))
                  }
                >
                  <ChevronLeft strokeWidth={1.5} />
                </button>
                <p>{currentPage + 1}</p>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev < splitOrders.length - 1 ? prev + 1 : prev,
                    )
                  }
                >
                  <ChevronRight strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
          {selectedOrder && (
            <div className="order-side-info">
              <OrderInfo order={selectedOrder} setSelected={setSelectedOrder} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
