import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MetricCard } from "@/components/platform/MetricCard";
import { Card } from "@/components/ui/Card";

describe("MetricCard", () => {
  it("renders label, value, and helper text", () => {
    render(<MetricCard label="Services" value="3" helper="Frontend, API, workers" />);

    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Frontend, API, workers")).toBeInTheDocument();
  });

  it("renders with different value types", () => {
    render(<MetricCard label="Status" value="Ready" helper="All systems operational" />);

    expect(screen.getByText("Ready")).toBeInTheDocument();
  });
});

describe("Card", () => {
  it("renders title", () => {
    render(<Card title="My Card" />);

    expect(screen.getByText("My Card")).toBeInTheDocument();
  });

  it("renders optional description", () => {
    render(<Card title="My Card" description="A helpful description" />);

    expect(screen.getByText("A helpful description")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <Card title="My Card">
        <p>Child content</p>
      </Card>,
    );

    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(<Card title="My Card" />);

    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });
});
