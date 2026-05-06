import React, { useEffect, useState } from "react";
import { auth, provider } from "../../firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";

function Admin() {
  const { logIn, logOut, user, loading: authLoading } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();
  const navigate = useNavigate();

  if (authLoading) return <p>Loading...</p>;

  if (!user) return <button onClick={logIn}>Login</button>;
  console.log(orders);
  return (
    <div>
      <div>
        <h1>{user.displayName}</h1>
        <button onClick={logOut}>Logout</button>
        <p>Admin sidan</p>
      </div>
      <div>
        {orders.map((order) => (
          <div key={order.id}>{order.status}</div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
