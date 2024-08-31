import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey: string =
	typeof window === "undefined"
		? (process.env.SUPABASE_SERVICE_ROLE_KEY as string)
		: (process.env.NEXT_PUBLIC_SUPABASE_KEY as string);

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
