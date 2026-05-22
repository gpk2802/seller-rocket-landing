import { json } from "./_supabase.js";

export default function handler(_req, res) {
  return json(res, 200, { success: true, data: { status: "ok" } });
}
