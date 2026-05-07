/** @jest-environment node */

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ error: null }),
    },
  })),
}));

import { Resend } from "resend";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";

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
  new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

const validBrief = {
  company: "Acme Corp",
  name: "Jane Smith",
  email: "jane@acmecorp.com",
  service: "Banking AI Agents",
  requirements: "We need autonomous agents for L1 support.",
};

const validCandidate = {
  formType: "candidate",
  name: "John Doe",
  email: "john@example.com",
  currentRole: "Software Engineer",
  targetRole: "Data Engineer",
  message: "Looking to transition to data engineering.",
};

describe("POST /api/contact — Business Brief", () => {
  it("returns 200 with success:true for valid brief payload", async () => {
    const res = await POST(makeRequest(validBrief));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it("calls Resend.emails.send once per request", async () => {
    await POST(makeRequest(validBrief));
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it("sends to rk@supracloud.co.uk", async () => {
    await POST(makeRequest(validBrief));
    expect(mockSend.mock.calls[0][0].to).toBe("rk@supracloud.co.uk");
  });

  it("includes company name in subject line", async () => {
    await POST(makeRequest(validBrief));
    expect(mockSend.mock.calls[0][0].subject).toContain("Acme Corp");
  });

  it("includes service in subject line for brief", async () => {
    await POST(makeRequest(validBrief));
    expect(mockSend.mock.calls[0][0].subject).toContain("Banking AI Agents");
  });

  it("returns 200 when optional requirements field is omitted", async () => {
    const { requirements, ...body } = validBrief;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(200);
  });

  it("returns 500 when Resend.emails.send throws", async () => {
    mockSend.mockRejectedValueOnce(new Error("SMTP error"));
    const res = await POST(makeRequest(validBrief));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toBeTruthy();
  });

  it("returns 500 when send rejects with unknown value", async () => {
    mockSend.mockRejectedValueOnce("rate-limited");
    const res = await POST(makeRequest(validBrief));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.success).toBe(false);
  });
});

describe("POST /api/contact — Candidate Enquiry", () => {
  it("returns 200 with success:true for valid candidate payload", async () => {
    const res = await POST(makeRequest(validCandidate));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it("subject contains candidate name for formType=candidate", async () => {
    await POST(makeRequest(validCandidate));
    expect(mockSend.mock.calls[0][0].subject).toContain("John Doe");
  });

  it("body text contains candidate email", async () => {
    await POST(makeRequest(validCandidate));
    expect(mockSend.mock.calls[0][0].text).toContain("john@example.com");
  });

  it("body text contains target role", async () => {
    await POST(makeRequest(validCandidate));
    expect(mockSend.mock.calls[0][0].text).toContain("Data Engineer");
  });

  it("returns 200 when optional currentRole is omitted", async () => {
    const { currentRole, ...body } = validCandidate;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(200);
  });

  it("returns 200 when optional message is omitted", async () => {
    const { message, ...body } = validCandidate;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(200);
  });
});

describe("POST /api/contact — Edge Cases", () => {
  it("handles empty body object without throwing", async () => {
    const res = await POST(makeRequest({}));
    expect([200, 500]).toContain(res.status);
  });

  it("handles XSS in name without throwing", async () => {
    const res = await POST(makeRequest({ ...validBrief, name: '<script>alert("xss")</script>' }));
    expect([200, 500]).toContain(res.status);
  });

  it("handles very long requirements string without throwing", async () => {
    const res = await POST(makeRequest({ ...validBrief, requirements: "a".repeat(10000) }));
    expect([200, 500]).toContain(res.status);
  });
});
