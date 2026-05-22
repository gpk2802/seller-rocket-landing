export const platforms = ["Amazon", "Flipkart", "Shopify", "WordPress"] as const;
export const leadStatuses = ["New", "Contacted", "Converted", "Rejected"] as const;

export type Platform = (typeof platforms)[number];
export type LeadStatus = (typeof leadStatuses)[number];

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  platform: Platform;
  message: string;
  status: LeadStatus;
  created_at: string;
}

export interface LeadPayload {
  name: string;
  phone: string;
  email: string;
  platform: Platform;
  message: string;
}
