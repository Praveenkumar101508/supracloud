import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CheckoutButton from "@/app/components/CheckoutButton";

jest.mock("posthog-js", () => ({ capture: jest.fn() }));

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
  jest.clearAllMocks();
});

describe("CheckoutButton", () => {
  it("renders with the provided label", () => {
    render(<CheckoutButton tier="foundation" label="Get Started" />);
    expect(screen.getByRole("button", { name: "Get Started" })).toBeInTheDocument();
  });

  it("button is enabled by default", () => {
    render(<CheckoutButton tier="foundation" label="Get Started" />);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("applies highlight styles when highlight=true", () => {
    render(<CheckoutButton tier="foundation" label="Get Started" highlight />);
    expect(screen.getByRole("button").className).toContain("bg-emerald-500");
  });

  it("applies border styles when highlight is not set", () => {
    render(<CheckoutButton tier="foundation" label="Get Started" />);
    expect(screen.getByRole("button").className).toContain("border");
  });

  it("shows loading state and disables button while fetching", async () => {
    mockFetch.mockReturnValue(new Promise(() => {})); // never resolves
    render(<CheckoutButton tier="foundation" label="Get Started" />);
    fireEvent.click(screen.getByRole("button"));
    const btn = await screen.findByRole("button", { name: /redirecting/i });
    expect(btn).toBeDisabled();
  });

  it("does not show an error after a successful checkout API response", async () => {
    // JSDOM cannot perform cross-origin navigation; full redirect is covered by E2E tests.
    // This verifies the success code path runs without surfacing an error to the user.
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ url: "https://checkout.stripe.com/cs_test_123" }),
    });
    render(<CheckoutButton tier="foundation" label="Get Started" />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(screen.queryByText(/could not start checkout/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/network error/i)).not.toBeInTheDocument();
  });

  it("shows error when API response is not ok", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Invalid tier" }),
    });
    render(<CheckoutButton tier="foundation" label="Get Started" />);
    fireEvent.click(screen.getByRole("button"));
    expect(await screen.findByText(/could not start checkout/i)).toBeInTheDocument();
  });

  it("shows error when response ok but url is missing", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ url: null }),
    });
    render(<CheckoutButton tier="foundation" label="Get Started" />);
    fireEvent.click(screen.getByRole("button"));
    expect(await screen.findByText(/could not start checkout/i)).toBeInTheDocument();
  });

  it("shows network error on fetch rejection", async () => {
    mockFetch.mockRejectedValue(new Error("Network failure"));
    render(<CheckoutButton tier="foundation" label="Get Started" />);
    fireEvent.click(screen.getByRole("button"));
    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
  });

  it("re-enables button after a failed request", async () => {
    mockFetch.mockRejectedValue(new Error("Network failure"));
    render(<CheckoutButton tier="foundation" label="Get Started" />);
    fireEvent.click(screen.getByRole("button"));
    await screen.findByText(/network error/i);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("calls posthog.capture with tier on click", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ url: "https://stripe.com/checkout" }),
    });
    const posthog = require("posthog-js");
    render(<CheckoutButton tier="application_engine" label="Apply Now" />);
    fireEvent.click(screen.getByRole("button"));
    expect(posthog.capture).toHaveBeenCalledWith("checkout_initiated", { tier: "application_engine" });
  });

  it("POSTs to /api/checkout with the correct tier in body", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ url: "https://stripe.com/checkout" }),
    });
    render(<CheckoutButton tier="full_accelerator" label="Book Now" />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    const [url, opts] = mockFetch.mock.calls[0];
    expect(url).toBe("/api/checkout");
    expect(opts.method).toBe("POST");
    expect(JSON.parse(opts.body)).toEqual({ tier: "full_accelerator" });
  });

  it("does not show error text initially", () => {
    render(<CheckoutButton tier="foundation" label="Get Started" />);
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });
});
