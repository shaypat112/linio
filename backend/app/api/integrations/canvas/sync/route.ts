// linio/backend/app/api/integrations/canvas/sync/route.ts

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { canvasIntegration } from "@/lib/integrations/canvas";
import { tokenManager } from "@/lib/integrations/tokens";
import { db } from "@/db";
import { syncedData } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get stored token
    const token = await tokenManager.getToken(userId, "canvas");
    if (!token) {
      return NextResponse.json(
        { error: "Not connected to Canvas" },
        { status: 400 },
      );
    }

    // Fetch courses
    const courses = await canvasIntegration.getCourses(token.accessToken);

    // Fetch assignments for each course
    const allAssignments = [];
    for (const course of courses) {
      const assignments = await canvasIntegration.getAssignments(
        token.accessToken,
        course.id,
      );
      allAssignments.push(...assignments);
    }

    // Save synced data
    await db
      .insert(syncedData)
      .values({
        userId,
        service: "canvas",
        dataType: "assignments",
        data: allAssignments,
        syncedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [syncedData.userId, syncedData.service, syncedData.dataType],
        set: { data: allAssignments, syncedAt: new Date() },
      });

    return NextResponse.json({
      success: true,
      courses: courses.length,
      assignments: allAssignments.length,
    });
  } catch (error) {
    console.error("Canvas sync error:", error);
    return NextResponse.json(
      { error: "Failed to sync Canvas data" },
      { status: 500 },
    );
  }
}
