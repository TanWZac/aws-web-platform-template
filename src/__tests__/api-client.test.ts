import { describe, it, expect, vi, beforeEach } from "vitest";
import { platformApi } from "@/lib/api-client";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

describe("platformApi.getHealth", () => {
  it("returns parsed JSON on a 200 response", async () => {
    const payload = { status: "ready", app: "test", environment: "dev", version: "1.0.0" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => payload,
    });

    const result = await platformApi.getHealth();
    expect(result).toEqual(payload);
  });

  it("throws an error with the HTTP status when the response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
    });

    await expect(platformApi.getHealth()).rejects.toThrow("Request failed: 503 Service Unavailable");
  });

  it("propagates network errors", async () => {
    mockFetch.mockRejectedValueOnce(new TypeError("Failed to fetch"));

    await expect(platformApi.getHealth()).rejects.toThrow("Failed to fetch");
  });
});

describe("platformApi.getExample", () => {
  it("returns parsed JSON on a 200 response", async () => {
    const payload = { message: "Platform service is running" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => payload,
    });

    const result = await platformApi.getExample();
    expect(result).toEqual(payload);
  });

  it("throws a 401 error when the request is unauthorised", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
    });

    await expect(platformApi.getExample()).rejects.toThrow("Request failed: 401 Unauthorized");
  });

  it("throws a 404 error distinguishable from a 500 error", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await expect(platformApi.getExample()).rejects.toThrow("Request failed: 404 Not Found");
  });
});
