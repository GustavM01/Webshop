import { createContext, useContext, useEffect, useState } from "react";
import {
  subscribeToOrders,
  updateOrder as updateOrderService,
  deleteOrder as deleteOrderService,
} from "../services/orderService";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToOrders((data) => {
      setOrders(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateOrder = async (id, updates) => {
    await updateOrderService(id, updates);
  };

  const deleteOrder = async (id) => {
    await deleteOrderService(id);
  };

  return (
    <OrderContext.Provider
      value={{ orders, loading, updateOrder, deleteOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
