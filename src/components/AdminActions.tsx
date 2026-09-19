"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminActions({ applicationId, status }: { applicationId: string; status: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function action(type: "approve" | "under-review" | "decline") {
    setBusy(true);
    const endpoint =
      type === "approve"
        ? `/api/admin/applications/${applicationId}/approve`
        : `/api/admin/applications/${applicationId}/status`;

    const body = type === "approve" ? undefined : JSON.stringify({
      status: type === "under-review" ? "UNDER_REVIEW" : "DECLINED",
    });

    await fetch(endpoint, {
      method: "POST",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body,
    });

    setBusy(false);
    router.refresh();
  }

  return (
    <div className="admin-actions">
      {status === "PENDING_REVIEW" && (
        <button className="btn btn-ghost btn-small" disabled={busy} onClick={() => action("under-review")}>
          Review
        </button>
      )}
      {(status === "PENDING_REVIEW" || status === "UNDER_REVIEW") && (
        <button className="btn btn-primary btn-small" disabled={busy} onClick={() => action("approve")}>
          Approve
        </button>
      )}
      {status !== "APPROVED" && status !== "DECLINED" && (
        <button className="btn btn-ghost btn-small" disabled={busy} onClick={() => action("decline")}>
          Decline
        </button>
      )}
    </div>
  );
}