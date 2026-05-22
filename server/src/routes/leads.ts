import { type Request, type Response, Router } from "express";
import { config } from "../config.js";
import { supabase } from "../supabase.js";
import { createLeadSchema, isPlatform, statusUpdateSchema } from "../validators.js";

export const leadsRouter = Router();

function validationDetails(error: unknown) {
  if (error && typeof error === "object" && "flatten" in error && typeof error.flatten === "function") {
    return error.flatten();
  }
  return error;
}

function requireAdmin(req: Request, res: Response) {
  if (!config.adminApiKey) {
    res.status(500).json({ success: false, error: "Missing ADMIN_API_KEY." });
    return false;
  }

  if (req.header("x-admin-key") !== config.adminApiKey) {
    res.status(401).json({ success: false, error: "Admin access key required." });
    return false;
  }

  return true;
}

leadsRouter.post("/", async (req, res) => {
  const parsed = createLeadSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "Bad input",
      details: validationDetails(parsed.error)
    });
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({
      ...parsed.data,
      status: "New"
    })
    .select("*")
    .single();

  if (error) {
    console.error("Create lead failed", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }

  return res.status(201).json({ success: true, data });
});

leadsRouter.get("/", async (req, res) => {
  if (!requireAdmin(req, res)) return;

  const platform = req.query.platform;

  if (platform !== undefined && !isPlatform(platform)) {
    return res.status(400).json({
      success: false,
      error: "Bad input",
      details: { platform: "Unsupported platform filter." }
    });
  }

  let query = supabase.from("leads").select("*").order("created_at", { ascending: false });

  if (isPlatform(platform)) {
    query = query.eq("platform", platform);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Fetch leads failed", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }

  return res.json({ success: true, data: data ?? [] });
});

leadsRouter.patch("/:id/status", async (req, res) => {
  if (!requireAdmin(req, res)) return;

  const parsed = statusUpdateSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "Bad input",
      details: validationDetails(parsed.error)
    });
  }

  const { data, error } = await supabase
    .from("leads")
    .update({ status: parsed.data.status })
    .eq("id", req.params.id)
    .select("*")
    .maybeSingle();

  if (error) {
    console.error("Update lead status failed", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }

  if (!data) {
    return res.status(404).json({ success: false, error: "Lead not found" });
  }

  return res.json({ success: true, data });
});

leadsRouter.delete("/:id", async (req, res) => {
  if (!requireAdmin(req, res)) return;

  const { data, error } = await supabase
    .from("leads")
    .delete()
    .eq("id", req.params.id)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Delete lead failed", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }

  if (!data) {
    return res.status(404).json({ success: false, error: "Lead not found" });
  }

  return res.json({ success: true, data });
});
