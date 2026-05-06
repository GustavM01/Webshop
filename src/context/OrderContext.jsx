import { createContext, useContext, useEffect, useState } from "react";
import {
  subscribeToOrders,
  updateOrder as updateOrderService,
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

  return (
    <OrderContext.Provider value={{ orders, loading, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
