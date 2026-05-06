import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "@/app/page";

jest.mock("next/link", () => {
  return function MockLink({ href, children, ...props }: any) {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe("Home Page", () => {
  // ── Hero Section ──────────────────────────────────────
  it("renders main hero heading", () => {
    render(<HomePage />);
    expect(screen.getByText(/Become Industry-Ready for/i)).toBeInTheDocument();
  });

  it("renders UK Data, Cloud & AI Roles in heading", () => {
    render(<HomePage />);
    expect(screen.getByText(/UK Data, Cloud & AI Roles/i)).toBeInTheDocument();
  });

  it("renders SupraCloud in the subheadline", () => {
    render(<HomePage />);
    expect(screen.getByText(/SupraCloud is an engineer-led/i)).toBeInTheDocument();
  });

  it("renders Book Free Assessment Call CTA", () => {
    render(<HomePage />);
    const ctas = screen.getAllByRole("link", { name: /Book Free Assessment Call/i });
    expect(ctas.length).toBeGreaterThan(0);
  });

  it("Book Free Assessment Call links to /book", () => {
    render(<HomePage />);
    const ctas = screen.getAllByRole("link", { name: /Book Free Assessment Call/i });
    ctas.forEach(cta => expect(cta).toHaveAttribute("href", "/book"));
  });

  it("renders Apply Now CTA", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("link", { name: /Apply Now/i }).length).toBeGreaterThan(0);
  });

  it("Apply Now links to /apply", () => {
    render(<HomePage />);
    const applyLinks = screen.getAllByRole("link", { name: /Apply Now/i });
    expect(applyLinks[0]).toHaveAttribute("href", "/apply");
  });

  // ── Core Pillars Section ──────────────────────────────
  it("renders 3 Core Pillars heading", () => {
    render(<HomePage />);
    expect(screen.getByText(/Everything You Need to Land the Role/i)).toBeInTheDocument();
  });

  it("renders Real Production-Style Projects pillar", () => {
    render(<HomePage />);
    expect(screen.getByText(/Real Production-Style Projects/i)).toBeInTheDocument();
  });

  it("renders Structured Training & Applications pillar", () => {
    render(<HomePage />);
    expect(screen.getByText(/Structured Training & Applications/i)).toBeInTheDocument();
  });

  it("renders Interview Mastery pillar", () => {
    render(<HomePage />);
    expect(screen.getByText(/Interview Mastery/i)).toBeInTheDocument();
  });

  // ── Outcomes Section ──────────────────────────────────
  it("renders What You Walk Away With section", () => {
    render(<HomePage />);
    expect(screen.getByText(/What You Walk Away With/i)).toBeInTheDocument();
  });

  it("renders GitHub Portfolio outcome", () => {
    render(<HomePage />);
    expect(screen.getAllByText(/GitHub Portfolio/i).length).toBeGreaterThan(0);
  });

  it("renders ATS-Optimised CV outcome", () => {
    render(<HomePage />);
    expect(screen.getAllByText(/ATS-Optimised CV/i).length).toBeGreaterThan(0);
  });

  it("renders Mock Interview Readiness outcome", () => {
    render(<HomePage />);
    expect(screen.getByText(/Mock Interview Readiness/i)).toBeInTheDocument();
  });

  it("renders Recruiter-Optimised LinkedIn outcome", () => {
    render(<HomePage />);
    expect(screen.getByText(/Recruiter-Optimised LinkedIn/i)).toBeInTheDocument();
  });

  // ── Tier Preview Section ──────────────────────────────
  it("renders Choose Your Programme section", () => {
    render(<HomePage />);
    expect(screen.getByText(/Choose Your Programme/i)).toBeInTheDocument();
  });

  it("renders The Foundation tier", () => {
    render(<HomePage />);
    expect(screen.getByText("The Foundation")).toBeInTheDocument();
  });

  it("renders The Application Engine tier", () => {
    render(<HomePage />);
    expect(screen.getByText("The Application Engine")).toBeInTheDocument();
  });

  it("renders The Full Accelerator tier", () => {
    render(<HomePage />);
    expect(screen.getByText("The Full Accelerator")).toBeInTheDocument();
  });

  // ── Final CTA ─────────────────────────────────────────
  it("renders final CTA section heading", () => {
    render(<HomePage />);
    expect(screen.getByText(/Ready to Get Industry-Ready/i)).toBeInTheDocument();
  });
});
