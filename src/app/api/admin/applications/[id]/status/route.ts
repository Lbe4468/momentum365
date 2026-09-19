import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({ status: z.enum(["UNDER_REVIEW", "DECLINED", "PENDING_REVIEW"]) });

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid status." }, { status: 400 });

  const application = await db.application.update({
    where: { id },
    data: {
      status: parsed.data.status,
      reviewedAt: parsed.data.status === "PENDING_REVIEW" ? null : new Date(),
      reviewedBy: session.email,
    },
  });

  return NextResponse.json(application);
}