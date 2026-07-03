import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import * as apiClient from "@/lib/api-client";
import StatusPage from "@/app/status/page";

vi.mock("@/lib/api-client");

const mockGetHealth = vi.mocked(apiClient.platformApi.getHealth);
const mockGetExample = vi.mocked(apiClient.platformApi.getExample);

beforeEach(() => {
  vi.resetAllMocks();
});

describe("StatusPage", () => {
  it("shows loading state initially", () => {
    mockGetHealth.mockReturnValue(new Promise(() => {}));
    mockGetExample.mockReturnValue(new Promise(() => {}));

    render(<StatusPage />);

    expect(screen.getByText(/checking backend/i)).toBeInTheDocument();
  });

  it("renders health and example data on success", async () => {
    mockGetHealth.mockResolvedValue({
      status: "ready",
      app: "my-app",
      environment: "dev",
      version: "1.0.0",
    });
    mockGetExample.mockResolvedValue({ message: "Platform service is running" });

    render(<StatusPage />);

    await waitFor(() => {
      expect(screen.getByText("ready")).toBeInTheDocument();
      expect(screen.getByText("dev")).toBeInTheDocument();
    });
  });

  it("shows error state when health check fails", async () => {
    mockGetHealth.mockRejectedValue(new Error("Request failed: 503 Service Unavailable"));
    mockGetExample.mockResolvedValue({ message: "ok" });

    render(<StatusPage />);

    await waitFor(() => {
      expect(screen.getByText(/request failed: 503/i)).toBeInTheDocument();
      expect(screen.getByText("Error")).toBeInTheDocument();
    });
  });

  it("shows error state when example API fails", async () => {
    mockGetHealth.mockResolvedValue({ status: "ready" });
    mockGetExample.mockRejectedValue(new Error("Request failed: 401 Unauthorized"));

    render(<StatusPage />);

    await waitFor(() => {
      expect(screen.getByText(/request failed: 401/i)).toBeInTheDocument();
    });
  });

  it("renders both error states independently when both fail", async () => {
    mockGetHealth.mockRejectedValue(new Error("health error"));
    mockGetExample.mockRejectedValue(new Error("example error"));

    render(<StatusPage />);

    await waitFor(() => {
      expect(screen.getByText("health error")).toBeInTheDocument();
      expect(screen.getByText("example error")).toBeInTheDocument();
    });
  });
});
