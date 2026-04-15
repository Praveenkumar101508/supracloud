import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookPage from "@/app/book/page";

jest.mock("next/link", () => {
  return function MockLink({ href, children, ...props }: any) {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe("Book Page", () => {
  it("renders page heading", () => {
    render(<BookPage />);
    expect(screen.getByRole("heading", { name: /Map Out Your Path to Hired/i })).toBeInTheDocument();
  });

  it("renders Free Assessment Call badge", () => {
    render(<BookPage />);
    expect(screen.getByText(/Free Assessment Call/i)).toBeInTheDocument();
  });

  it("renders 30 minutes detail", () => {
    render(<BookPage />);
    expect(screen.getByText(/30 minutes/i)).toBeInTheDocument();
  });

  it("renders What to Prepare section", () => {
    render(<BookPage />);
    expect(screen.getByText(/What to Prepare/i)).toBeInTheDocument();
  });

  it("renders CV prep item", () => {
    render(<BookPage />);
    expect(screen.getByText(/current CV or LinkedIn/i)).toBeInTheDocument();
  });

  it("renders timeline prep item", () => {
    render(<BookPage />);
    expect(screen.getByText(/Your timeline/i)).toBeInTheDocument();
  });

  it("renders Prefer to Reach Out Directly section", () => {
    render(<BookPage />);
    expect(screen.getByText(/Prefer to Reach Out Directly/i)).toBeInTheDocument();
  });

  it("renders correct email address", () => {
    render(<BookPage />);
    expect(screen.getByText("rk@supracloud.co.uk")).toBeInTheDocument();
  });

  it("email link has correct mailto href", () => {
    render(<BookPage />);
    const emailLink = screen.getByRole("link", { name: /rk@supracloud\.co\.uk/i });
    expect(emailLink).toHaveAttribute("href", "mailto:rk@supracloud.co.uk");
  });

  it("renders WhatsApp contact link", () => {
    render(<BookPage />);
    const waLink = screen.getByRole("link", { name: /whatsapp/i });
    expect(waLink).toHaveAttribute("href", "https://wa.me/447776456694");
  });

  it("renders Calendly iframe embed", () => {
    const { container } = render(<BookPage />);
    const iframe = container.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
  });

  it("Calendly iframe has correct src", () => {
    const { container } = render(<BookPage />);
    const iframe = container.querySelector("iframe");
    expect(iframe?.getAttribute("src")).toContain("calendly.com/rk-supracloud/30min");
  });

  it("Calendly iframe has accessible title", () => {
    const { container } = render(<BookPage />);
    const iframe = container.querySelector("iframe");
    expect(iframe?.getAttribute("title")).toMatch(/SupraCloud/i);
  });
});
