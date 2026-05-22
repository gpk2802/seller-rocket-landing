import { z } from "zod";

export const platforms = ["Amazon", "Flipkart", "Shopify", "WordPress"] as const;
export const leadStatuses = ["New", "Contacted", "Converted", "Rejected"] as const;

export const createLeadSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100),
  phone: z.string().trim().regex(/^\d{10}$/, "Phone must be exactly 10 digits."),
  email: z.string().trim().email("Enter a valid email address.").max(180),
  platform: z.enum(platforms),
  message: z.string().trim().max(600).optional().default("")
});

export const statusUpdateSchema = z.object({
  status: z.enum(leadStatuses)
});

export function isPlatform(value: unknown): value is (typeof platforms)[number] {
  return typeof value === "string" && platforms.includes(value as (typeof platforms)[number]);
}
