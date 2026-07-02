import { AppShell } from "@/components/layout/AppShell";

export default function HealthPage() {
  return (
    <AppShell>
      <section className="pageTitle">
        <p className="eyebrow">Backend</p>
        <h2>Health overview</h2>
        <p>Configure the backend URL with NEXT_PUBLIC_API_BASE_URL.</p>
      </section>
    </AppShell>
  );
}
