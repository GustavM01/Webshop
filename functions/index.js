import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import { defineSecret } from "firebase-functions/params";
import admin from "firebase-admin";
// import logger from "firebase-functions/logger";

admin.initializeApp();
const db = admin.firestore();

const STRIPE_SECRET = defineSecret("STRIPE_SECRET");

import Stripe from "stripe";

export const checkout = onRequest(
  { secrets: [STRIPE_SECRET] },
  async (req, res) => {
    const stripe = new Stripe(STRIPE_SECRET.value());
    const cart = req.body.cartInfo;

    if (!Array.isArray(cart)) {
      return res.status(400).json({ error: "Invalid cart format" });
    }

    if (cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const line_items = await Promise.all(
      cart.map(async (item) => {
        const doc = await db.collection("products").doc(item.id).get();

        if (!doc.exists) {
          throw new Error("Product not found");
        }

        if (item.quantity <= 0 || item.quantity > 10) {
          throw new Error("Invalid quantity");
        }

        const product = doc.data();

        if (!product.price) {
          throw new Error("Invalid product data");
        }

        return {
          price_data: {
            currency: "sek",
            product_data: {
              name: product.name,
              images: [product.image],
            },
            unit_amount: product.price * 100,
          },
          quantity: item.quantity,
        };
      }),
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "klarna"],
      mode: "payment",
      line_items,
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cart",
    });

    res.json({ url: session.url });
  },
);

setGlobalOptions({ maxInstances: 10 });
