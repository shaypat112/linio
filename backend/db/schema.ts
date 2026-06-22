import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

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
