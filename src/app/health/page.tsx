"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { platformApi } from "@/lib/api-client";
import type { ApiResult, HealthResponse } from "@/types/api";

export default function HealthPage() {
  const [result, setResult] = useState<ApiResult<HealthResponse>>({ data: null, error: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    platformApi
      .getHealth()
      .then((data) => setResult({ data, error: null }))
      .catch((err: Error) => setResult({ data: null, error: err.message }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppShell>
      <section className="pageTitle">
        <p className="eyebrow">Backend</p>
        <h2>Health overview</h2>
        <p>Configure the backend URL with NEXT_PUBLIC_API_BASE_URL.</p>
      </section>

      {loading ? (
        <p>Checking health…</p>
      ) : result.error ? (
        <Card title="Health check failed">
          <p style={{ color: "red" }}>{result.error}</p>
        </Card>
      ) : (
        <Card title="Health response">
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </Card>
      )}
    </AppShell>
  );
}
