// linio/backend/app/api/integrations/google/sync/route.ts

import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { googleIntegration } from "@/lib/integrations/google";
import { tokenManager } from "@/lib/integrations/tokens";
import { db } from "@/db";
import { syncedData } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { service } = body; // classroom, gmail, calendar

    if (!service || !["classroom", "gmail", "calendar"].includes(service)) {
      return NextResponse.json({ error: "Invalid service" }, { status: 400 });
    }

    // Get stored token
    const token = await tokenManager.getToken(userId, service);
    if (!token) {
      return NextResponse.json(
        { error: `Not connected to Google ${service}` },
        { status: 400 },
      );
    }

    let data = [];
    let dataType = "";

    // Fetch data based on service
    switch (service) {
      case "classroom":
        data = await googleIntegration.getClassroomCourses(token.accessToken);
        dataType = "courses";
        break;
      case "gmail":
        data = await googleIntegration.getGmailMessages(
          token.accessToken,
          "subject:(assignment OR homework)",
        );
        dataType = "messages";
        break;
      case "calendar":
        data = await googleIntegration.getCalendarEvents(token.accessToken);
        dataType = "events";
        break;
    }

    // Save synced data
    await db
      .insert(syncedData)
      .values({
        userId,
        service: `google-${service}`,
        dataType,
        data,
        syncedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [syncedData.userId, syncedData.service, syncedData.dataType],
        set: { data, syncedAt: new Date() },
      });

    return NextResponse.json({
      success: true,
      service,
      count: data.length,
    });
  } catch (error) {
    console.error("Google sync error:", error);
    return NextResponse.json(
      { error: "Failed to sync Google data" },
      { status: 500 },
    );
  }
}
