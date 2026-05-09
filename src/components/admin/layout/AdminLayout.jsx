import React from "react";
import "./AdminLayout.css";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../ui/Button";
import { ClipboardList, Package } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
  const { user, logOut } = useAuth();
  return (
    <>
      <div className="admin-page-container">
        <div className="admin-layout-container">
          <div>
            <h2 style={{ fontWeight: 600, color: "white", marginLeft: 15 }}>
              Webshop
            </h2>
            <div className="admin-layout-btn-container">
              <NavLink className={"flex-row"} to={"/admin/orders"}>
                <ClipboardList />
                <p>Orders</p>
              </NavLink>

              <NavLink to={"/admin/products"}>
                <Package />
                <p>Products</p>
              </NavLink>
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
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayout;
