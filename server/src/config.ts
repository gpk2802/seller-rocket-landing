import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT ?? 5000),
  supabaseUrl: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  supabaseApiKey:
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY,
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173"
};

export function assertSupabaseConfig() {
  if (!config.supabaseUrl || !config.supabaseApiKey) {
    throw new Error("Missing Supabase URL or API key in server/.env");
  }
}
