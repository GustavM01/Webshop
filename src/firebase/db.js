import { getFirestore } from "firebase/firestore";
import { app } from "./nodeConfig.js";

export const db = getFirestore(app);
