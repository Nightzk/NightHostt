import { z } from "zod";
import {
  contactMessages,
  insertContactMessageSchema,
} from "@shared/schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  contact: {
    list: {
      method: "GET" as const,
      path: "/api/contact-messages",
      responses: {
        200: z.array(z.custom<typeof contactMessages.$inferSelect>()),
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/contact-messages",
      input: insertContactMessageSchema,
      responses: {
        201: z.custom<typeof contactMessages.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
} as const;

export function buildUrl(
  path: string,
  params?: Record<string, string | number>
): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type CreateContactMessageInput = z.infer<typeof api.contact.create.input>;
export type ContactMessageResponse = z.infer<typeof api.contact.create.responses[201]>;
export type ContactMessagesListResponse = z.infer<typeof api.contact.list.responses[200]>;
export type ValidationError = z.infer<typeof errorSchemas.validation>;
export type InternalError = z.infer<typeof errorSchemas.internal>;
