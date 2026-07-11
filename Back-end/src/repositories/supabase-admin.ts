import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("SUPABSE_URL ou SUPABASE_ROLE_KEY  nao definidas");
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
