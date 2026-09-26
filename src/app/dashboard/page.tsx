import { getSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "ADMIN") redirect("/admin");

  const user = await db.user.findUnique({
    where: { id: session.userId },
    include: { application: true, membership: true },
  });

  if (!user) redirect("/login");

  return (
    <main className="dashboard">
      <div className="topbar">
        <div className="container topbar-inner">
          <Link href="/"><img src="/logo.png" alt="Velora Partners" /></Link>
          <div className="topbar-actions">
            <LogoutButton />
          </div>
        </div>
      </div>
      <div className="container dashboard-main">
        <div className="section-head">
          <div className="eyebrow">Member Portal</div>
          <h2>Welcome, {user.firstName}.</h2>
          <p>Your Velora Partners account and membership information will live here.</p>
        </div>

        <div className="panel">
          <span className="status">{user.application?.status.replaceAll("_", " ") || "PENDING REVIEW"}</span>
          <h2 style={{ marginTop: 22 }}>Membership application</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            Your application has been received and is currently pending review. You can return to this
            dashboard at any time to check your status.
          </p>
          {user.membership && (
            <>
              <div className="eyebrow" style={{ marginTop: 30 }}>Member ID</div>
              <div className="member-id">{user.membership.memberId}</div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}