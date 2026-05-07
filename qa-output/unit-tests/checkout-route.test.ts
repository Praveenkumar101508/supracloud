/** @jest-environment node */

const mockSessionCreate = jest.fn();
jest.mock("stripe", () =>
  jest.fn().mockImplementation(() => ({
    checkout: { sessions: { create: mockSessionCreate } },
  }))
);

process.env.STRIPE_SECRET_KEY = "sk_test_placeholder";

import { NextRequest } from "next/server";
import { POST } from "@/app/api/checkout/route";

const makeRequest = (body: object) =>
  new NextRequest("http://localhost:3000/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

describe("POST /api/checkout — Happy Path", () => {
  beforeEach(() => {
    mockSessionCreate.mockReset();
    mockSessionCreate.mockResolvedValue({ url: "https://checkout.stripe.com/cs_test_abc" });
  });

  it("returns 200 with checkout URL for tier 'foundation'", async () => {
    const res = await POST(makeRequest({ tier: "foundation" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.url).toBe("https://checkout.stripe.com/cs_test_abc");
  });

  it("returns 200 for tier 'application_engine'", async () => {
    const res = await POST(makeRequest({ tier: "application_engine" }));
    expect(res.status).toBe(200);
  });

  it("returns 200 for tier 'full_accelerator'", async () => {
    const res = await POST(makeRequest({ tier: "full_accelerator" }));
    expect(res.status).toBe(200);
  });

  it("creates session with mode=payment", async () => {
    await POST(makeRequest({ tier: "foundation" }));
    expect(mockSessionCreate.mock.calls[0][0].mode).toBe("payment");
  });

  it("line_items has quantity=1", async () => {
    await POST(makeRequest({ tier: "foundation" }));
    expect(mockSessionCreate.mock.calls[0][0].line_items[0].quantity).toBe(1);
  });

  it("metadata contains the requested tier", async () => {
    await POST(makeRequest({ tier: "application_engine" }));
    expect(mockSessionCreate.mock.calls[0][0].metadata.tier).toBe("application_engine");
  });

  it("success_url redirects to /apply", async () => {
    await POST(makeRequest({ tier: "foundation" }));
    expect(mockSessionCreate.mock.calls[0][0].success_url).toContain("/apply");
  });

  it("cancel_url redirects to /programs", async () => {
    await POST(makeRequest({ tier: "foundation" }));
    expect(mockSessionCreate.mock.calls[0][0].cancel_url).toContain("/programs");
  });

  it("allow_promotion_codes is true", async () => {
    await POST(makeRequest({ tier: "foundation" }));
    expect(mockSessionCreate.mock.calls[0][0].allow_promotion_codes).toBe(true);
  });
});

describe("POST /api/checkout — Validation (400)", () => {
  beforeEach(() => {
    mockSessionCreate.mockReset();
    mockSessionCreate.mockResolvedValue({ url: "https://checkout.stripe.com/cs_test" });
  });

  it("returns 400 for unknown tier", async () => {
    const res = await POST(makeRequest({ tier: "enterprise_gold" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/invalid tier/i);
  });

  it("returns 400 when tier is missing", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it("returns 400 when tier is empty string", async () => {
    const res = await POST(makeRequest({ tier: "" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when tier is null", async () => {
    const res = await POST(makeRequest({ tier: null }));
    expect(res.status).toBe(400);
  });
});

describe("POST /api/checkout — Error Path (500)", () => {
  it("returns 500 when Stripe session.create throws", async () => {
    mockSessionCreate.mockReset();
    mockSessionCreate.mockRejectedValue(new Error("Stripe connection refused"));
    const res = await POST(makeRequest({ tier: "foundation" }));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toMatch(/failed to create checkout/i);
  });

  it("error response does not expose internal error details", async () => {
    mockSessionCreate.mockReset();
    mockSessionCreate.mockRejectedValue(new Error("Internal Stripe secret leaked"));
    const res = await POST(makeRequest({ tier: "foundation" }));
    const json = await res.json();
    expect(JSON.stringify(json)).not.toContain("Internal Stripe secret leaked");
  });
});
