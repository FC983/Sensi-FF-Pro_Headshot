import { z } from "zod";
import { insertPhoneSchema, phones } from "./schema";

export const api = {
  phones: {
    list: {
      method: "GET" as const,
      path: "/api/phones",
      input: z.object({
        search: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof phones.$inferSelect>()),
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/phones/:id",
      responses: {
        200: z.custom<typeof phones.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
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
