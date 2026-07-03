import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import * as apiClient from "@/lib/api-client";
import HealthPage from "@/app/health/page";

vi.mock("@/lib/api-client");

const mockGetHealth = vi.mocked(apiClient.platformApi.getHealth);

beforeEach(() => {
  vi.resetAllMocks();
});

describe("HealthPage", () => {
  it("shows loading state initially", () => {
    mockGetHealth.mockReturnValue(new Promise(() => {}));

    render(<HealthPage />);

    expect(screen.getByText(/checking health/i)).toBeInTheDocument();
  });

  it("renders health response on success", async () => {
    mockGetHealth.mockResolvedValue({
      status: "ready",
      app: "my-app",
      environment: "prod",
      version: "2.0.0",
    });

    render(<HealthPage />);

    await waitFor(() => {
      expect(screen.getByText("Health response")).toBeInTheDocument();
      expect(screen.getByText(/"status": "ready"/)).toBeInTheDocument();
    });
  });

  it("shows error card when health check fails", async () => {
    mockGetHealth.mockRejectedValue(new Error("Request failed: 503 Service Unavailable"));

    render(<HealthPage />);

    await waitFor(() => {
      expect(screen.getByText("Health check failed")).toBeInTheDocument();
      expect(screen.getByText(/request failed: 503/i)).toBeInTheDocument();
    });
  });
});
