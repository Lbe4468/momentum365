"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function ApplicationForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch("/api/application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Unable to submit application.");
      setLoading(false);
      return;
    }

    router.push("/dashboard?submitted=1");
  }

  return (
    <form onSubmit={submit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="firstName">First name *</label>
          <input id="firstName" name="firstName" required />
        </div>
        <div className="field">
          <label htmlFor="lastName">Last name *</label>
          <input id="lastName" name="lastName" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" />
        </div>
        <div className="field">
          <label htmlFor="password">Create password *</label>
          <input id="password" name="password" type="password" minLength={10} required />
        </div>
        <div className="field">
          <label htmlFor="location">City / State / Country</label>
          <input id="location" name="location" />
        </div>
        <div className="field">
          <label htmlFor="occupation">Occupation</label>
          <input id="occupation" name="occupation" />
        </div>
        <div className="field">
          <label htmlFor="company">Company / Organization</label>
          <input id="company" name="company" />
        </div>
        <div className="field full">
          <label htmlFor="interests">What areas of financial opportunity interest you?</label>
          <textarea id="interests" name="interests" />
        </div>
        <div className="field full">
          <label htmlFor="objectives">What are you hoping to gain from membership?</label>
          <textarea id="objectives" name="objectives" />
        </div>
        <div className="field full">
          <label htmlFor="experience">Tell us about your professional or investment experience.</label>
          <textarea id="experience" name="experience" />
        </div>
        <div className="field">
          <label htmlFor="referral">How did you hear about Velora Partners?</label>
          <input id="referral" name="referral" />
        </div>
        <div className="field">
          <label htmlFor="additionalInfo">Anything else you would like us to know?</label>
          <textarea id="additionalInfo" name="additionalInfo" />
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="form-actions">
        <button className="btn btn-primary" disabled={loading} type="submit">
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
}