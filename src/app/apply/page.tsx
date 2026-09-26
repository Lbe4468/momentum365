import { ApplicationForm } from "@/components/ApplicationForm";
import Link from "next/link";

export default function ApplyPage() {
  return (
    <main className="form-page">
      <div className="form-shell">
        <Link href="/" className="eyebrow">← Velora Partners</Link>
        <div className="form-card" style={{ marginTop: 22 }}>
          <div className="eyebrow">Membership Application</div>
          <h1>Request membership.</h1>
          <p>
            Create your secure account and complete the application. Your application will remain
            pending until it has been reviewed.
          </p>
          <ApplicationForm />
        </div>
      </div>
    </main>
  );
}