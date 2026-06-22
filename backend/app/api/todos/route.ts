import { auth } from "@clerk/nextjs/server";
import { getTodos } from "@/lib/todos/getTodos";

export async function GET() {
  const { userId } = await auth();

  const data = await getTodos(userId!);

  return Response.json(data);
}
