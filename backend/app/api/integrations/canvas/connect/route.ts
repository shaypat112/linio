// linio/backend/app/api/integrations/canvas/connect/route.ts

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { canvasIntegration } from "@/lib/integrations/canvas";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate state to prevent CSRF
    const state = Buffer.from(
      JSON.stringify({ userId, service: "canvas" }),
    ).toString("base64");

    // Get auth URL
    const authUrl = canvasIntegration.getAuthUrl(state);

    return NextResponse.json({ authUrl });
  } catch (error) {
    console.error("Canvas connect error:", error);
    return NextResponse.json(
      { error: "Failed to initiate connection" },
      { status: 500 },
    );
  }
}
