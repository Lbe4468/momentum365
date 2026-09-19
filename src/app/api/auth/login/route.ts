import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const normalizedEmail = email.toLowerCase();
  const user = await db.user.findUnique({ where: { email: normalizedEmail } });

  // ADMIN_EMAIL is intentionally used only to determine the initial admin role.
  // In production, add a dedicated Role column and manage roles in the database.
  if (!user) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });

  const role = normalizedEmail === process.env.ADMIN_EMAIL?.toLowerCase() ? "ADMIN" : "MEMBER";
  await createSession({ userId: user.id, email: user.email, role });

  return NextResponse.json({ role });
}