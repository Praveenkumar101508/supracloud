import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TermsPage from "@/app/terms/page";

describe("Terms of Service Page", () => {
  it("renders page heading", () => {
    render(<TermsPage />);
    expect(screen.getByRole("heading", { name: /Terms of Service/i })).toBeInTheDocument();
  });

  it("renders last updated date", () => {
    render(<TermsPage />);
    expect(screen.getByText(/April 2026/i)).toBeInTheDocument();
  });

  it("renders Acceptance of Terms section", () => {
    render(<TermsPage />);
    expect(screen.getByText(/Acceptance of Terms/i)).toBeInTheDocument();
  });

  it("renders SupraCloud brand name in terms", () => {
    render(<TermsPage />);
    expect(screen.getAllByText(/SupraCloud/i).length).toBeGreaterThan(0);
  });

  it("renders Services section", () => {
    render(<TermsPage />);
    expect(screen.getByText(/2\. Services/i)).toBeInTheDocument();
  });

  it("renders Payment & Refunds section", () => {
    render(<TermsPage />);
    expect(screen.getByText(/Payment & Refunds/i)).toBeInTheDocument();
  });

  it("renders Candidate Responsibilities section", () => {
    render(<TermsPage />);
    expect(screen.getByText(/Candidate Responsibilities/i)).toBeInTheDocument();
  });

  it("renders Intellectual Property section", () => {
    render(<TermsPage />);
    expect(screen.getByText(/Intellectual Property/i)).toBeInTheDocument();
  });

  it("renders Limitation of Liability section", () => {
    render(<TermsPage />);
    expect(screen.getByText(/Limitation of Liability/i)).toBeInTheDocument();
  });

  it("renders Governing Law — England and Wales", () => {
    render(<TermsPage />);
    expect(screen.getByText(/England and Wales/i)).toBeInTheDocument();
  });

  it("renders contact email link", () => {
    render(<TermsPage />);
    const emailLink = screen.getByRole("link", { name: /rk@supracloud\.co\.uk/i });
    expect(emailLink).toHaveAttribute("href", "mailto:rk@supracloud.co.uk");
  });
});
