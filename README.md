# Productivity Boost AI

## Environment Variables

Copy `.env.example` to `.env` and fill in:

- `OPENAI_API_KEY` for `/api/ai-assistant`
- `APP_URL` base URL used in Stripe success/cancel redirects
- `STRIPE_SECRET_KEY` for server-side checkout session creation
- `STRIPE_WEBHOOK_SECRET` for `/api/stripe-webhook` signature verification
- `VITE_STRIPE_PUBLISHABLE_KEY` for client-side Stripe usage if needed

## Stripe Endpoints

- `POST /api/create-checkout-session` creates a Stripe Checkout session for the Pro monthly plan
- `POST /api/stripe-webhook` verifies Stripe webhook signatures and handles subscription lifecycle events
