import { z } from "zod";

export const platforms = ["Amazon", "Shopify", "WordPress", "Flipkart", "Meesho", "WooCommerce"] as const;
export const revenueRanges = ["Under ₹5L/month", "₹5L–₹25L/month", "₹25L–₹1Cr/month", "₹1Cr+/month"] as const;
export const serviceInterests = [
  "Amazon management",
  "Shopify store",
  "WordPress development",
  "Marketplace growth",
  "Performance marketing",
  "AI ecommerce systems"
] as const;
export const leadStatuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"] as const;

export const createLeadSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100),
  phone: z.string().trim().regex(/^\d{10}$/, "Phone must be exactly 10 digits."),
  email: z.string().trim().email("Enter a valid email address.").max(180),
  website: z.string().trim().min(1, "Brand website or marketplace link is required.").max(240),
  platform: z.enum(platforms),
  revenue_range: z.enum(revenueRanges),
  service_interest: z.enum(serviceInterests),
  message: z.string().trim().max(600).optional().default("")
});

export const statusUpdateSchema = z.object({
  status: z.enum(leadStatuses)
});

export function isPlatform(value: unknown): value is (typeof platforms)[number] {
  return typeof value === "string" && platforms.includes(value as (typeof platforms)[number]);
}
