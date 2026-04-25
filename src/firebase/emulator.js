import { db } from "./db";
import { connectFirestoreEmulator } from "firebase/firestore";

if (location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080);
}
