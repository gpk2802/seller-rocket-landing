const platforms = ["Amazon", "Shopify", "WordPress", "Flipkart", "Meesho", "WooCommerce"];
const revenueRanges = ["Under ₹5L/month", "₹5L–₹25L/month", "₹25L–₹1Cr/month", "₹1Cr+/month"];
const serviceInterests = [
  "Amazon management",
  "Shopify store",
  "WordPress development",
  "Marketplace growth",
  "Performance marketing",
  "AI ecommerce systems"
];
const leadStatuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  return { url, key };
}

function requireAdmin(req, res) {
  const configuredKey = process.env.ADMIN_API_KEY;
  const providedKey = req.headers["x-admin-key"];

  if (!configuredKey) {
    json(res, 500, { success: false, error: "Missing ADMIN_API_KEY." });
    return false;
  }

  if (providedKey !== configuredKey) {
    json(res, 401, { success: false, error: "Admin access key required." });
    return false;
  }

  return true;
}

async function supabaseRequest(path, init = {}) {
  const { url, key } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...init.headers
    }
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message ?? data?.error ?? "Supabase request failed.";
    throw new Error(message);
  }

  return data;
}

function cleanString(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validateLeadPayload(input) {
  const body = readBody(input);
  const lead = {
    name: cleanString(body.name, 100),
    phone: cleanString(body.phone, 10),
    email: cleanString(body.email, 180),
    website: cleanString(body.website, 240),
    platform: body.platform,
    revenue_range: body.revenue_range,
    service_interest: body.service_interest,
    message: cleanString(body.message, 600)
  };

  const errors = {};
  if (!lead.name) errors.name = "Name is required.";
  if (!/^\d{10}$/.test(lead.phone)) errors.phone = "Phone must be exactly 10 digits.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.email = "Enter a valid email address.";
  if (!lead.website) errors.website = "Brand website or marketplace link is required.";
  if (!platforms.includes(lead.platform)) errors.platform = "Unsupported platform.";
  if (!revenueRanges.includes(lead.revenue_range)) errors.revenue_range = "Unsupported revenue range.";
  if (!serviceInterests.includes(lead.service_interest)) errors.service_interest = "Unsupported service interest.";

  return Object.keys(errors).length ? { success: false, errors } : { success: true, lead };
}

function isPlatform(value) {
  return typeof value === "string" && platforms.includes(value);
}

function isLeadStatus(value) {
  return typeof value === "string" && leadStatuses.includes(value);
}

export {
  isLeadStatus,
  isPlatform,
  json,
  readBody,
  requireAdmin,
  supabaseRequest,
  validateLeadPayload
};
