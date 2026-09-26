import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="auth-wrap">
      <div className="auth-card">
        <Link href="/"><img className="auth-logo" src="/logo.png" alt="Velora Partners" /></Link>
        <h1>Member Login</h1>
        <LoginForm />
        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 13, marginTop: 24 }}>
          Don&apos;t have an account? <Link href="/apply" style={{ color: "var(--cyan)" }}>Apply for membership</Link>
        </p>
      </div>
    </main>
  );
}