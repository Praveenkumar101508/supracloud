import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProjectsPage from "@/app/projects/page";

jest.mock("next/link", () => {
  return function MockLink({ href, children, ...props }: any) {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe("Projects Page", () => {
  it("renders page heading", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { name: /Projects That Prove Your Skills/i })).toBeInTheDocument();
  });

  it("renders Production RAG Chatbot project", () => {
    render(<ProjectsPage />);
    expect(screen.getByText(/Production RAG Chatbot/i)).toBeInTheDocument();
  });

  it("renders Azure Data Engineering Pipeline project", () => {
    render(<ProjectsPage />);
    expect(screen.getByText(/Azure Data Engineering Pipeline/i)).toBeInTheDocument();
  });

  it("renders AWS ML Deployment project", () => {
    render(<ProjectsPage />);
    expect(screen.getByText(/AWS ML/i)).toBeInTheDocument();
  });

  it("renders BI Analytics Dashboard project", () => {
    render(<ProjectsPage />);
    expect(screen.getByText(/BI Analytics Dashboard/i)).toBeInTheDocument();
  });

  it("renders tool badges for projects (Python, Azure, AWS etc.)", () => {
    render(<ProjectsPage />);
    expect(
      screen.getAllByText(/Python|Azure|AWS|SQL|Docker/i).length
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders Deliverables section for each project", () => {
    render(<ProjectsPage />);
    const deliverables = screen.getAllByText(/Deliverables/i);
    expect(deliverables.length).toBeGreaterThanOrEqual(4);
  });

  it("renders GitHub repo mention", () => {
    render(<ProjectsPage />);
    expect(screen.getAllByText(/GitHub/i).length).toBeGreaterThan(0);
  });

  it("renders Architecture diagram mention", () => {
    render(<ProjectsPage />);
    expect(screen.getAllByText(/Architecture/i).length).toBeGreaterThan(0);
  });

  it("renders CTA to apply", () => {
    render(<ProjectsPage />);
    const applyLink = screen.getAllByRole("link", { name: /apply/i });
    expect(applyLink.length).toBeGreaterThan(0);
  });
});
