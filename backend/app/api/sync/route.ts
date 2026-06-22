import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const existing = await db.select().from(users).where(eq(users.id, userId));

  if (existing.length === 0) {
    await db.insert(users).values({
      id: userId,
      email: "unknown",
      name: null,
    });
  }

  return Response.json({ success: true });
}
