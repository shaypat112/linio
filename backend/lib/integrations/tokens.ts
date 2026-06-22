// linio/backend/lib/integrations/tokens.ts
// Server-side token management

import { db } from "@/db";
import { integrationTokens } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export interface StoredToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
}

export const tokenManager = {
  // Save token
  async saveToken(userId: string, service: string, token: StoredToken) {
    const existing = await db
      .select()
      .from(integrationTokens)
      .where(
        and(
          eq(integrationTokens.userId, userId),
          eq(integrationTokens.service, service),
        ),
      )
      .limit(1);

    if (existing.length > 0) {
      // Update existing
      await db
        .update(integrationTokens)
        .set({
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          expiresAt: token.expiresAt,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(integrationTokens.userId, userId),
            eq(integrationTokens.service, service),
          ),
        );
    } else {
      // Insert new
      await db.insert(integrationTokens).values({
        userId,
        service,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expiresAt: token.expiresAt,
      });
    }
  },

  // Get token
  async getToken(userId: string, service: string): Promise<StoredToken | null> {
    const result = await db
      .select()
      .from(integrationTokens)
      .where(
        and(
          eq(integrationTokens.userId, userId),
          eq(integrationTokens.service, service),
        ),
      )
      .limit(1);

    if (result.length === 0) return null;

    const token = result[0];

    // Check if expired
    if (token.expiresAt && new Date(token.expiresAt) < new Date()) {
      // Try to refresh token
      const refreshed = await this.refreshToken(userId, service);
      return refreshed;
    }

    return {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken || undefined,
      expiresAt: token.expiresAt || undefined,
    };
  },

  // Refresh token (implement for each service)
  async refreshToken(
    userId: string,
    service: string,
  ): Promise<StoredToken | null> {
    // Implementation depends on service
    // For now, return null
    return null;
  },

  // Delete token
  async deleteToken(userId: string, service: string) {
    await db
      .delete(integrationTokens)
      .where(
        and(
          eq(integrationTokens.userId, userId),
          eq(integrationTokens.service, service),
        ),
      );
  },

  // Get all connections for a user
  async getUserConnections(userId: string) {
    return await db
      .select()
      .from(integrationTokens)
      .where(eq(integrationTokens.userId, userId));
  },
};
