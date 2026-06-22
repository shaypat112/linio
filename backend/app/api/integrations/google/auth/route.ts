// linio/backend/app/api/integrations/google/auth/route.ts

import { NextRequest, NextResponse } from "next/server";
import { googleIntegration } from "@/lib/integrations/google";
import { tokenManager } from "@/lib/integrations/tokens";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(
        `${process.env.MOBILE_APP_URL}?error=${error}`,
      );
    }

    if (!code || !state) {
      return NextResponse.redirect(
        `${process.env.MOBILE_APP_URL}?error=missing_params`,
      );
    }

    // Parse state
    const stateData = JSON.parse(Buffer.from(state, "base64").toString());
    const { userId, service } = stateData;

    // Exchange code for token
    const tokenData = await googleIntegration.exchangeCode(code);

    // Save token
    await tokenManager.saveToken(userId, service, {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt: tokenData.expires_in
        ? new Date(Date.now() + tokenData.expires_in * 1000)
        : undefined,
    });

    // Redirect back to mobile app
    return NextResponse.redirect(
      `${process.env.MOBILE_APP_URL}?service=${service}&status=connected`,
    );
  } catch (error) {
    console.error("Google auth error:", error);
    return NextResponse.redirect(
      `${process.env.MOBILE_APP_URL}?error=auth_failed`,
    );
  }
}
