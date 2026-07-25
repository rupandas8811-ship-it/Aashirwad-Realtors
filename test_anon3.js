import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  await supabase.rpc('query_sql', { sql: 'GRANT SELECT, UPDATE ON public.readiness_tests TO anon;' });
  await supabase.rpc('query_sql', { sql: 'GRANT SELECT, UPDATE ON public.consultations TO anon;' });
}
main();
