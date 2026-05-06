import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/db";

export function subscribeToOrders(callback) {
  return onSnapshot(collection(db, "orders"), (snapshot) => {
    const orders = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);

    callback(orders);
  });
}

export async function updateOrder(id, updates) {
  const orderRef = doc(db, "orders", id);
  await updateDoc(orderRef, updates);
}
