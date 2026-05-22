import { createClient } from "@supabase/supabase-js";
import { assertSupabaseConfig, config } from "./config.js";

assertSupabaseConfig();

export const supabase = createClient(config.supabaseUrl!, config.supabaseServiceRoleKey!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

