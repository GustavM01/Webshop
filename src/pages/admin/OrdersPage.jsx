import React, { useEffect, useState } from "react";
import { auth, provider } from "../../firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import OrderRow from "../../components/admin/OrderRow";
import "./OrdersPage.css";
import OrderInfo from "../../components/admin/OrderInfo";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      ease: "easeOut",
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

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

  if (authLoading) return <p>Loading...</p>;

  if (!user) return <button onClick={logIn}>Login</button>;

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
              style={{ margin: "10px 13px" }}
              className="admin-order-row-top flex-start"
            >
              <div className="admin-search-bar">
                <label htmlFor="searchOrders">
                  <Search size={20} />
                </label>
                <input
                  placeholder="Search Orders..."
                  id="searchOrders"
                  type="text"
                />
              </div>
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
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {splitOrders[currentPage]?.map((order, index) => (
                <motion.div
                  variants={childVariants}
                  onClick={() =>
                    setSelectedOrder((prev) => (prev === order ? null : order))
                  }
                  key={index}
                  className="order-row"
                >
                  <OrderRow key={order.id} order={order} />
                </motion.div>
              ))}
            </motion.div>
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
          <AnimatePresence>
            {selectedOrder && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.2 }}
                className="order-side-info"
              >
                <OrderInfo
                  order={selectedOrder}
                  setSelected={setSelectedOrder}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
