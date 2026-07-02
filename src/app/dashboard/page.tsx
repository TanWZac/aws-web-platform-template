import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/platform/MetricCard";
import { Card } from "@/components/ui/Card";

export default function DashboardPage() {
  return (
    <AppShell>
      <section className="pageTitle">
        <p className="eyebrow">Overview</p>
        <h2>Platform dashboard</h2>
        <p>Use this page as the starting point for users after sign-in.</p>
      </section>

      <section className="metricsGrid">
        <MetricCard label="Services" value="3" helper="Frontend, API, workers" />
        <MetricCard label="Environment" value="Local" helper="Change via env config" />
        <MetricCard label="Backend" value="Ready" helper="See status page" />
      </section>

      <section className="grid">
        <Card title="User workflow" description="Add your platform user journey here." />
        <Card title="Operations" description="Add service health, logs, and monitoring links." />
        <Card title="AI features" description="Add RAG, agent, or automation entry points." />
      </section>
    </AppShell>
  );
}
