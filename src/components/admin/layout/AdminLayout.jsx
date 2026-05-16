import React from "react";
import "./AdminLayout.css";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../ui/Button";
import { ChevronRight, ClipboardList, Package } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
  const { user, logOut, logIn } = useAuth();

  if (!user) return <button onClick={logIn}>Login</button>;
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
          <div className="side-nav-footer">
            <div className="flex-row">
              <span className="navbar-profile">A</span>
              <div>
                <p style={{ fontWeight: 600 }}>{user.displayName}</p>
                <p style={{ color: "#c0c3cb", fontSize: "12px" }}>Admin</p>
              </div>
            </div>
            <ChevronRight
              style={{ marginRight: 8 }}
              color="#c0c3cb"
              size={18}
            />
            {/* <h3>{user.displayName}</h3>
            <Button
              style={{ backgroundColor: "tomato", marginBottom: 30 }}
              onClick={logOut}
            >
              Logout
            </Button> */}
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayout;
