import {
  pgTable,
  serial,
  text,
  boolean,
  varchar,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").default(false).notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const integrationTokens = pgTable("integration_tokens", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  service: varchar("service", { length: 50 }).notNull(), // canvas, google-classroom, gmail, google-calendar
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  expiresAt: timestamp("expires_at"),
  metadata: jsonb("metadata"), // Store additional data
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// NEW: Synced data table
export const syncedData = pgTable("synced_data", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  service: varchar("service", { length: 50 }).notNull(),
  dataType: varchar("data_type", { length: 50 }).notNull(), // assignments, courses, events, etc.
  data: jsonb("data").notNull(),
  syncedAt: timestamp("synced_at").defaultNow(),
});
