import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AboutPage from "@/app/about/page";

jest.mock("next/link", () => {
  return function MockLink({ href, children, ...props }: any) {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe("About Page", () => {
  it("renders page heading", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: /Built by Engineers, for Engineers/i })).toBeInTheDocument();
  });

  it("renders SupraCloud in subheadline", () => {
    render(<AboutPage />);
    expect(screen.getByText(/SupraCloud exists because/i)).toBeInTheDocument();
  });

  it("renders Founder Story section", () => {
    render(<AboutPage />);
    expect(screen.getByText(/The Founder Story/i)).toBeInTheDocument();
  });

  it("renders Our Mission section", () => {
    render(<AboutPage />);
    expect(screen.getByText(/Our Mission/i)).toBeInTheDocument();
  });

  it("renders Our Core Values section", () => {
    render(<AboutPage />);
    expect(screen.getByText(/Our Core Values/i)).toBeInTheDocument();
  });

  it("renders Technical Depth value", () => {
    render(<AboutPage />);
    expect(screen.getByText("Technical Depth")).toBeInTheDocument();
  });

  it("renders Accountability value", () => {
    render(<AboutPage />);
    expect(screen.getByText("Accountability")).toBeInTheDocument();
  });

  it("renders Real-World Standards value", () => {
    render(<AboutPage />);
    expect(screen.getByText("Real-World Standards")).toBeInTheDocument();
  });

  it("renders code block with SupraCloud()", () => {
    render(<AboutPage />);
    expect(screen.getByText(/SupraCloud\(\)/)).toBeInTheDocument();
  });

  it("renders Book Free Assessment Call CTA", () => {
    render(<AboutPage />);
    const ctas = screen.getAllByRole("link", { name: /Book Free Assessment Call/i });
    expect(ctas.length).toBeGreaterThan(0);
  });

  it("CTA links to /book", () => {
    render(<AboutPage />);
    const ctas = screen.getAllByRole("link", { name: /Book Free Assessment Call/i });
    expect(ctas[0]).toHaveAttribute("href", "/book");
  });
});
