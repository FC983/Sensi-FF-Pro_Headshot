import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Export auth models
export * from "./models/auth";

export const phones = pgTable("phones", {
  id: serial("id").primaryKey(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  dpi: integer("dpi").notNull(),
  generalSensitivity: integer("general_sensitivity").notNull(),
  redDotSensitivity: integer("red_dot_sensitivity").notNull(),
  x2ScopeSensitivity: integer("x2_scope_sensitivity").notNull(),
  x4ScopeSensitivity: integer("x4_scope_sensitivity").notNull(),
  sniperScopeSensitivity: integer("sniper_scope_sensitivity").notNull(),
  freeLookSensitivity: integer("free_look_sensitivity").notNull(),
});

export const insertPhoneSchema = createInsertSchema(phones).omit({ id: true });

export type Phone = typeof phones.$inferSelect;
export type InsertPhone = z.infer<typeof insertPhoneSchema>;
