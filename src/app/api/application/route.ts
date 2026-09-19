import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

const schema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().email().max(255),
  password: z.string().min(10).max(128),
  phone: z.string().max(40).optional(),
  location: z.string().max(160).optional(),
  occupation: z.string().max(160).optional(),
  company: z.string().max(160).optional(),
  interests: z.string().max(5000).optional(),
  objectives: z.string().max(5000).optional(),
  experience: z.string().max(5000).optional(),
  referral: z.string().max(500).optional(),
  additionalInfo: z.string().max(5000).optional(),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Please complete the required fields correctly." }, { status: 400 });

  const data = parsed.data;
  const email = data.email.toLowerCase();

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "An account with this email already exists. Please log in." }, { status: 409 });

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await db.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email,
      phone: data.phone || null,
      passwordHash,
      application: {
        create: {
          location: data.location || null,
          occupation: data.occupation || null,
          company: data.company || null,
          interests: data.interests || null,
          objectives: data.objectives || null,
          experience: data.experience || null,
          referral: data.referral || null,
          additionalInfo: data.additionalInfo || null,
        },
      },
    },
  });

  await createSession({ userId: user.id, email: user.email, role: "MEMBER" });
  return NextResponse.json({ ok: true });
}