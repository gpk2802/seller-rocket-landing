import { isPlatform, json, supabaseRequest, validateLeadPayload } from "./_supabase.js";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return json(res, 204, {});
  }

  if (req.method === "POST") {
    const parsed = validateLeadPayload(req);

    if (!parsed.success) {
      return json(res, 400, {
        success: false,
        error: "Bad input",
        details: parsed.errors
      });
    }

    try {
      const rows = await supabaseRequest("leads?select=*", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({ ...parsed.lead, status: "New" })
      });

      return json(res, 201, { success: true, data: rows?.[0] });
    } catch (error) {
      console.error("Create lead failed", error);
      return json(res, 500, { success: false, error: "Server error" });
    }
  }

  if (req.method === "GET") {
    const platform = Array.isArray(req.query.platform) ? req.query.platform[0] : req.query.platform;

    if (platform !== undefined && !isPlatform(platform)) {
      return json(res, 400, {
        success: false,
        error: "Bad input",
        details: { platform: "Unsupported platform filter." }
      });
    }

    const filter = isPlatform(platform) ? `&platform=eq.${encodeURIComponent(platform)}` : "";

    try {
      const rows = await supabaseRequest(`leads?select=*&order=created_at.desc${filter}`);
      return json(res, 200, { success: true, data: rows ?? [] });
    } catch (error) {
      console.error("Fetch leads failed", error);
      return json(res, 500, { success: false, error: "Server error" });
    }
  }

  return json(res, 405, { success: false, error: "Method not allowed" });
}
