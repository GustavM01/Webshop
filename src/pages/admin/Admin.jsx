import React, { useEffect, useState } from "react";
import { auth, provider } from "../../firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import OrderRow from "../../components/admin/OrderRow";
import "./Admin.css";
import AdminLayout from "../../components/admin/layout/AdminLayout";
import OrderInfo from "../../components/admin/OrderInfo";

function Admin() {
  const { logIn, logOut, user, loading: authLoading } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pages, setPages] = useState(Math.ceil(orders.length / 8));
  const navigate = useNavigate();

  if (authLoading) return <p>Loading...</p>;

  if (!user) return <button onClick={logIn}>Login</button>;
  console.log(orders);
  return (
    <div className="admin-page-container">
      <AdminLayout />
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
              <div style={{ flex: 1.2 }}>
                <p>Items</p>
              </div>
              <div style={{ flex: 0.8 }}>
                <p>Total</p>
              </div>
              <div style={{ flex: 0.2 }}></div>
            </div>
            {orders.slice(0, 8).map((order, index) => (
              <div key={index} className="order-row">
                <OrderRow
                  setData={setSelectedOrder}
                  data={selectedOrder}
                  key={order.id}
                  order={order}
                />
              </div>
            ))}
            <div className="admin-order-row-footer">
              <p style={{ marginLeft: 15 }}>
                Showing 1-8 out of {orders.length} orders
              </p>
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

export default Admin;
