/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";

// Mock Resend
jest.mock("resend", () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn().mockResolvedValue({ data: { id: "test-email-id" }, error: null }),
      },
    })),
  };
});

// Set env var
process.env.RESEND_API_KEY = "re_test_key";

import { POST } from "@/app/api/apply/route";

const makeRequest = (body: object) =>
  new NextRequest("http://localhost:3000/api/apply", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

describe("POST /api/apply", () => {
  const validBody = {
    name: "Test User",
    email: "test@example.com",
    targetRole: "Data Engineer",
    level: "Mid-level",
    tools: "Python, SQL, Azure",
    goal: "Get a UK data engineering role within 3 months.",
  };

  it("returns 200 on valid submission", async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("returns 400 when name is missing", async () => {
    const { name, ...body } = validBody;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/missing/i);
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

  it("succeeds without optional tools field", async () => {
    const { tools, ...body } = validBody;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(200);
  });

  it("returns 500 when Resend returns an error", async () => {
    const { Resend } = require("resend");
    Resend.mockImplementationOnce(() => ({
      emails: {
        send: jest.fn().mockResolvedValue({ data: null, error: { message: "API error" } }),
      },
    }));
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toMatch(/failed to send/i);
  });

  it("sends email to rk@supracloud.co.uk", async () => {
    const { Resend } = require("resend");
    const mockSend = jest.fn().mockResolvedValue({ data: { id: "x" }, error: null });
    Resend.mockImplementationOnce(() => ({ emails: { send: mockSend } }));

    await POST(makeRequest(validBody));
    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.to).toContain("rk@supracloud.co.uk");
  });

  it("sends email from SupraCloud domain", async () => {
    const { Resend } = require("resend");
    const mockSend = jest.fn().mockResolvedValue({ data: { id: "x" }, error: null });
    Resend.mockImplementationOnce(() => ({ emails: { send: mockSend } }));

    await POST(makeRequest(validBody));
    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.from).toContain("supracloud.co.uk");
  });

  it("includes applicant name in email subject", async () => {
    const { Resend } = require("resend");
    const mockSend = jest.fn().mockResolvedValue({ data: { id: "x" }, error: null });
    Resend.mockImplementationOnce(() => ({ emails: { send: mockSend } }));

    await POST(makeRequest(validBody));
    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.subject).toContain("Test User");
  });

  it("sets replyTo to applicant email", async () => {
    const { Resend } = require("resend");
    const mockSend = jest.fn().mockResolvedValue({ data: { id: "x" }, error: null });
    Resend.mockImplementationOnce(() => ({ emails: { send: mockSend } }));

    await POST(makeRequest(validBody));
    const callArgs = mockSend.mock.calls[0][0];
    expect(callArgs.replyTo).toBe("test@example.com");
  });
});
