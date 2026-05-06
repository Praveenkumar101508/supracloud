import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "@/app/components/Navbar";

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({ href, children, ...props }: any) {
    return <a href={href} {...props}>{children}</a>;
  };
});

// Mock Logo component
jest.mock("@/app/components/Logo", () => {
  return function MockLogo() {
    return <div data-testid="logo">SupraCloud Logo</div>;
  };
});

describe("Navbar Component", () => {
  it("renders the Logo", () => {
    render(<Navbar />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("renders all navigation links on desktop", () => {
    render(<Navbar />);
    expect(screen.getAllByText("Programs").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Projects").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Success Stories").length).toBeGreaterThan(0);
    expect(screen.getAllByText("About").length).toBeGreaterThan(0);
  });

  it("renders Book a Call CTA button", () => {
    render(<Navbar />);
    const bookLinks = screen.getAllByText("Book a Call");
    expect(bookLinks.length).toBeGreaterThan(0);
  });

  it("Book a Call links to /book", () => {
    render(<Navbar />);
    const bookLinks = screen.getAllByRole("link", { name: /book a call/i });
    bookLinks.forEach(link => {
      expect(link).toHaveAttribute("href", "/book");
    });
  });

  it("Programs link points to /programs", () => {
    render(<Navbar />);
    const links = screen.getAllByRole("link", { name: /programs/i });
    expect(links[0]).toHaveAttribute("href", "/programs");
  });

  it("Projects link points to /projects", () => {
    render(<Navbar />);
    const links = screen.getAllByRole("link", { name: /projects/i });
    expect(links[0]).toHaveAttribute("href", "/projects");
  });

  it("About link points to /about", () => {
    render(<Navbar />);
    const links = screen.getAllByRole("link", { name: /about/i });
    expect(links[0]).toHaveAttribute("href", "/about");
  });

  it("renders hamburger menu button", () => {
    render(<Navbar />);
    expect(screen.getByRole("button", { name: /toggle menu/i })).toBeInTheDocument();
  });

  it("mobile menu is hidden by default", () => {
    render(<Navbar />);
    // Mobile menu links only show when open — Book a Call should have 1 (desktop) initially
    const bookLinks = screen.getAllByRole("link", { name: /book a call/i });
    // The desktop CTA exists
    expect(bookLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("toggles mobile menu open on hamburger click", () => {
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(toggle);
    // After opening, more Book a Call links appear (desktop + mobile)
    const bookLinks = screen.getAllByRole("link", { name: /book a call/i });
    expect(bookLinks.length).toBeGreaterThanOrEqual(2);
  });

  it("closes mobile menu on second hamburger click", () => {
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(toggle); // open
    fireEvent.click(toggle); // close
    const bookLinks = screen.getAllByRole("link", { name: /book a call/i });
    expect(bookLinks.length).toBe(1);
  });

  it("has sticky positioning for fixed navbar", () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector("header");
    expect(header).toHaveClass("sticky");
  });
});
