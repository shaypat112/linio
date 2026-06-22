// linio/backend/app/api/integrations/status/route.ts

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { tokenManager } from "@/lib/integrations/tokens";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const connections = await tokenManager.getUserConnections(userId);

    const status = {
      canvas: connections.some((c) => c.service === "canvas"),
      googleClassroom: connections.some((c) => c.service === "classroom"),
      gmail: connections.some((c) => c.service === "gmail"),
      googleCalendar: connections.some((c) => c.service === "calendar"),
    };

    return NextResponse.json(status);
  } catch (error) {
    console.error("Status check error:", error);
    return NextResponse.json(
      { error: "Failed to get status" },
      { status: 500 },
    );
  }
}
