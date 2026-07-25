import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function main() {
  const { data: r, error: er } = await supabase.from('readiness_tests').select('*');
  console.log("Readiness anon error:", er);
  const { data: c, error: ec } = await supabase.from('consultations').select('*');
  console.log("Consultations anon error:", ec);
}
main();
