import { pgTable, text, timestamp, jsonb, integer, serial } from "drizzle-orm/pg-core";

export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const readinessTests = pgTable("readiness_tests", {
  id: serial("id").primaryKey(),
  answers: jsonb("answers").notNull(),
  score: integer("score").notNull(),
  category: text("category").notNull(),
  status: text("status").default("New").notNull(),
  adminNotes: text("admin_notes").default("").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  lookingFor: text("looking_for").notNull(),
  status: text("status").default("New").notNull(),
  adminNotes: text("admin_notes").default("").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
