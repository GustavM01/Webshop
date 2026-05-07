import React from "react";
import "./AdminLayout.css";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../ui/Button";

function AdminLayout() {
  const { user, logOut } = useAuth();
  return (
    <>
      <div className="admin-layout-container">
        <div>
          <h3>{user.displayName}</h3>
          <p>Admin Layout</p>
        </div>
        <div className="center-div">
          <Button
            style={{ backgroundColor: "tomato", marginBottom: 30 }}
            onClick={logOut}
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
