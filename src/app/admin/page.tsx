import { getSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AdminActions } from "@/components/AdminActions";
import { LogoutButton } from "@/components/LogoutButton";

export default async function AdminPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/login");

  const applications = await db.application.findMany({
    include: { user: true },
    orderBy: { submittedAt: "desc" },
  });

  return (
    <main className="dashboard">
      <div className="topbar">
        <div className="container topbar-inner">
          <img src="/logo.png" alt="Momentum 365" />
          <LogoutButton />
        </div>
      </div>

      <div className="container dashboard-main">
        <div className="section-head">
          <div className="eyebrow">Internal Administration</div>
          <h2>Membership applications.</h2>
          <p>Review applicants and manage their application status.</p>
        </div>

        <div className="panel">
          <div className="admin-list">
            {applications.length === 0 && (
              <p style={{ color: "var(--muted)" }}>No applications yet.</p>
            )}
            {applications.map((application) => (
              <div className="admin-row" key={application.id}>
                <div>
                  <strong>{application.user.firstName} {application.user.lastName}</strong>
                  <br />
                  <small>{application.user.email}</small>
                </div>
                <span className="status">{application.status.replaceAll("_", " ")}</span>
                <AdminActions applicationId={application.id} status={application.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}