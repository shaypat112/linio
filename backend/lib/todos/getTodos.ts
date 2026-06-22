import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getTodos(userId: string) {
  return await db.select().from(todos).where(eq(todos.userId, userId));
}
