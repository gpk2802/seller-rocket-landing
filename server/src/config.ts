import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT ?? 5000),
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  adminApiKey: process.env.ADMIN_API_KEY,
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173"
};

export function assertSupabaseConfig() {
  if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in server/.env");
  }
}
