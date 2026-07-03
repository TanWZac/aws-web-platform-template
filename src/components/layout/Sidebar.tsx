import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">AWS Platform</div>
      <nav className="sideNav">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/status">Backend Status</Link>
        <Link href="/health">Health</Link>
        <Link href="/login">Login</Link>
      </nav>
    </aside>
  );
}
