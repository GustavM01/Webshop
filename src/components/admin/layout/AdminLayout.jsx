import React from "react";
import "./AdminLayout.css";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../ui/Button";
import { ChevronRight, ClipboardList, Package, Sidebar } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import SidebarProfileMenu from "./SidebarProfileMenu";

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
          <SidebarProfileMenu user={user} logOut={logOut} />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayout;
