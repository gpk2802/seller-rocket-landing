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

export type Platform = (typeof platforms)[number];
export type RevenueRange = (typeof revenueRanges)[number];
export type ServiceInterest = (typeof serviceInterests)[number];
export type LeadStatus = (typeof leadStatuses)[number];

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  website: string;
  platform: Platform;
  revenue_range: RevenueRange;
  service_interest: ServiceInterest;
  message: string;
  status: LeadStatus;
  created_at: string;
}

export interface LeadPayload {
  name: string;
  phone: string;
  email: string;
  website: string;
  platform: Platform;
  revenue_range: RevenueRange;
  service_interest: ServiceInterest;
  message: string;
}
