import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseClient: ReturnType<typeof createClient> | undefined;

if (supabaseUrl && supabaseKey) {
  supabaseClient = createClient(supabaseUrl, supabaseKey);
} else {
  // Handle the case when either supabaseUrl or supabaseKey is undefined
  // For example, you can log an error or throw an exception
  console.error('Supabase URL or key is undefined');
}

export default supabaseClient;