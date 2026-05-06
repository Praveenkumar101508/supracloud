import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-03-25.dahlia",
  });

  const PRICE_IDS: Record<string, string> = {
    foundation: process.env.STRIPE_PRICE_FOUNDATION || "price_PLACEHOLDER_FOUNDATION",
    application_engine: process.env.STRIPE_PRICE_APPLICATION_ENGINE || "price_PLACEHOLDER_ENGINE",
    full_accelerator: process.env.STRIPE_PRICE_FULL_ACCELERATOR || "price_PLACEHOLDER_ACCELERATOR",
  };
  try {
    const { tier } = await req.json();

    const priceId = PRICE_IDS[tier];
    if (!priceId) {
      return NextResponse.json({ error: "Invalid tier selected." }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/apply?payment=success`,
      cancel_url: `${baseUrl}/programs?payment=cancelled`,
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      metadata: { tier },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[Stripe Checkout Error]", err);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
