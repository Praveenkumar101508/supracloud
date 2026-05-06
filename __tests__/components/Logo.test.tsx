import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Logo from "@/app/components/Logo";

describe("Logo Component", () => {
  it("renders the wordmark with Supra and Cloud text", () => {
    render(<Logo />);
    expect(screen.getByText("Supra")).toBeInTheDocument();
    expect(screen.getByText("Cloud")).toBeInTheDocument();
  });

  it("renders the SVG mark", () => {
    const { container } = render(<Logo />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("hides wordmark when showWordmark is false", () => {
    render(<Logo showWordmark={false} />);
    expect(screen.queryByText("Supra")).not.toBeInTheDocument();
    expect(screen.queryByText("Cloud")).not.toBeInTheDocument();
  });

  it("applies light variant (white text) by default", () => {
    render(<Logo variant="light" />);
    const supraTxt = screen.getByText("Supra");
    expect(supraTxt).toHaveClass("text-white");
  });

  it("applies dark variant (navy text)", () => {
    render(<Logo variant="dark" />);
    const supraTxt = screen.getByText("Supra");
    expect(supraTxt).toHaveClass("text-[#0A192F]");
  });

  it("applies sm size correctly", () => {
    const { container } = render(<Logo size="sm" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "28");
  });

  it("applies md size correctly", () => {
    const { container } = render(<Logo size="md" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "36");
  });

  it("applies lg size correctly", () => {
    const { container } = render(<Logo size="lg" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "48");
  });

  it("renders three bars in the SVG mark", () => {
    const { container } = render(<Logo />);
    const rects = container.querySelectorAll("svg rect");
    expect(rects.length).toBe(3);
  });

  it("renders two connector nodes in the SVG mark", () => {
    const { container } = render(<Logo />);
    const circles = container.querySelectorAll("svg circle");
    expect(circles.length).toBe(2);
  });

  it("passes custom className to wrapper", () => {
    const { container } = render(<Logo className="test-class" />);
    expect(container.firstChild).toHaveClass("test-class");
  });

  it("SVG is aria-hidden (decorative)", () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("wordmark span has aria-label SupraCloud", () => {
    render(<Logo />);
    expect(screen.getByLabelText("SupraCloud")).toBeInTheDocument();
  });
});
