import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rateLimiter";

const ALLOWED_TIERS = ["foundation", "application_engine", "full_accelerator"] as const;

const CheckoutSchema = z.object({
  tier: z.enum(ALLOWED_TIERS).refine(
    (v) => ALLOWED_TIERS.includes(v as typeof ALLOWED_TIERS[number]),
    { message: "Invalid tier. Must be one of: foundation, application_engine, full_accelerator." }
  ),
});

const PRICE_IDS: Record<typeof ALLOWED_TIERS[number], string> = {
  foundation:          process.env.STRIPE_PRICE_FOUNDATION          || "price_PLACEHOLDER_FOUNDATION",
  application_engine:  process.env.STRIPE_PRICE_APPLICATION_ENGINE  || "price_PLACEHOLDER_ENGINE",
  full_accelerator:    process.env.STRIPE_PRICE_FULL_ACCELERATOR     || "price_PLACEHOLDER_ACCELERATOR",
};

export async function POST(req: NextRequest) {
  const rl = await rateLimit(req);
  if (!rl.success) return rl.response!;

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Checkout is not configured." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = CheckoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid request." },
      { status: 400 }
    );
  }

  const { tier } = parsed.data;
  const priceId  = PRICE_IDS[tier];

  // Guard against placeholder IDs in production
  if (priceId.includes("PLACEHOLDER")) {
    return NextResponse.json(
      { error: "This tier is not yet available for purchase." },
      { status: 400 }
    );
  }

  const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-03-25.dahlia",
  });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode:                       "payment",
      line_items:                 [{ price: priceId, quantity: 1 }],
      success_url:                `${baseUrl}/apply?payment=success`,
      cancel_url:                 `${baseUrl}/talent/programs?payment=cancelled`,
      billing_address_collection: "auto",
      allow_promotion_codes:      true,
      metadata:                   { tier },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("[Stripe] Checkout session error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session. Please try again." },
      { status: 500 }
    );
  }
}
