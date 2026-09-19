import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { generateUniqueMemberId } from "@/lib/member-id";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const application = await db.application.findUnique({ where: { id }, include: { user: true } });
  if (!application) return NextResponse.json({ error: "Application not found." }, { status: 404 });

  if (application.status === "APPROVED") {
    return NextResponse.json({ error: "Application is already approved." }, { status: 409 });
  }

  const existingMembership = await db.membership.findUnique({ where: { userId: application.userId } });
  if (existingMembership) {
    await db.application.update({
      where: { id },
      data: { status: "APPROVED", reviewedAt: new Date(), reviewedBy: session.email },
    });
    return NextResponse.json(existingMembership);
  }

  const memberId = await generateUniqueMemberId();

  const result = await db.$transaction(async (tx) => {
    const membership = await tx.membership.create({
      data: { userId: application.userId, memberId, status: "ACTIVE" },
    });

    await tx.application.update({
      where: { id },
      data: { status: "APPROVED", reviewedAt: new Date(), reviewedBy: session.email },
    });

    return membership;
  });

  return NextResponse.json(result);
}