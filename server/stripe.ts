import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripeClient() {
  if (stripeClient) return stripeClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is missing on the server.");
  }

  stripeClient = new Stripe(secretKey, {
    apiVersion: "2026-03-25.dahlia",
  });

  return stripeClient;
}

export function getPublicAppUrl(reqOrigin?: string) {
  return (
    process.env.APP_URL ||
    reqOrigin ||
    "http://localhost:5173"
  );
}
