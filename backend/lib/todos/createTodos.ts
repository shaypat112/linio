import { db } from "@/db";
import { todos } from "@/db/schema";

export async function createTodo(title: string, userId: string) {
  await db.insert(todos).values({
    title,
    userId,
  });
}
