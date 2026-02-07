import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase URL or Key");
}

console.log("Supabase URL initialized:", supabaseUrl.substring(0, 15) + "...");
// Check for common issues
if (supabaseUrl.includes("undefined") || supabaseUrl.includes("null")) {
    console.error("CRITICAL: Supabase URL contains 'undefined' or 'null'. Check your .env file.");
}

export const supabase = createClient(
    supabaseUrl,
    supabaseKey,
    {
        db:
        {
            schema: "api",
        }
    }
);