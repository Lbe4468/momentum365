"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Login failed.");
      setLoading(false);
      return;
    }
    router.push(data.role === "ADMIN" ? "/admin" : "/dashboard");
  }

  return (
    <form onSubmit={submit}>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />
      </div>
      {error && <div className="error">{error}</div>}
      <div className="form-actions">
        <button className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </form>
  );
}