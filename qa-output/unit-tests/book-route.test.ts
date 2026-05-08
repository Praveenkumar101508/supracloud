/** @jest-environment node */

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ error: null }),
    },
  })),
}));

process.env.RESEND_API_KEY = "re_test_key";

import { Resend } from "resend";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/book/route";

// The route calls `new Resend()` at module-load time. Capture the send mock
// from that single instance so tests can inspect and override it per-test.
let mockSend: jest.Mock;

beforeAll(() => {
  mockSend = (jest.mocked(Resend).mock.results[0].value as any).emails.send;
});

beforeEach(() => {
  mockSend.mockReset();
  mockSend.mockResolvedValue({ error: null });
});

const makeRequest = (body: object) =>
  new NextRequest("http://localhost:3000/api/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

const validPayload = {
  name: "Alice Johnson",
  email: "alice@bankingcorp.com",
  inquiryType: "Banking AI Agents",
  slots: "Monday – Friday, 9am – 12pm GMT",
  company: "Banking Corp",
  phone: "+44 7700 900123",
  message: "We need an AI agent for L1 customer support.",
};

// ── Happy Path ──────────────────────────────────────────────────────────────

describe("POST /api/book — Happy Path", () => {
  it("returns 200 with success:true for valid payload", async () => {
    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it("calls resend.emails.send twice (client + owner)", async () => {
    await POST(makeRequest(validPayload));
    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it("client confirmation email goes to the submitted email address", async () => {
    await POST(makeRequest(validPayload));
    // First call should be to the client
    const firstCall = mockSend.mock.calls[0][0];
    expect(firstCall.to).toBe("alice@bankingcorp.com");
  });

  it("owner notification email goes to rk@supracloud.co.uk", async () => {
    await POST(makeRequest(validPayload));
    // Second call should be to the owner
    const secondCall = mockSend.mock.calls[1][0];
    expect(secondCall.to).toBe("rk@supracloud.co.uk");
  });

  it("client email subject mentions discovery call", async () => {
    await POST(makeRequest(validPayload));
    const firstCall = mockSend.mock.calls[0][0];
    expect(firstCall.subject).toMatch(/discovery call|SupraCloud/i);
  });

  it("owner email subject contains booking indicator", async () => {
    await POST(makeRequest(validPayload));
    const secondCall = mockSend.mock.calls[1][0];
    expect(secondCall.subject).toMatch(/booking|Alice Johnson|Banking AI Agents/i);
  });

  it("replyTo on client email is rk@supracloud.co.uk", async () => {
    await POST(makeRequest(validPayload));
    const firstCall = mockSend.mock.calls[0][0];
    expect(firstCall.replyTo).toBe("rk@supracloud.co.uk");
  });

  it("replyTo on owner email is the submitted email", async () => {
    await POST(makeRequest(validPayload));
    const secondCall = mockSend.mock.calls[1][0];
    expect(secondCall.replyTo).toBe("alice@bankingcorp.com");
  });

  it("works without optional company field", async () => {
    const { company, ...body } = validPayload;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it("works without optional phone field", async () => {
    const { phone, ...body } = validPayload;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(200);
  });

  it("works without optional message field", async () => {
    const { message, ...body } = validPayload;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(200);
  });
});

// ── Validation (400 responses) ──────────────────────────────────────────────

describe("POST /api/book — Validation (400 responses)", () => {
  it("returns 400 when name is missing", async () => {
    const { name, ...body } = validPayload;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
  });

  it("returns 400 when email is missing", async () => {
    const { email, ...body } = validPayload;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
  });

  it("returns 400 when inquiryType is missing", async () => {
    const { inquiryType, ...body } = validPayload;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
  });

  it("returns 400 when slots is missing", async () => {
    const { slots, ...body } = validPayload;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
  });

  it("returns 400 when all required fields are absent", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it("400 error response includes an error message", async () => {
    const { name, ...body } = validPayload;
    const res = await POST(makeRequest(body));
    const json = await res.json();
    expect(json.error).toBeTruthy();
  });
});

// ── Error Path (500 responses) ─────────────────────────────────────────────

describe("POST /api/book — Error Path (500 responses)", () => {
  it("returns 500 when resend.emails.send throws on first call", async () => {
    mockSend.mockRejectedValueOnce(new Error("SMTP connection refused"));
    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.success).toBe(false);
  });

  it("returns 500 when resend.emails.send throws on second call", async () => {
    mockSend
      .mockResolvedValueOnce({ error: null })
      .mockRejectedValueOnce(new Error("Resend rate limit"));
    const res = await POST(makeRequest(validPayload));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.success).toBe(false);
  });

  it("500 response includes error string", async () => {
    mockSend.mockRejectedValueOnce(new Error("Unknown error"));
    const res = await POST(makeRequest(validPayload));
    const json = await res.json();
    expect(typeof json.error).toBe("string");
  });
});

// ── Edge Cases ─────────────────────────────────────────────────────────────

describe("POST /api/book — Edge Cases", () => {
  it("handles XSS in name without throwing", async () => {
    const res = await POST(makeRequest({ ...validPayload, name: '<script>alert("xss")</script>' }));
    expect([200, 500]).toContain(res.status);
  });

  it("handles very long slots string", async () => {
    const res = await POST(makeRequest({ ...validPayload, slots: "slot\n".repeat(100) }));
    expect([200, 500]).toContain(res.status);
  });

  it("handles unicode in company name", async () => {
    const res = await POST(makeRequest({ ...validPayload, company: "株式会社テスト" }));
    expect([200, 500]).toContain(res.status);
  });

  it("handles name with only a first name (no spaces)", async () => {
    const res = await POST(makeRequest({ ...validPayload, name: "Alice" }));
    expect(res.status).toBe(200);
  });
});
