import { db } from "../firebase/db";
import { collection, getDocs } from "firebase/firestore";

export async function getProducts() {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
