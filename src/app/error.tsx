"use client";

import { useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

function RouteError({ error, reset }: Props) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <AppShell>
      <section className="pageTitle">
        <p className="eyebrow">Error</p>
        <h2>Something went wrong</h2>
        <p>{error.message || "An unexpected error occurred on this page."}</p>
      </section>
      <button
        onClick={reset}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        Try again
      </button>
    </AppShell>
  );
}

export default RouteError;
