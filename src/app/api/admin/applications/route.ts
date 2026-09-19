import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const applications = await db.application.findMany({
    include: { user: true, notes: true },
    orderBy: { submittedAt: "desc" },
  });

  return NextResponse.json(applications);
}