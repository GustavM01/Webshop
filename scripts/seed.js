import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  addDoc,
} from "firebase/firestore";
import { products, orders } from "../src/data/seedProducts.js";

const app = initializeApp({
  apiKey: "fake-key",
  projectId: "webshop-dev-43378",
});

const db = getFirestore(app);

connectFirestoreEmulator(db, "127.0.0.1", 8080);

async function seed() {
  const ref = collection(db, "products");

  for (const product of products) {
    await addDoc(ref, product);
  }

  const orderRef = collection(db, "orders");

  for (const order of orders) {
    await addDoc(orderRef, order);
  }

  console.log("Seed klart!");
}

seed();
