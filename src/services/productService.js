import { db } from "../firebase/db";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export async function getProducts() {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addProductService(product) {
  const ref = collection(db, "products");

  await addDoc(ref, product);
}

export async function updateProductService(id, updates) {
  const productRef = doc(db, "products", id);
  await updateDoc(productRef, updates);
}

export async function deleteProductService(id) {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
}
