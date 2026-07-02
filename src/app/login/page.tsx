import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  return (
    <AppShell>
      <section className="pageTitle">
        <p className="eyebrow">Access</p>
        <h2>Login placeholder</h2>
        <p>Connect this page to Cognito or your identity provider when ready.</p>
      </section>

      <Card title="Authentication integration">
        <p>
          This template keeps authentication as a placeholder so you can wire it to Cognito,
          SSO, or your company identity provider later.
        </p>
      </Card>
    </AppShell>
  );
}
