import React from "react";
import "./AdminLayout.css";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../ui/Button";
import { ClipboardList, Package } from "lucide-react";

function AdminLayout() {
  const { user, logOut } = useAuth();
  return (
    <>
      <div className="admin-layout-container">
        <div>
          <h2 style={{ fontWeight: 600, color: "white", marginLeft: 15 }}>
            Webshop
          </h2>
          <div className="admin-layout-btn-container">
            <div>
              <ClipboardList />
              <button>Orders</button>
            </div>
            <div>
              <Package />
              <button>Products</button>
            </div>
          </div>
        </div>
        <div className="center-div">
          <h3>{user.displayName}</h3>
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
