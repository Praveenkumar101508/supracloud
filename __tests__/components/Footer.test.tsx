import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "@/app/components/Footer";

jest.mock("next/link", () => {
  return function MockLink({ href, children, ...props }: any) {
    return <a href={href} {...props}>{children}</a>;
  };
});

jest.mock("@/app/components/Logo", () => {
  return function MockLogo() {
    return <div data-testid="footer-logo">SupraCloud</div>;
  };
});

describe("Footer Component", () => {
  it("renders the Logo", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-logo")).toBeInTheDocument();
  });

  it("renders company tagline", () => {
    render(<Footer />);
    expect(screen.getByText(/engineer-led/i)).toBeInTheDocument();
  });

  it("renders navigation section heading", () => {
    render(<Footer />);
    expect(screen.getByText("Navigation")).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /programs/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /success stories/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
  });

  it("renders Contact section heading", () => {
    render(<Footer />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders correct email address", () => {
    render(<Footer />);
    expect(screen.getByText("rk@supracloud.co.uk")).toBeInTheDocument();
  });

  it("email link has correct mailto href", () => {
    render(<Footer />);
    const emailLink = screen.getByRole("link", { name: /rk@supracloud\.co\.uk/i });
    expect(emailLink).toHaveAttribute("href", "mailto:rk@supracloud.co.uk");
  });

  it("renders WhatsApp number", () => {
    render(<Footer />);
    expect(screen.getByText(/\+44 7776456694/)).toBeInTheDocument();
  });

  it("WhatsApp link points to wa.me", () => {
    render(<Footer />);
    const waLink = screen.getByRole("link", { name: /whatsapp/i });
    expect(waLink).toHaveAttribute("href", "https://wa.me/447776456694");
  });

  it("WhatsApp link opens in new tab", () => {
    render(<Footer />);
    const waLink = screen.getByRole("link", { name: /whatsapp/i });
    expect(waLink).toHaveAttribute("target", "_blank");
    expect(waLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders copyright 2026", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026 SupraCloud/i)).toBeInTheDocument();
  });

  it("renders Privacy Policy link", () => {
    render(<Footer />);
    const privacyLink = screen.getByRole("link", { name: /privacy policy/i });
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  it("renders Terms of Service link", () => {
    render(<Footer />);
    const termsLink = screen.getByRole("link", { name: /terms of service/i });
    expect(termsLink).toHaveAttribute("href", "/terms");
  });
});
