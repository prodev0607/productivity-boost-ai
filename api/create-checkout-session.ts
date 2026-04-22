import type { IncomingMessage, ServerResponse } from "node:http";
import { getPublicAppUrl, getStripeClient } from "../server/stripe.js";

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    const body = (await readJsonBody(req)) as { affiliateRef?: string };
    const stripe = getStripeClient();
    const requestOrigin = req.headers.origin;
    const appUrl = getPublicAppUrl(requestOrigin);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      success_url: `${appUrl}/onboarding?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/?checkout=cancelled`,
      allow_promotion_codes: true,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            recurring: { interval: "month" },
            unit_amount: 900,
            product_data: {
              name: "Productivity Boost AI Pro",
              description: "AI-powered productivity planning assistant",
            },
          },
        },
      ],
      metadata: {
        affiliate_ref: body.affiliateRef?.slice(0, 100) || "",
      },
    });

    if (!session.url) {
      throw new Error("Unable to create Stripe checkout session URL.");
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ url: session.url, sessionId: session.id }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to create checkout session",
      }),
    );
  }
}
