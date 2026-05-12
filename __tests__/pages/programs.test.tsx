import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProgramsPage from "@/app/programs/page";

jest.mock("next/link", () => {
  return function MockLink({ href, children, ...props }: any) {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe("Programs & Pricing Page", () => {
  it("renders page heading", () => {
    render(<ProgramsPage />);
    expect(screen.getByRole("heading", { name: /Transparent Pricing/i })).toBeInTheDocument();
  });

  it("renders all 3 tier names", () => {
    render(<ProgramsPage />);
    expect(screen.getAllByText(/Foundation/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Application Engine/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Full Accelerator/i).length).toBeGreaterThan(0);
  });

  it("renders Tier 1, Tier 2, Tier 3 labels", () => {
    render(<ProgramsPage />);
    expect(screen.getAllByText(/Tier 1/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Tier 2/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Tier 3/i).length).toBeGreaterThan(0);
  });

  it("renders ATS feature text", () => {
    render(<ProgramsPage />);
    expect(screen.getByText(/ATS-compliant/i)).toBeInTheDocument();
  });

  it("renders Done-for-you UK job applications feature", () => {
    render(<ProgramsPage />);
    expect(screen.getByText(/Done-for-you UK job applications/i)).toBeInTheDocument();
  });

  it("renders mock interviews feature in Tier 3", () => {
    render(<ProgramsPage />);
    expect(screen.getByText(/mock interviews/i)).toBeInTheDocument();
  });

  it("renders Add-ons section", () => {
    render(<ProgramsPage />);
    expect(screen.getByText(/add-ons/i)).toBeInTheDocument();
  });

  it("renders FAQ section", () => {
    render(<ProgramsPage />);
    expect(screen.getByText(/frequently asked questions/i)).toBeInTheDocument();
  });

  it("renders Apply CTA buttons", () => {
    render(<ProgramsPage />);
    const applyLinks = screen.getAllByRole("link", { name: /apply/i });
    expect(applyLinks.length).toBeGreaterThan(0);
  });

  it("Apply buttons link to /apply", () => {
    render(<ProgramsPage />);
    const applyLinks = screen.getAllByRole("link", { name: /apply/i });
    applyLinks.forEach(link => {
      expect(link).toHaveAttribute("href", "/apply");
    });
  });

  it("renders Book Assessment CTA", () => {
    render(<ProgramsPage />);
    expect(screen.getByRole("link", { name: /book.*assessment/i })).toBeInTheDocument();
  });
});
