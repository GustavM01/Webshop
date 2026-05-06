import React, { useEffect, useState } from "react";
import { auth, provider } from "../../firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import OrderItem from "../../components/admin/OrderItem";
import "./Admin.css";

function Admin() {
  const { logIn, logOut, user, loading: authLoading } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();
  const navigate = useNavigate();

  if (authLoading) return <p>Loading...</p>;

  if (!user) return <button onClick={logIn}>Login</button>;
  console.log(orders);
  return (
    <div className="admin-container">
      <div className="admin-navbar">
        <h1>{user.displayName}</h1>
        <button onClick={logOut}>Logout</button>
      </div>
      <div className="admin-order-list">
        <div className="admin-order-item-container admin-order-list-header">
          <p style={{ width: "fit-content", flex: 0, marginInline: "10px" }}>
            #
          </p>
          <p>Status</p>
          <p>ID</p>
          <p>Name</p>
          <p>Email</p>
        </div>
        {orders.map((order, index) => (
          <OrderItem key={order.id} number={index} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Admin;
