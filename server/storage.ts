import { phones, type Phone, type InsertPhone } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or } from "drizzle-orm";

export interface IStorage {
  getPhones(search?: string): Promise<Phone[]>;
  getPhone(id: number): Promise<Phone | undefined>;
  createPhone(phone: InsertPhone): Promise<Phone>;
}

export class DatabaseStorage implements IStorage {
  async getPhones(search?: string): Promise<Phone[]> {
    if (!search) {
      return await db.select().from(phones);
    }
    const searchLower = `%${search.toLowerCase()}%`;
    return await db
      .select()
      .from(phones)
      .where(
        or(
          ilike(phones.model, searchLower),
          ilike(phones.brand, searchLower)
        )
      );
  }

  async getPhone(id: number): Promise<Phone | undefined> {
    const [phone] = await db.select().from(phones).where(eq(phones.id, id));
    return phone;
  }

  async createPhone(insertPhone: InsertPhone): Promise<Phone> {
    const [phone] = await db.insert(phones).values(insertPhone).returning();
    return phone;
  }
}

export const storage = new DatabaseStorage();
