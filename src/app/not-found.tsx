import Link from "next/link";

export default function NotFound() {
  return (
    <main className="auth-wrap">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <div className="eyebrow">Momentum 365</div>
        <h1>Page not found.</h1>
        <p style={{ color: "var(--muted)" }}>The page you requested does not exist.</p>
        <Link className="btn btn-primary" href="/">Return Home</Link>
      </div>
    </main>
  );
}