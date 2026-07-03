import Link from "next/link";

import { appConfig } from "@/lib/config";

export function Header() {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">{appConfig.appEnv}</p>
        <h1>{appConfig.appName}</h1>
      </div>
      <nav className="topNav">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/status">Status</Link>
        <Link href="/health">Health</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}
