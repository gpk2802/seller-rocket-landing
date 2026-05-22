import { json, requireAdmin, supabaseRequest } from "../_supabase.js";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return json(res, 204, {});
  }

  if (req.method !== "DELETE") {
    return json(res, 405, { success: false, error: "Method not allowed" });
  }

  if (!requireAdmin(req, res)) return;

  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

  if (!id) {
    return json(res, 400, { success: false, error: "Missing lead id" });
  }

  try {
    const rows = await supabaseRequest(`leads?id=eq.${encodeURIComponent(id)}&select=id`, {
      method: "DELETE",
      headers: { Prefer: "return=representation" }
    });

    if (!rows?.[0]) {
      return json(res, 404, { success: false, error: "Lead not found" });
    }

    return json(res, 200, { success: true, data: rows[0] });
  } catch (error) {
    console.error("Delete lead failed", error);
    return json(res, 500, { success: false, error: "Server error" });
  }
}
