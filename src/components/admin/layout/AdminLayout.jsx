import React from "react";
import "./AdminLayout.css";
import { useAuth } from "../../../context/AuthContext";

function AdminLayout() {
  const { user, logOut } = useAuth();
  return (
    <>
      <div className="admin-layout-container">
        <h3>{user.displayName}</h3>
        <button onClick={logOut}>Logout</button>
        <p>Admin Layout</p>
      </div>
    </>
  );
}

export default AdminLayout;
