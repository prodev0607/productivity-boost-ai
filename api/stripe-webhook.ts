import type { IncomingMessage, ServerResponse } from "node:http";
import { getStripeClient } from "../server/stripe.js";

async function readRawBody(req: IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "STRIPE_WEBHOOK_SECRET is missing on the server." }));
    return;
  }

  try {
    const stripe = getStripeClient();
    const rawBody = await readRawBody(req);
    const signature = req.headers["stripe-signature"];
    if (!signature || Array.isArray(signature)) {
      throw new Error("Missing Stripe signature header.");
    }

    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    switch (event.type) {
      case "checkout.session.completed":
      case "invoice.paid":
      case "invoice.payment_failed":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        console.log("Stripe webhook received:", event.type, event.id);
        break;
      default:
        console.log("Unhandled Stripe webhook event:", event.type);
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ received: true }));
  } catch (error) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Webhook signature verification failed",
      }),
    );
  }
}
