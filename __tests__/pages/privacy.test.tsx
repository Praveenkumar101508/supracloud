import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PrivacyPage from "@/app/privacy/page";

describe("Privacy Policy Page", () => {
  it("renders page heading", () => {
    render(<PrivacyPage />);
    expect(screen.getByRole("heading", { name: /Privacy Policy/i })).toBeInTheDocument();
  });

  it("renders last updated date", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/April 2026/i)).toBeInTheDocument();
  });

  it("renders Who We Are section", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/Who We Are/i)).toBeInTheDocument();
  });

  it("renders SupraCloud brand name", () => {
    render(<PrivacyPage />);
    expect(screen.getAllByText(/SupraCloud/i).length).toBeGreaterThan(0);
  });

  it("renders Data We Collect section", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/Data We Collect/i)).toBeInTheDocument();
  });

  it("renders How We Use Your Data section", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/How We Use Your Data/i)).toBeInTheDocument();
  });

  it("renders UK GDPR rights section", () => {
    render(<PrivacyPage />);
    expect(screen.getAllByText(/UK GDPR/i).length).toBeGreaterThan(0);
  });

  it("renders Cookies section", () => {
    render(<PrivacyPage />);
    expect(screen.getAllByText(/Cookies/i).length).toBeGreaterThan(0);
  });

  it("renders contact email", () => {
    render(<PrivacyPage />);
    expect(screen.getByText("rk@supracloud.co.uk")).toBeInTheDocument();
  });

  it("contact email has mailto href", () => {
    render(<PrivacyPage />);
    const emailLink = screen.getByRole("link", { name: /rk@supracloud\.co\.uk/i });
    expect(emailLink).toHaveAttribute("href", "mailto:rk@supracloud.co.uk");
  });
});
