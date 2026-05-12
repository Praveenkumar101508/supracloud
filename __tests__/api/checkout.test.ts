/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

// Stripe mock must be set up before the route imports it
const mockSessionCreate = jest.fn();
jest.mock("stripe", () => {
  return jest.fn().mockImplementation(() => ({
    checkout: {
      sessions: {
        create: mockSessionCreate,
      },
    },
  }));
});

process.env.STRIPE_SECRET_KEY = "sk_test_placeholder";

import { POST } from "@/app/api/checkout/route";

const makeRequest = (body: object) =>
  new NextRequest("http://localhost:3000/api/checkout", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

describe("POST /api/checkout", () => {
  beforeEach(() => {
    mockSessionCreate.mockReset();
    mockSessionCreate.mockResolvedValue({ url: "https://checkout.stripe.com/cs_test_abc123" });
  });

  it("returns checkout URL for valid tier 'foundation'", async () => {
    const res = await POST(makeRequest({ tier: "foundation" }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.url).toBe("https://checkout.stripe.com/cs_test_abc123");
  });

  it("returns checkout URL for tier 'application_engine'", async () => {
    const res = await POST(makeRequest({ tier: "application_engine" }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.url).toBeDefined();
  });

  it("returns checkout URL for tier 'full_accelerator'", async () => {
    const res = await POST(makeRequest({ tier: "full_accelerator" }));
    expect(res.status).toBe(200);
  });

  it("returns 400 for unrecognised tier", async () => {
    const res = await POST(makeRequest({ tier: "vip_tier" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/invalid tier/i);
  });

  it("returns 400 when tier is missing", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it("returns 400 when tier is empty string", async () => {
    const res = await POST(makeRequest({ tier: "" }));
    expect(res.status).toBe(400);
  });

  it("returns 500 when Stripe throws", async () => {
    mockSessionCreate.mockRejectedValue(new Error("Stripe connection error"));
    const res = await POST(makeRequest({ tier: "foundation" }));
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toMatch(/failed to create checkout session/i);
  });

  it("calls Stripe with mode=payment", async () => {
    await POST(makeRequest({ tier: "foundation" }));
    const callArgs = mockSessionCreate.mock.calls[0][0];
    expect(callArgs.mode).toBe("payment");
  });

  it("calls Stripe with correct quantity=1", async () => {
    await POST(makeRequest({ tier: "foundation" }));
    const callArgs = mockSessionCreate.mock.calls[0][0];
    expect(callArgs.line_items[0].quantity).toBe(1);
  });

  it("metadata includes the tier name", async () => {
    await POST(makeRequest({ tier: "application_engine" }));
    const callArgs = mockSessionCreate.mock.calls[0][0];
    expect(callArgs.metadata.tier).toBe("application_engine");
  });

  it("success_url redirects to /apply", async () => {
    await POST(makeRequest({ tier: "foundation" }));
    const callArgs = mockSessionCreate.mock.calls[0][0];
    expect(callArgs.success_url).toContain("/apply");
  });

  it("cancel_url redirects to /programs", async () => {
    await POST(makeRequest({ tier: "foundation" }));
    const callArgs = mockSessionCreate.mock.calls[0][0];
    expect(callArgs.cancel_url).toContain("/programs");
  });
});
