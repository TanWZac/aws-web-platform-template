import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

type Props = {
  children: React.ReactNode;
};

export function AppShell(props: Props) {
  return (
    <div className="shell">
      <Sidebar />
      <main className="mainPanel">
        <Header />
        <div className="content">{props.children}</div>
      </main>
    </div>
  );
}
