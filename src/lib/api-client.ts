import { appConfig } from "@/lib/config";
import type { ExampleResponse, HealthResponse } from "@/types/api";

async function readJson<TData>(path: string): Promise<TData> {
  const response = await fetch(appConfig.apiBaseUrl + path);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json() as Promise<TData>;
}

export const platformApi = {
  getHealth: () => readJson<HealthResponse>("/health/ready"),
  getExample: () => readJson<ExampleResponse>("/api/v1/example"),
};
