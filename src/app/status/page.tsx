"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/platform/MetricCard";
import { platformApi } from "@/lib/api-client";
import type { ApiResult, HealthResponse, ExampleResponse } from "@/types/api";

export default function StatusPage() {
  const [health, setHealth] = useState<ApiResult<HealthResponse>>({ data: null, error: null });
  const [example, setExample] = useState<ApiResult<ExampleResponse>>({ data: null, error: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      const [healthResult, exampleResult] = await Promise.allSettled([
        platformApi.getHealth(),
        platformApi.getExample(),
      ]);

      setHealth(
        healthResult.status === "fulfilled"
          ? { data: healthResult.value, error: null }
          : { data: null, error: (healthResult.reason as Error).message },
      );

      setExample(
        exampleResult.status === "fulfilled"
          ? { data: exampleResult.value, error: null }
          : { data: null, error: (exampleResult.reason as Error).message },
      );

      setLoading(false);
    }

    void fetchStatus();
  }, []);

  return (
    <AppShell>
      <section className="pageTitle">
        <p className="eyebrow">Backend</p>
        <h2>System status</h2>
        <p>Live connectivity check against the configured backend API.</p>
      </section>

      {loading ? (
        <p>Checking backend…</p>
      ) : (
        <>
          <section className="metricsGrid">
            <MetricCard
              label="Health"
              value={health.error ? "Error" : (health.data?.status ?? "Unknown")}
              helper={health.error ?? (health.data?.app ?? "GET /health/ready")}
            />
            <MetricCard
              label="Environment"
              value={health.data?.environment ?? "—"}
              helper={health.data?.version ?? "version not reported"}
            />
            <MetricCard
              label="Example API"
              value={example.error ? "Error" : "OK"}
              helper={example.error ?? (example.data?.message ?? "GET /api/v1/example")}
            />
          </section>

          <section className="grid">
            <Card title="Health response">
              {health.error ? (
                <p style={{ color: "red" }}>{health.error}</p>
              ) : (
                <pre>{JSON.stringify(health.data, null, 2)}</pre>
              )}
            </Card>
            <Card title="Example response">
              {example.error ? (
                <p style={{ color: "red" }}>{example.error}</p>
              ) : (
                <pre>{JSON.stringify(example.data, null, 2)}</pre>
              )}
            </Card>
          </section>
        </>
      )}
    </AppShell>
  );
}
