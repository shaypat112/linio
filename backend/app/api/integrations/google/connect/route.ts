// linio/backend/app/api/integrations/google/connect/route.ts

import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { googleIntegration } from "@/lib/integrations/google";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const service = searchParams.get("service"); // classroom, gmail, calendar

    if (!service || !["classroom", "gmail", "calendar"].includes(service)) {
      return NextResponse.json({ error: "Invalid service" }, { status: 400 });
    }

    // Generate state
    const state = Buffer.from(JSON.stringify({ userId, service })).toString(
      "base64",
    );

    // Get auth URL
    const authUrl = googleIntegration.getAuthUrl(
      service as "classroom" | "gmail" | "calendar",
      state,
    );

    return NextResponse.json({ authUrl });
  } catch (error) {
    console.error("Google connect error:", error);
    return NextResponse.json(
      { error: "Failed to initiate connection" },
      { status: 500 },
    );
  }
}
