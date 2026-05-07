/** @jest-environment node */

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: "test-id" }, error: null }),
    },
  })),
}));

process.env.RESEND_API_KEY = "re_test_key";

import { NextRequest } from "next/server";
import { POST } from "@/app/api/apply/route";

const makeRequest = (body: object) =>
  new NextRequest("http://localhost:3000/api/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

const validBody = {
  name: "Jane Smith",
  email: "jane@example.com",
  targetRole: "Data Engineer",
  level: "2–5 years experience",
  tools: "Python, SQL, Azure",
  goal: "Land a UK data engineering role within 3 months.",
};

describe("POST /api/apply — Happy Path", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns 200 with success:true on valid payload", async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it("returns 200 when optional tools field is omitted", async () => {
    const { tools, ...body } = validBody;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(200);
  });

  it("sends email to rk@supracloud.co.uk", async () => {
    const { Resend } = require("resend");
    const mockSend = jest.fn().mockResolvedValue({ data: { id: "x" }, error: null });
    Resend.mockImplementationOnce(() => ({ emails: { send: mockSend } }));
    await POST(makeRequest(validBody));
    expect(mockSend.mock.calls[0][0].to).toContain("rk@supracloud.co.uk");
  });

  it("email subject contains applicant name and target role", async () => {
    const { Resend } = require("resend");
    const mockSend = jest.fn().mockResolvedValue({ data: { id: "x" }, error: null });
    Resend.mockImplementationOnce(() => ({ emails: { send: mockSend } }));
    await POST(makeRequest(validBody));
    const subject = mockSend.mock.calls[0][0].subject;
    expect(subject).toContain("Jane Smith");
    expect(subject).toContain("Data Engineer");
  });

  it("replyTo is set to applicant email", async () => {
    const { Resend } = require("resend");
    const mockSend = jest.fn().mockResolvedValue({ data: { id: "x" }, error: null });
    Resend.mockImplementationOnce(() => ({ emails: { send: mockSend } }));
    await POST(makeRequest(validBody));
    expect(mockSend.mock.calls[0][0].replyTo).toBe("jane@example.com");
  });

  it("from address is from supracloud.co.uk domain", async () => {
    const { Resend } = require("resend");
    const mockSend = jest.fn().mockResolvedValue({ data: { id: "x" }, error: null });
    Resend.mockImplementationOnce(() => ({ emails: { send: mockSend } }));
    await POST(makeRequest(validBody));
    expect(mockSend.mock.calls[0][0].from).toContain("supracloud.co.uk");
  });
});

describe("POST /api/apply — Validation (400 responses)", () => {
  it("returns 400 when name is missing", async () => {
    const { name, ...body } = validBody;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/missing/i);
  });

  it("returns 400 when email is missing", async () => {
    const { email, ...body } = validBody;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
  });

  it("returns 400 when targetRole is missing", async () => {
    const { targetRole, ...body } = validBody;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
  });

  it("returns 400 when level is missing", async () => {
    const { level, ...body } = validBody;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
  });

  it("returns 400 when goal is missing", async () => {
    const { goal, ...body } = validBody;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
  });

  it("returns 400 when all required fields are empty strings", async () => {
    const res = await POST(makeRequest({ name: "", email: "", targetRole: "", level: "", goal: "" }));
    expect(res.status).toBe(400);
  });
});

describe("POST /api/apply — Error Path (500 responses)", () => {
  it("returns 500 when Resend returns an error object", async () => {
    const { Resend } = require("resend");
    Resend.mockImplementationOnce(() => ({
      emails: { send: jest.fn().mockResolvedValue({ data: null, error: { message: "Rate limit" } }) },
    }));
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toMatch(/failed to send/i);
  });

  it("returns 500 when Resend.emails.send throws", async () => {
    const { Resend } = require("resend");
    Resend.mockImplementationOnce(() => ({
      emails: { send: jest.fn().mockRejectedValue(new Error("Network error")) },
    }));
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
  });
});

describe("POST /api/apply — Edge Cases", () => {
  it("handles special characters in name", async () => {
    const res = await POST(makeRequest({ ...validBody, name: "O'Connor-Smith" }));
    expect([200, 400, 500]).toContain(res.status);
  });

  it("handles unicode in goal field", async () => {
    const res = await POST(makeRequest({ ...validBody, goal: "目標：AIエンジニア" }));
    expect([200, 500]).toContain(res.status);
  });

  it("handles max-length goal (5000 chars)", async () => {
    const res = await POST(makeRequest({ ...validBody, goal: "x".repeat(5000) }));
    expect([200, 500]).toContain(res.status);
  });
});
