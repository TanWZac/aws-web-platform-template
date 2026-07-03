"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, Helvetica, sans-serif", padding: "2rem" }}>
        <h2>Something went wrong</h2>
        <p style={{ color: "#666" }}>{error.message || "An unexpected error occurred."}</p>
        <button
          onClick={reset}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
