import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import { defineSecret } from "firebase-functions/params";
import admin from "firebase-admin";
// import logger from "firebase-functions/logger";

admin.initializeApp();
const db = admin.firestore();

const STRIPE_SECRET = defineSecret("STRIPE_SECRET");
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");

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

export const stripeWebhook = onRequest(
  { secrets: [STRIPE_SECRET, STRIPE_WEBHOOK_SECRET] },
  async (req, res) => {
    const stripe = new Stripe(STRIPE_SECRET.value());

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        req.headers["stripe-signature"],
        STRIPE_WEBHOOK_SECRET.value(),
      );
    } catch (err) {
      console.error("Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type !== "checkout.session.completed") {
      return res.sendStatus(200);
    }

    console.log("Verified event:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const cart = JSON.parse(session.metadata.cart);

      await db
        .collection("orders")
        .doc(session.id)
        .set({
          sessionId: session.id,
          items: cart,
          amount: session.amount_total,
          currency: session.currency,
          email: session.customer_details?.email || null,
          status: "paid",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

      console.log("Order saved!");
    }

    res.sendStatus(200);
  },
);

setGlobalOptions({ maxInstances: 10 });
