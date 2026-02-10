import { desc } from "drizzle-orm";
import {
  contactMessages,
  type ContactMessageResponse,
  type CreateContactMessageRequest,
} from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  listContactMessages(): Promise<ContactMessageResponse[]>;
  createContactMessage(
    input: CreateContactMessageRequest,
  ): Promise<ContactMessageResponse>;
}

export class DatabaseStorage implements IStorage {
  async listContactMessages(): Promise<ContactMessageResponse[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.id));
  }

  async createContactMessage(
    input: CreateContactMessageRequest,
  ): Promise<ContactMessageResponse> {
    const [created] = await db.insert(contactMessages).values(input).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
