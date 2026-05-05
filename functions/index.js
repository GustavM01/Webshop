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

    if (cart.length > 10) {
      return res.status(400).json({ error: "Too many items" });
    }

    const items = await Promise.all(
      cart.map(async (item) => {
        const doc = await db.collection("products").doc(item.id).get();

        if (!doc.exists) {
          throw new Error("Product not found");
        }

        const product = doc.data();

        if (!product.price) {
          throw new Error("Invalid product data");
        }

        if (item.quantity <= 0 || item.quantity > 10) {
          throw new Error("Invalid quantity");
        }

        return {
          id: item.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: item.quantity,
          total: product.price * item.quantity,
        };
      }),
    );

    const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

    const line_items = items.map((item) => ({
      price_data: {
        currency: "sek",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const orderRef = db.collection("orders").doc();
    const orderId = orderRef.id;

    const session = await stripe.checkout.sessions.create(
      {
        payment_method_types: ["card", "klarna"],
        mode: "payment",
        line_items,
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cart",
        shipping_address_collection: {
          allowed_countries: ["SE"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 4900,
                currency: "sek",
              },
              display_name: "Standard shipping",
            },
          },
        ],
        metadata: {
          orderId: orderId,
        },
      },
      {
        idempotencyKey: orderId,
      },
    );

    await orderRef.set({
      items,
      totalAmount,
      status: "pending",
      stripeSessionId: session.id,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt: Date.now() + 1000 * 60 * 30,
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

    const session = event.data.object;

    const orderId = session.metadata?.orderId;

    if (!orderId) {
      console.error("Missing orderId in session metadata");
      return res.sendStatus(200);
    }

    const orderRef = db.collection("orders").doc(orderId);

    const orderSnap = await orderRef.get();

    if (!orderSnap.exists) {
      console.error("Order not found in Firestore");
      return res.sendStatus(200);
    }

    const orderData = orderSnap.data();

    if (session.amount_total !== orderData.totalAmount * 100) {
      console.error("Amount mismatch!");
      return res.sendStatus(400);
    }

    if (orderData.status === "paid") {
      console.log("Order already processed");
      return res.sendStatus(200);
    }

    await orderRef.update({
      status: "paid",
      stripeSessionId: session.id,
      amount: session.amount_total,
      currency: session.currency,
      email: session.customer_details?.email || null,
      shippingAddress: session.shipping_details,
    });

    console.log("Order saved!");

    res.sendStatus(200);
  },
);

setGlobalOptions({ maxInstances: 10 });
