import { db } from './src/db/index.js';
import { sql } from 'drizzle-orm';

async function main() {
  await db.execute(sql`GRANT SELECT, INSERT, UPDATE, DELETE ON public.readiness_tests TO anon;`);
  await db.execute(sql`GRANT SELECT, INSERT, UPDATE, DELETE ON public.consultations TO anon;`);
  console.log("Granted anon privileges");
}
main();
