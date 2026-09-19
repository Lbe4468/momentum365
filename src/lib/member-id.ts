import { db } from "./prisma";

export async function generateUniqueMemberId(): Promise<string> {
  // The database uniqueness constraint is the final guard against duplication.
  // The numeric suffix is intentionally generated server-side.
  for (let attempt = 0; attempt < 10; attempt++) {
    const count = await db.membership.count();
    const candidate = `M365-${String(count + 1).padStart(6, "0")}`;
    const exists = await db.membership.findUnique({ where: { memberId: candidate } });
    if (!exists) return candidate;

    // Extremely unlikely collision fallback.
    const random = Math.floor(Math.random() * 900000 + 100000);
    const fallback = `M365-${random}`;
    const fallbackExists = await db.membership.findUnique({ where: { memberId: fallback } });
    if (!fallbackExists) return fallback;
  }

  throw new Error("Unable to generate a unique member ID.");
}